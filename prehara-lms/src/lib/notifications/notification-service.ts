import { prisma } from '@/lib/db/prisma';

export interface NotificationEvent {
  organizationId: string;
  userId: string;
  title: string;
  message: string;
  type: 'INVITATION' | 'SECURITY_ALERT' | 'ANNOUNCEMENT' | 'GRADING' | 'SUPPORT';
  channel: 'IN_APP' | 'EMAIL';
  metadata?: Record<string, unknown>;
}

export interface NotificationChannelHandler {
  send(event: NotificationEvent): Promise<{ success: boolean; externalId?: string }>;
}

/**
 * In-App Channel Handler: persists directly to the tenant's database
 */
const inAppHandler: NotificationChannelHandler = {
  async send(event: NotificationEvent) {
    await prisma.notification.create({
      data: {
        organizationId: event.organizationId,
        userId: event.userId,
        title: event.title,
        message: event.message,
        type: event.type,
        channel: 'IN_APP',
        status: 'PENDING',
        metadata: (event.metadata ?? {}) as any,
      },
    });
    return { success: true };
  },
};

/**
 * Email Channel Handler: formats email and records dispatch
 */
const emailHandler: NotificationChannelHandler = {
  async send(event: NotificationEvent) {
    // Pluggable channel: logs and records email notification record
    const record = await prisma.notification.create({
      data: {
        organizationId: event.organizationId,
        userId: event.userId,
        title: `[Prehara LMS] ${event.title}`,
        message: event.message,
        type: event.type,
        channel: 'EMAIL',
        status: 'SENT',
        metadata: {
          ...event.metadata,
          dispatchedAt: new Date().toISOString(),
          simulatedEmail: true,
        } as any,
      },
    });
    return { success: true, externalId: record.id };
  },
};

// Pluggable registry
const channelRegistry: Record<string, NotificationChannelHandler> = {
  IN_APP: inAppHandler,
  EMAIL: emailHandler,
};

/**
 * Single Event Notification Dispatcher
 */
export async function dispatchNotification(event: NotificationEvent) {
  const handler = channelRegistry[event.channel];
  if (!handler) {
    throw new Error(`Unsupported notification channel: ${event.channel}`);
  }
  return handler.send(event);
}

/**
 * Query notifications for a user in an organisation
 */
export async function getUserNotifications(organizationId: string, userId: string) {
  return prisma.notification.findMany({
    where: {
      organizationId,
      userId,
      deletedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 30,
  });
}

export async function markNotificationAsRead(organizationId: string, notificationId: string, userId: string) {
  return prisma.notification.updateMany({
    where: {
      id: notificationId,
      organizationId,
      userId,
    },
    data: {
      status: 'READ',
      readAt: new Date(),
    },
  });
}

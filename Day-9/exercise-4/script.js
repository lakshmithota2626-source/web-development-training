const rsvpForm = document.querySelector("#rsvp-form");
const attendeeList = document.querySelector("#attendee-list");
const attendeeCount = document.querySelector("#attendee-count");
const rsvpStatus = document.querySelector("#rsvp-status");
const eventLog = document.querySelector("#event-log");
const attendees = [];
let nextAttendeeId = 1;

function renderAttendees() {
  attendeeList.replaceChildren();

  if (attendees.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "list-item";
    emptyMessage.textContent = "Your attendee list is empty.";
    attendeeList.append(emptyMessage);
  }

  for (const attendee of attendees) {
    const row = document.createElement("li");
    row.className = "list-item";

    const details = document.createElement("span");
    details.textContent = `${attendee.name} · ${attendee.email} · ${attendee.session}`;

    const removeButton = document.createElement("button");
    removeButton.className = "button";
    removeButton.type = "button";
    removeButton.dataset.removeAttendee = String(attendee.id);
    removeButton.textContent = "Remove";
    removeButton.setAttribute("aria-label", `Remove ${attendee.name}`);

    row.append(details, removeButton);
    attendeeList.append(row);
  }

  attendeeCount.textContent = String(attendees.length);
}

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(rsvpForm);
  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const session = String(formData.get("session"));

  if (!name || !email || !session) {
    rsvpStatus.textContent = "Complete each field before submitting.";
    rsvpStatus.classList.add("error");
    return;
  }

  const alreadyRegistered = attendees.some((attendee) => attendee.email.toLowerCase() === email.toLowerCase());
  if (alreadyRegistered) {
    rsvpStatus.textContent = "That email is already registered.";
    rsvpStatus.classList.add("error");
    return;
  }

  attendees.push({ id: nextAttendeeId, name, email, session });
  nextAttendeeId += 1;
  rsvpForm.reset();
  rsvpStatus.textContent = `${name} is registered for ${session}.`;
  rsvpStatus.classList.remove("error");
  eventLog.textContent = `submit event → attendee ${attendees.length} added`;
  renderAttendees();
});

attendeeList.addEventListener("click", (event) => {
  const removeButton = event.target.closest("button[data-remove-attendee]");
  if (!removeButton) return;

  const attendeeId = Number(removeButton.dataset.removeAttendee);
  const attendeeIndex = attendees.findIndex((attendee) => attendee.id === attendeeId);
  if (attendeeIndex < 0) return;

  const [removedAttendee] = attendees.splice(attendeeIndex, 1);
  rsvpStatus.textContent = `${removedAttendee.name} was removed.`;
  rsvpStatus.classList.remove("error");
  eventLog.textContent = "click event → remove attendee";
  renderAttendees();
});

renderAttendees();
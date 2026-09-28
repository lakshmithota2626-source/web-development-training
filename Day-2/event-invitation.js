/**
 * NEXUS 2026 EVENT INVITATION INTERACTIVITY
 */

// 1. Live Countdown Timer (Target: October 15, 2026)
const targetDate = new Date("October 15, 2026 09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 2. Interactive VIP Pass Dynamic Update on Form Input
const fullNameInput = document.getElementById('fullName');
const jobTitleInput = document.getElementById('jobTitle');
const previewName = document.getElementById('previewName');
const previewRole = document.getElementById('previewRole');

fullNameInput.addEventListener('input', (e) => {
    previewName.textContent = e.target.value.trim() ? e.target.value.toUpperCase() : 'HONORED GUEST';
});

jobTitleInput.addEventListener('input', (e) => {
    previewRole.textContent = e.target.value.trim() ? e.target.value : 'Full-Stack Architect';
});

// 3. RSVP Form Submission & Ticket Generation Modal
const rsvpForm = document.getElementById('rsvpForm');
const ticketModal = document.getElementById('ticketModal');
const closeModal = document.getElementById('closeModal');

const modalName = document.getElementById('modalName');
const modalRole = document.getElementById('modalRole');
const modalTier = document.getElementById('modalTier');
const modalTicketId = document.getElementById('modalTicketId');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = fullNameInput.value || 'VIP Delegate';
    const roleVal = jobTitleInput.value || 'Full-Stack Developer';
    const tierVal = document.getElementById('passTier').value;

    // Generate random seat & unique ID
    const randomSeat = `ZONE-${['A', 'B', 'VIP'][Math.floor(Math.random() * 3)]} #${Math.floor(100 + Math.random() * 900)}`;
    const randomPassId = `NX-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Update modal details
    modalName.textContent = nameVal;
    modalRole.textContent = roleVal;
    modalTier.textContent = tierVal.toUpperCase();
    document.getElementById('modalSeat').textContent = randomSeat;
    modalTicketId.textContent = randomPassId;

    // Show modal
    ticketModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
    ticketModal.classList.remove('active');
});

ticketModal.addEventListener('click', (e) => {
    if (e.target === ticketModal) {
        ticketModal.classList.remove('active');
    }
});

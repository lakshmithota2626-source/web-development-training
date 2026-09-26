/**
 * DAY 1: CLIENT-SERVER COMMUNICATION INTERACTIVE SIMULATOR
 * 
 * Beginner-friendly JavaScript to bring the client-server
 * architecture diagram to life with animations and live logging.
 */

// 1. DOM Element References
const clientNode = document.getElementById('clientNode');
const serverNode = document.getElementById('serverNode');
const requestPacket = document.getElementById('requestPacket');
const responsePacket = document.getElementById('responsePacket');
const logConsole = document.getElementById('logConsole');
const protocolBadge = document.getElementById('protocolBadge');

const btnGet = document.getElementById('btnGet');
const btnPost = document.getElementById('btnPost');
const btn404 = document.getElementById('btn404');
const btnToggleHttps = document.getElementById('btnToggleHttps');

// State tracking
let isHttps = false;
let isBusy = false; // Prevents overlapping animations

/**
 * Appends a log line to the visual terminal inspector
 * @param {string} text - Message to display
 * @param {string} type - 'info' | 'req' | 'res-success' | 'res-error'
 */
function logMessage(text, type = 'info') {
    const p = document.createElement('p');
    p.className = `log-line ${type}`;
    const timestamp = new Date().toLocaleTimeString();
    p.textContent = `[${timestamp}] ${text}`;
    logConsole.appendChild(p);
    
    // Auto-scroll to bottom of log terminal
    logConsole.scrollTop = logConsole.scrollHeight;
}

/**
 * Runs a simulated Request -> Server Processing -> Response flow
 * @param {Object} config - Configuration for the simulation
 */
function simulateFlow({ requestText, responseText, reqLog, resLog, isError = false }) {
    if (isBusy) return;
    isBusy = true;

    // Reset previous animation classes
    requestPacket.classList.remove('anim-request');
    responsePacket.classList.remove('anim-response');
    clientNode.classList.remove('active');
    serverNode.classList.remove('active');

    // Update packet labels
    requestPacket.querySelector('span').textContent = requestText;
    responsePacket.querySelector('span').textContent = responseText;

    // 1. Client initiates request
    clientNode.classList.add('active');
    logMessage(`CLIENT: Preparing request...`, 'info');
    logMessage(`→ SENT: ${reqLog}`, 'req');

    // Trigger request animation across the network lane
    void requestPacket.offsetWidth; // Force CSS reflow
    requestPacket.classList.add('anim-request');

    // 2. Request reaches server
    setTimeout(() => {
        clientNode.classList.remove('active');
        serverNode.classList.add('active');
        logMessage(`SERVER: Request received. Looking up resources and processing headers...`, 'info');
    }, 1200);

    // 3. Server sends response back
    setTimeout(() => {
        void responsePacket.offsetWidth; // Force CSS reflow
        responsePacket.classList.add('anim-response');

        if (isError) {
            logMessage(`← RECEIVED: ${resLog}`, 'res-error');
        } else {
            logMessage(`← RECEIVED: ${resLog}`, 'res-success');
        }
    }, 1800);

    // 4. Response arrives back at Client
    setTimeout(() => {
        serverNode.classList.remove('active');
        clientNode.classList.add('active');
        logMessage(`CLIENT: Response received and rendered in viewport.`, 'info');

        setTimeout(() => {
            clientNode.classList.remove('active');
            isBusy = false;
        }, 500);
    }, 3000);
}

// -----------------------------------------------------------------------------
// EVENT LISTENERS FOR USER ACTIONS
// -----------------------------------------------------------------------------

// 1. GET Request Simulation
btnGet.addEventListener('click', () => {
    simulateFlow({
        requestText: 'GET /index.html',
        responseText: '200 OK (HTML Document)',
        reqLog: 'GET /index.html HTTP/1.1 | Host: example.com | Accept: text/html',
        resLog: 'HTTP/1.1 200 OK | Content-Type: text/html | Content-Length: 4096'
    });
});

// 2. POST Request Simulation
btnPost.addEventListener('click', () => {
    simulateFlow({
        requestText: 'POST /api/login',
        responseText: '200 OK (Token JSON)',
        reqLog: 'POST /api/login HTTP/1.1 | Body: {"user":"balaji","role":"student"}',
        resLog: 'HTTP/1.1 200 OK | Content-Type: application/json | {"status":"authenticated"}'
    });
});

// 3. 404 Not Found Request Simulation
btn404.addEventListener('click', () => {
    simulateFlow({
        requestText: 'GET /secret-file.pdf',
        responseText: '404 Not Found',
        reqLog: 'GET /secret-file.pdf HTTP/1.1 | Host: example.com',
        resLog: 'HTTP/1.1 404 Not Found | Message: The requested resource does not exist.',
        isError: true
    });
});

// 4. Toggle HTTP vs HTTPS
btnToggleHttps.addEventListener('click', () => {
    isHttps = !isHttps;
    if (isHttps) {
        protocolBadge.textContent = 'HTTPS (Port 443 - TLS 1.3)';
        protocolBadge.style.background = 'rgba(16, 185, 129, 0.2)';
        protocolBadge.style.borderColor = '#10b981';
        protocolBadge.style.color = '#6ee7b7';
        btnToggleHttps.textContent = '🔓 Switch back to HTTP';
        logMessage(`SECURITY: Upgraded connection to HTTPS (SSL/TLS encrypted).`, 'res-success');
    } else {
        protocolBadge.textContent = 'HTTP (Port 80)';
        protocolBadge.style.background = 'rgba(99, 102, 241, 0.15)';
        protocolBadge.style.borderColor = 'rgba(99, 102, 241, 0.4)';
        protocolBadge.style.color = '#a5b4fc';
        btnToggleHttps.textContent = '🔒 Toggle HTTPS Mode';
        logMessage(`SECURITY: Connection switched to plain HTTP (unencrypted).`, 'res-error');
    }
});

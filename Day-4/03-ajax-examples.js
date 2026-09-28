/**
 * ==============================================================================
 * DAY 4 - PART 3: AJAX & ASYNCHRONOUS DATA FETCHING EXAMPLES
 * ==============================================================================
 * 
 * Topics Covered:
 * 1. Modern Fetch API (GET Request with Async/Await)
 * 2. Modern Fetch API (POST Request with JSON Payload)
 * 3. Traditional XMLHttpRequest (XHR)
 * 4. jQuery AJAX ($.ajax and $.getJSON)
 * 5. Error Handling, Loading States & JSON Parsing
 */

console.log("=== 1. MODERN FETCH API (GET WITH ASYNC/AWAIT) ===");

/**
 * Fetches sample user posts from a public REST API or mock service
 */
async function fetchUserPosts(limit = 3) {
    const url = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`;
    
    try {
        console.log(`[AJAX Fetch]: Requesting data from ${url}...`);
        const response = await fetch(url);

        // Check if HTTP response status is OK (200-299)
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Posts successfully:", data);
        return data;
    } catch (error) {
        console.error("[AJAX Error]: Failed to fetch posts:", error.message);
        throw error;
    }
}

console.log("\n=== 2. FETCH API (POST REQUEST) ===");

/**
 * Sends a new post payload to the server
 */
async function createNewPost(title, body) {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    
    try {
        const payload = {
            title: title,
            body: body,
            userId: 1,
            createdAt: new Date().toISOString()
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Server returned error: ${response.status}`);
        }

        const createdRecord = await response.json();
        console.log("[AJAX POST Success]: Created new record:", createdRecord);
        return createdRecord;
    } catch (error) {
        console.error("[AJAX POST Error]:", error);
    }
}

console.log("\n=== 3. TRADITIONAL XMLHttpRequest (XHR) ===");

/**
 * Legacy XHR method for historical reference and deep networking understanding
 */
function fetchWithXHR(url, callbackSuccess, callbackError) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const parsedData = JSON.parse(xhr.responseText);
            callbackSuccess(parsedData);
        } else {
            callbackError(`XHR Error: ${xhr.status} ${xhr.statusText}`);
        }
    };

    xhr.onerror = function () {
        callbackError("Network connection failed.");
    };

    xhr.send();
}

console.log("\n=== 4. jQuery AJAX METHOD ($.ajax) ===");

/**
 * jQuery AJAX helper demonstrating $.ajax syntax
 */
function fetchWithJQuery(endpoint, targetElementId) {
    if (typeof $ !== 'undefined') {
        $.ajax({
            url: endpoint,
            type: 'GET',
            dataType: 'json',
            timeout: 5000,
            beforeSend: function () {
                $(`#${targetElementId}`).html('<em>Loading data via jQuery $.ajax()...</em>');
            },
            success: function (response) {
                console.log("[jQuery AJAX Success]:", response);
                $(`#${targetElementId}`).html(`<code>${JSON.stringify(response.slice(0, 2), null, 2)}</code>`);
            },
            error: function (xhr, status, error) {
                console.error("[jQuery AJAX Error]:", status, error);
                $(`#${targetElementId}`).html(`<span class="error">Failed: ${error}</span>`);
            }
        });
    }
}

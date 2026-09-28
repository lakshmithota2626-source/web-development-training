/**
 * ==============================================================================
 * DAY 4 - PART 2: jQuery, jQuery EVENTS & jQuery UI EXAMPLES
 * ==============================================================================
 * 
 * Topics Covered:
 * 1. jQuery Selectors & Traversal
 * 2. jQuery DOM Manipulation (.html, .text, .val, .addClass, .append)
 * 3. jQuery Animation Effects (.fadeIn, .fadeOut, .slideToggle)
 * 4. jQuery Event Handling (.on('click'), .hover, .change, .keyup, delegation)
 * 5. jQuery UI (Draggable, Droppable, Accordion, Tabs, Datepicker)
 */

// Note: Ensure jQuery is loaded via CDN before running this script
// <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
// <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>

/* Wait for Document Ready */
$(document).ready(function () {
    console.log("=== jQuery 3.7.1 Initialized ===");

    // 1. SELECTORS & DOM MANIPULATION
    // Selecting by ID and updating text/html
    $('#jqStatus').text('jQuery is active and listening.');

    // Getting and Setting Form values
    $('#jqInput').val('Sample text');
    const enteredVal = $('#jqInput').val();
    console.log("Input value via .val():", enteredVal);

    // Adding and removing classes
    $('.jq-badge').addClass('highlight-badge');

    // Appending & Prepending elements
    $('#jqList').append('<li class="jq-item">Appended item at bottom</li>');
    $('#jqList').prepend('<li class="jq-item">Prepended item at top</li>');

    // 2. jQuery EFFECTS & ANIMATIONS
    $('#btnFade, #btnJqFade').on('click', function () {
        // Fade in/out toggle with duration of 400ms
        $('#jqTargetBox').fadeToggle(400);
    });

    $('#btnSlide, #btnJqSlide').on('click', function () {
        // Slide toggle with callback on completion
        $('#jqTargetBox').slideToggle(300, function () {
            console.log("Slide animation completed.");
        });
    });

    $('#btnAnimate, #btnJqHighlight').on('click', function () {
        // Class and style highlight
        $('#jqTargetBox').toggleClass('ui-state-highlight');
    });

    // 3. jQuery EVENT HANDLING
    // Click event with event object
    $('.jq-action-btn').on('click', function (e) {
        e.preventDefault();
        console.log("Clicked button with text:", $(this).text());
    });

    // Hover event (mouseenter, mouseleave handlers)
    $('#jqHoverTarget').hover(
        function () {
            // Mouse Enter
            $(this).css('background-color', 'rgba(99, 102, 241, 0.3)');
        },
        function () {
            // Mouse Leave
            $(this).css('background-color', 'transparent');
        }
    );

    // Live Keyup and Change Events
    $('#jqSearchBox').on('keyup', function () {
        const query = $(this).val().toLowerCase();
        $('#jqList li').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(query) > -1);
        });
    });

    // Event Delegation (Useful for dynamically created elements)
    $('#jqList').on('click', '.jq-item', function () {
        $(this).toggleClass('completed-item');
    });

    // 4. jQuery UI INTERACTIONS & WIDGETS
    // Draggable & Droppable
    if ($.fn.draggable && $.fn.droppable) {
        $('.draggable-card').draggable({
            containment: '#uiContainmentZone',
            revert: 'invalid'
        });

        $('#dropZone').droppable({
            accept: '.draggable-card',
            drop: function (event, ui) {
                $(this).addClass('ui-state-highlight').find('p').html('Dropped item successfully!');
                ui.draggable.css('background-color', '#10b981');
            }
        });

        // jQuery UI Accordion
        $('#uiAccordion').accordion({
            collapsible: true,
            heightStyle: 'content'
        });

        // jQuery UI Tabs
        $('#uiTabs').tabs();

        // jQuery UI Datepicker
        $('#uiDatepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            minDate: 0
        });
    }
});

import '../style/writing.css'

import { Timer } from '../script/timer'

window.writeTimer = new Timer();
$(document).ready(function () {
    writeTimer.start();
})

$(window).unload(function () {
    writeTimer.end();
});


//https://codepen.io/soulrider911/pen/DdeGao
// $(function () {
//     var email = $("#email");
//     var name = $("#name");

//     function validate(field) {
//         if (field.val().length === 0) {
//             field.removeClass().addClass("error");
//             field.next().removeClass().addClass("fa fa-times");
//         } else {
//             field.removeClass().addClass("success");
//             field.next().removeClass().addClass("fa fa-check");
//         }
//         return field;
//     }

//     $('input').blur(function () {
//         validate($(this));
//     });

//     $("#submitBtn").on("click", function () {
//         validate(email);
//         validate(name);
//         if ($(email).val().length === 0 || $(name).val().length === 0)
//             $(this).removeClass().addClass("submit-error");
//         else {
//             $(this).removeClass().addClass("submit-success");
//         }
//         window.setTimeout(function () {
//             console.log("done");
//             $("#submitBtn").removeClass();
//         }, 3000)
//         return false;
//     });

// });

let wsClient;

////////////////////////////////////////////////
//////////////// DOM SETUP /////////////////////
////////////////////////////////////////////////

const messageBox = document.querySelector('#messageBox');
const messageForm = document.querySelector('#messageForm');

// Event handler when the client enters a message
messageForm.onsubmit = function (e) {
    e.preventDefault();

    // Get the message from the messageBox
    const message = messageBox.value;
    // Render the sent message on the client as your own and reset the messageBox
    showMessageSent(message);
    messageBox.value = '';

    sendMessageToServer(message);
}

////////////////////////////////////////////////
////////////// WS CLIENT LOGIC /////////////////
////////////////////////////////////////////////

function init() {

    /* Note: 
    Though the conditional block below is not necessary, it is a best practice to avoid
    tampering with a cluttered namespace.
    */

    // If a WebSocket connection exists already, close it
    if (wsClient) {
        wsClient.onerror = wsClient.onopen = wsClient.onclose = null;
        wsClient.close();
    }


    // TODO: 
    // Exercise 4: Create a new WebSocket connection with the server using the ws protocol.
    const URL = 'ws://localhost:' + PORT;
    wsClient = new WebSocket(URL)

    // TODO:
    // Exercise 5: Respond to connections by defining the .onopen event handler.
    wsClient.onopen = (event) => {
        console.log('WebSocket connection established!');
        const data = {
            type: 'newUser'
        }
        wsClient.send(JSON.stringify(data))
    }

    // TODO:
    // Exercise 7: Respond to messages from the servery by defining the .onmessage event handler
    // Exercise 9: Parse custom message types, formatting each message based on the type.
    wsClient.onmessage = (messageEvent) => {
        const message = messageEvent.data;
        const { type, payload } = JSON.parse(message);
        switch (type) {
            case 'newUser':
                showMessageReceived('<em>New user has joined<em>');
                break;
            case 'newMessage':
                showMessageReceived(payload.message);
                break
            default:
                break;
        }
    };


    /* Note:
    The event handlers below are useful for properly cleaning up a closed/broken WebSocket client connection.
    To read more about them, check out the WebSocket API documentation: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
    */

    // .onclose is executed when the socket connection is closed
    wsClient.onclose = (event) => {
        showMessageReceived('No WebSocket connection :(');
        wsClient = null;
    }

    // .onerror is executed when error event occurs on the WebSocket connection
    wsClient.onerror = (event) => {
        console.error("WebSocket error observed:", event);
        wsClient = null;
    }
}

function sendMessageToServer(message) {
    // Make sure the client is connected to the ws server
    if (!wsClient) {
        showMessageReceived('No WebSocket connection :(');
        return;
    }

    // TODO: 
    // Exercise 6: Send the message from the messageBox to the server
    // Exercise 9: Send the message in a custom message object with .type and .payload properties
    const data = {
        type: 'newMessage',
        payload: {
            message: message
        }
    }
    wsClient.send(JSON.stringify(data));


}

////////////////////////////////////////////////
//////////// DOM HELPER FUNCTIONS //////////////
////////////////////////////////////////////////

const messages = document.querySelector('.chat');

// These functions are just aliases of the showNewMessage function
function showMessageSent(message) {
    showNewMessage(message, 'sending');
}
function showMessageReceived(message) {
    showNewMessage(message, 'receiving');
}

// This function displays a message in the messages container node. 
// className may either be 'mine' or 'yours' (see styles.css for the distinction)
function showNewMessage(message, className) {
    // Create a text node element for the message
    const textNode = document.createElement('div');
    textNode.innerHTML = message;
    textNode.className = 'message';

    // Wrap the text node in a message element
    const messageNode = document.createElement('div');
    messageNode.className = 'messages ' + className;
    messageNode.appendChild(textNode);

    // Append the messageNode to the messages container element
    messages.appendChild(messageNode);
    messages.scrollTop = messages.scrollHeight;
}

// Start the WebSocket server
init();
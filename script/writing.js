import '../style/writing.css'

import { Timer } from '../script/timer'
import { dictionary } from "../script/dictionary";

window.writeTimer = new Timer();
$(document).ready(function () {
    writeTimer.start();
    showMessageReceived("Hello! How are you today?");
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

    let messages = [];
    document.querySelectorAll('.message').forEach((message) => {
        messages.push(message.innerHTML);
    });

    sendMessageToServer(messages);

}

async function sendMessageToServer(messagesList) {
    let data = await dictionary.postChatMessages(messagesList);
    showMessageReceived(data["response"])
}

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


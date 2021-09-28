const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

// Message from server
socket.on('message',message => {
  console.log(message);
  outputMessage(message);

  // scroll down
chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
e.preventDefault();
// get msg text
const msg = e.target.elements.msg.value;
// emitting a message to the server
socket.emit('chatMessage',msg);
// clear input
e.target.elements.msg.value = ""
e.target.elements.msg.focus()
});

// Output message to DOM
const outputMessage = msg => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `	<p class="meta">${msg.username} <span>${msg.time}</span></p>
  <p class="text">
    ${msg.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}
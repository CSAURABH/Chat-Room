const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// Get Username and room form url 
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const myname = username;
const socket = io();

// Join Room 
socket.emit('joinRoom', { username, room });
// GEt Room users room
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room),
    outputUserName(users)
})



socket.on('message', (message) => {
  outputmessage(message);
  // Scroll down 
  chatMessages.scrollTop = chatMessages.scrollHeight;
})


// ROOM JOIN MESSAGE 
socket.on('roomJoin-message', (message) => {
  roomJoinoutputmessage(message);
  // Scroll down 
  chatMessages.scrollTop = chatMessages.scrollHeight;
})


socket.on('joinRoommessageothers', (message) => {
  roomJoinoutputmessagetoothers(message);
  // Scroll down 
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

socket.on('roomleftmessage', (message) => {
  roomleftmessage(message);
  // Scroll down 
  chatMessages.scrollTop = chatMessages.scrollHeight;
})


// Message Submit 
// Get message text 
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  socket.emit('chatmessage', msg);
  e.target.elements.msg.value = '';
})

// Output Message 
function outputmessage(message) {
const stringmessage =message.text
// console.log(stringmessage)
  if (stringmessage.includes('~')) {
    console.log('I am in')
    botwarn(message);
  }
  else {
    const div = document.createElement('div');
    div.classList.add('message');
    if (message.username === myname) {
      div.classList.add('right');
    }
    else{
      div.classList.add('left');
    }
    div.innerHTML = `<p class="meta">${message.username}</p>
    <p class="text">
      ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
  }
}

function outputRoomName(room) {
  document.getElementById('room-name').innerHTML = `<p>${room}</p>`;
}

function outputUserName(users) {
  document.getElementById('users').innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}

function roomJoinoutputmessage(message) {
  const div = document.createElement('div');
  div.classList.add('botmessage');
  div.innerHTML = `
  <p class="text">
    CHAT ROOM BOT : ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

function roomJoinoutputmessagetoothers(message) {
  const div = document.createElement('div');
  div.classList.add('botmessage');
  div.innerHTML = `
  <p class="text">
    CHAT ROOM BOT : ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

function roomleftmessage(message) {
  const div = document.createElement('div');
  div.classList.add('botmessage');
  div.innerHTML = `
  <p class="text">
    CHAT ROOM BOT : ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}


function botwarn(message) {
  const div = document.createElement('div');
  div.classList.add('botwarn');
  div.innerHTML = `
  <p class="text">
    CHAT ROOM BOT : Please Follow Code of Conduct ! No Bad Language ${message.username} ⚠️
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}
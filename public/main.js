const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const authSection = document.getElementById('auth-section');
const chatSection = document.getElementById('chat-section');
const authMsg = document.getElementById('auth-msg');
const messagesEl = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');

registerBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value;
  fetch('/api/register', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ email, password, username })
  })
  .then(res => res.json())
  .then(data => {
    authMsg.textContent = data.message;
  });
});

loginBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  fetch('/api/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if(data.success){
      localStorage.setItem('user_id', data.user.id);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('rank', data.user.rank);
      authSection.style.display = 'none';
      chatSection.style.display = 'block';
      loadMessages();
      setInterval(loadMessages, 1000);
    } else {
      authMsg.textContent = data.message;
    }
  });
});

logoutBtn.addEventListener('click', () => {
  localStorage.clear();
  authSection.style.display = 'block';
  chatSection.style.display = 'none';
});

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = document.getElementById('message').value;
  const user_id = localStorage.getItem('user_id');
  fetch('/api/message', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ user_id, message })
  }).then(() => {
    document.getElementById('message').value = '';
    loadMessages();
  });
});

function loadMessages(){
  fetch('/api/messages')
    .then(res => res.json())
    .then(data => {
      messagesEl.innerHTML = data.messages.map(msg => `
        <div><strong>[${msg.rank}] ${msg.username}:</strong> ${msg.message}</div>
      `).join('');
    });
}

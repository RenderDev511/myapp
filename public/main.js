const countdownEl = document.getElementById("countdown");
const messagesEl = document.getElementById("messages");
const chatForm = document.getElementById("chat-form");

// 🔴 تحميل وقت الافتتاح
fetch('/.netlify/functions/opening-time')
  .then(res => res.json())
  .then(data => {
    const openingTime = new Date(data.opentime).getTime();
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = openingTime - now;

      if (distance < 0) {
        clearInterval(interval);
        countdownEl.innerHTML = "🚀 تم الافتتاح!";
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownEl.innerHTML = `${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
  })
  .catch(err => {
    console.error(err);
    countdownEl.innerHTML = "⚠️ فشل جلب وقت الافتتاح";
  });

// 🔵 جلب الرسائل
function loadMessages() {
  fetch('/.netlify/functions/chat')
    .then(res => res.json())
    .then(data => {
      messagesEl.innerHTML = data.messages.map(msg =>
        `<div><strong>${msg.username}:</strong> ${msg.message}</div>`
      ).join('');
    })
    .catch(err => {
      console.error(err);
      messagesEl.innerHTML = "⚠️ فشل جلب الرسائل";
    });
}

loadMessages();
setInterval(loadMessages, 1000);

// 📝 إرسال رسالة
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const google_id = localStorage.getItem("google_id");
  const message = document.getElementById("message").value;

  fetch('/.netlify/functions/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ google_id, message })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("message").value = '';
    loadMessages();
  })
  .catch(err => console.error(err));
});

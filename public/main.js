const searchBtn = document.getElementById('search-btn');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  resultDiv.innerHTML = '🔎 جاري البحث...';

  try {
    const userRes = await fetch('/.netlify/functions/getUser', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ username })
    });

    const userData = await userRes.json();
    if(userData.data.length === 0) {
      resultDiv.innerHTML = '❌ الحساب غير موجود';
      return;
    }

    const userId = userData.data[0].id;
    const displayName = userData.data[0].displayName;

    const avatarRes = await fetch('/.netlify/functions/getAvatar', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ userId })
    });
    const avatarData = await avatarRes.json();
    const avatarUrl = avatarData.data[0].imageUrl;

    resultDiv.innerHTML = `
      <h2>${displayName}</h2>
      <img src="${avatarUrl}" alt="Roblox Avatar" />
    `;

  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = '⚠️ حدث خطأ أثناء جلب البيانات';
  }
});

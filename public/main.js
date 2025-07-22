const searchBtn = document.getElementById('search-btn');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  resultDiv.innerHTML = '🔎 جاري البحث...';

  try {
    // جلب userId من username
    const userRes = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ usernames: [username] })
    });

    const userData = await userRes.json();
    if(userData.data.length === 0) {
      resultDiv.innerHTML = '❌ الحساب غير موجود';
      return;
    }

    const userId = userData.data[0].id;
    const displayName = userData.data[0].displayName;

    // رابط صورة الـ Avatar
    const avatarUrl = `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`;

    resultDiv.innerHTML = `
      <h2>${displayName}</h2>
      <img src="${avatarUrl}" alt="Roblox Avatar" />
    `;

  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = '⚠️ حدث خطأ أثناء جلب البيانات';
  }
});

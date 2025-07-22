const searchBtn = document.getElementById('search-btn');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  resultDiv.innerHTML = '🔎 جاري البحث...';

  try {
    // جلب userId
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

    // جلب صورة avatar
    const avatarRes = await fetch('/.netlify/functions/getAvatar', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ userId })
    });
    const avatarData = await avatarRes.json();
    const avatarUrl = avatarData.data[0].imageUrl;

    // جلب معلومات الحساب
    const profileRes = await fetch('/.netlify/functions/getProfile', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ userId })
    });
    const profileData = await profileRes.json();

    // عرض النتيجة
    resultDiv.innerHTML = `
      <h2>${profileData.displayName}</h2>
      <img src="${avatarUrl}" alt="Roblox Avatar" />
      <p>🆔 ID: ${profileData.id}</p>
      <p>📝 Bio: ${profileData.description || "لايوجد"}</p>
      <p>📅 Created: ${new Date(profileData.created).toLocaleDateString()}</p>
    `;

  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = '⚠️ حدث خطأ أثناء جلب البيانات';
  }
});

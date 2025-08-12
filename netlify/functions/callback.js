export async function handler(event) {
  const code = event.queryStringParameters.code;

  if (!code) {
    return { statusCode: 400, body: 'No code provided' };
  }

  // طلب التوكن
  const params = new URLSearchParams();
  params.append('client_id', process.env.CLIENT_ID);
  params.append('client_secret', process.env.CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'https://soon-new.netlify.app/callback');

  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  const tokenData = await tokenRes.json();
  if (tokenData.error) {
    return { statusCode: 400, body: JSON.stringify(tokenData) };
  }

  // جلب بيانات المستخدم
  const userRes = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `${tokenData.token_type} ${tokenData.access_token}` },
  });

  const userData = await userRes.json();

  // رابط صورة البروفايل
  const avatarURL = userData.avatar
    ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
    : `https://cdn.discordapp.com/embed/avatars/0.png`;

  // رقم تسجيل عشوائي
  const randomID = Math.floor(100000 + Math.random() * 900000);

  // صفحة HTML احترافية
  const html = `
  <!DOCTYPE html>
  <html lang="ar">
  <head>
    <meta charset="UTF-8">
    <title>مرحباً ${userData.username}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #5865F2, #23272A);
        color: white;
        text-align: center;
        padding: 50px;
      }
      .card {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 15px;
        padding: 20px;
        display: inline-block;
        box-shadow: 0 4px 15px rgba(0,0,0,0.5);
      }
      img {
        border-radius: 50%;
        width: 120px;
        height: 120px;
        border: 4px solid white;
      }
      h1 {
        margin: 15px 0 5px;
      }
      p {
        margin: 5px 0;
        font-size: 18px;
      }
      .id {
        background: rgba(255,255,255,0.2);
        padding: 5px 10px;
        border-radius: 8px;
        display: inline-block;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <img src="${avatarURL}" alt="Avatar">
      <h1>${userData.username}#${userData.discriminator}</h1>
      <p class="id">رقم تسجيلك: ${randomID}</p>
    </div>
  </body>
  </html>
  `;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: html
  };
}

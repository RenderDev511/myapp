export async function handler(event) {
  const code = event.queryStringParameters.code;

  if (!code) {
    return { statusCode: 400, body: 'No code provided' };
  }

  // تبادل الكود مع التوكن
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

  return {
    statusCode: 200,
    body: `مرحباً ${userData.username}#${userData.discriminator}`,
  };
}

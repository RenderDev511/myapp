export async function handler(event, context) {
  const params = new URLSearchParams();
  params.append('client_id', process.env.CLIENT_ID);
  params.append('client_secret', process.env.CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('code', event.queryStringParameters.code);
  params.append('redirect_uri', 'https://your-netlify-site.netlify.app/callback');

  // طلب الـ token من Discord
  const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const tokenData = await tokenResponse.json();

  // طلب بيانات المستخدم
  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `${tokenData.token_type} ${tokenData.access_token}`,
    },
  });

  const userData = await userResponse.json();

  return {
    statusCode: 200,
    body: JSON.stringify(userData),
  };
}

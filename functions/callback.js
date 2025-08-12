import fetch from "node-fetch";

export async function handler(event) {
  const code = event.queryStringParameters.code;
  if (!code) {
    return { statusCode: 400, body: "No code provided" };
  }

  const params = new URLSearchParams();
  params.append("client_id", process.env.CLIENT_ID);
  params.append("client_secret", process.env.CLIENT_SECRET);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "https://soon-new.netlify.app/callback");

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    return { statusCode: 400, body: JSON.stringify(tokenData) };
  }

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` }
  });
  const userData = await userRes.json();

  const avatarUrl = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
  const randomId = Math.floor(Math.random() * 1000000);

  const redirectUrl = `https://soon-new.netlify.app?user=${encodeURIComponent(JSON.stringify({
    username: `${userData.username}#${userData.discriminator}`,
    avatar: avatarUrl,
    randomId
  }))}`;

  return {
    statusCode: 302,
    headers: { Location: redirectUrl }
  };
}

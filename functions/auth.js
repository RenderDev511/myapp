export async function handler() {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = encodeURIComponent("https://soon-new.netlify.app/callback");
  const scope = "identify";

  const url = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  return {
    statusCode: 302,
    headers: { Location: url }
  };
}

exports.handler = async (event) => {
  try {
    const { userId } = JSON.parse(event.body);

    const res = await fetch(`https://users.roblox.com/v1/users/${userId}`);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error('❌ Function Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};

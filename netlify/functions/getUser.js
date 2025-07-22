const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { username } = JSON.parse(event.body);

  const res = await fetch('https://users.roblox.com/v1/usernames/users', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ usernames: [username] })
  });

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};

app.get("/callback", async (req, res) => {
    const code = req.query.code;

    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
            scope: "identify"
        })
    });

    const tokens = await tokenResponse.json();

    // Get user info using the access token
    const userResponse = await fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${tokens.access_token}` }
    });
    const user = await userResponse.json();

    // Save to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db("discordAuth");
    const collection = db.collection("authorizedUsers");

    await collection.updateOne(
        { id: user.id },
        { $set: {
            id: user.id,
            username: user.username,
            discriminator: user.discriminator,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
        }},
        { upsert: true }
    );

    await client.close();

    res.send("✅ Authorized successfully!");
});

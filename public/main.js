    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const dailyBtn = document.getElementById('daily');
    const coinsDiv = document.getElementById('coins');
    const productsDiv = document.getElementById('products');

    let currentUser = null;

    registerBtn.addEventListener('click', async () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const username = document.getElementById('username').value;

      const res = await fetch('/.netlify/functions/register', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, password, username })
      });
      const data = await res.json();
      alert(data.message || data.error);
    });

    loginBtn.addEventListener('click', async () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const res = await fetch('/.netlify/functions/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.user) {
        currentUser = data.user;
        coinsDiv.innerText = `💰 Coins: ${currentUser.coins}`;
        loadProducts();
      } else {
        alert(data.error);
      }
    });

    dailyBtn.addEventListener('click', async () => {
      if (!currentUser) {
        alert('سجل دخول أولًا');
        return;
      }
      const res = await fetch('/.netlify/functions/dailyReward', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ userId: currentUser.id })
      });
      const data = await res.json();
      alert(data.message || data.error);
      if (data.reward) {
        currentUser.coins += data.reward;
        coinsDiv.innerText = `💰 Coins: ${currentUser.coins}`;
      }
    });

    async function loadProducts() {
      const res = await fetch('/.netlify/functions/getProducts');
      const products = await res.json();

      productsDiv.innerHTML = products.map(p => `
        <div>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <p>💰 ${p.price} Coins</p>
          <button onclick="buyProduct(${p.id}, ${p.price})">شراء</button>
        </div>
      `).join('');
    }

    async function buyProduct(productId, price) {
      if (!currentUser) {
        alert('سجل دخول أولًا');
        return;
      }
      const res = await fetch('/.netlify/functions/purchaseProduct', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ userId: currentUser.id, productId })
      });
      const data = await res.json();
      alert(data.message || data.error);
      if (data.message) {
        currentUser.coins -= price;
        coinsDiv.innerText = `💰 Coins: ${currentUser.coins}`;
      }
    }

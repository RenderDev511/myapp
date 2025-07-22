      import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
      import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

      const firebaseConfig = {
        apiKey: "AIzaSyCZ9FO7mP9YuXZT7vPkAiiTgp4483mvmAg",
        authDomain: "my-website-a5680.firebaseapp.com",
        projectId: "my-website-a5680",
        storageBucket: "my-website-a5680.appspot.com",
        messagingSenderId: "372439642549",
        appId: "1:372439642549:web:cc8626c15be2f493f0e9fc",
        measurementId: "G-6CT17J47SK"
      };

      const app = initializeApp(firebaseConfig);
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      document.getElementById("login-btn").addEventListener("click", () => {
        signInWithPopup(auth, provider)
          .then(result => {
            const user = result.user;
            localStorage.setItem("google_id", user.uid);
            checkUsername(user.uid);
          })
          .catch(error => console.error(error));
      });

      function checkUsername(google_id) {
        fetch('/.netlify/functions/check-username', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ google_id })
        })
        .then(res => res.json())
        .then(data => {
          if (!data.username) {
            document.getElementById("username-section").style.display = "block";
          } else {
            localStorage.setItem("username", data.username);
            document.getElementById("username-section").style.display = "none";
          }
        })
        .catch(err => console.error(err));
      }

      document.getElementById("username-save-btn").addEventListener("click", () => {
        const google_id = localStorage.getItem("google_id");
        const username = document.getElementById("username-input").value;
        fetch('/.netlify/functions/save-username', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ google_id, username })
        })
        .then(() => {
          localStorage.setItem("username", username);
          document.getElementById("username-section").style.display = "none";
        })
        .catch(err => console.error(err));
      });

      onAuthStateChanged(auth, (user) => {
        if (user) {
          localStorage.setItem("google_id", user.uid);
          checkUsername(user.uid);
        }
      });

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQVwN3Fu2jZSvnqZo8R7hM718XQVapSEc",
  authDomain: "web1-5d259.firebaseapp.com",
  projectId: "web1-5d259",
  storageBucket: "web1-5d259.firebasestorage.app",
  messagingSenderId: "122295342096",
  appId: "1:122295342096:web:39a4fb2c6724891aba2695"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const profileModal = document.getElementById('profileModal');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeButtons = document.querySelectorAll('.close');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const saveProfile = document.getElementById('saveProfile');
const claimRewardBtn = document.getElementById('claimReward');
const rewardHistoryList = document.getElementById('rewardHistoryList');

// User state
let currentUser = null;
let userCoins = 0;
let lastRewardClaim = null;

// Modal Functions
function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Event Listeners for Modals
loginBtn.addEventListener('click', () => openModal(loginModal));
signupBtn.addEventListener('click', () => openModal(signupModal));

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        closeModal(loginModal);
        closeModal(signupModal);
        closeModal(profileModal);
    });
});

showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(signupModal);
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signupModal);
    openModal(loginModal);
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) closeModal(loginModal);
    if (e.target === signupModal) closeModal(signupModal);
    if (e.target === profileModal) closeModal(profileModal);
});

// Authentication Functions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Logged in:', userCredential.user);
            closeModal(loginModal);
            updateUIForLoggedInUser(userCredential.user);
        })
        .catch((error) => {
            alert('Login error: ' + error.message);
        });
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = signupForm.querySelector('input[type="text"]').value;
    const email = signupForm.querySelectorAll('input[type="email"]')[0].value;
    const password = signupForm.querySelector('input[type="password"]').value;
    const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Save additional user data
            return db.collection('users').doc(userCredential.user.uid).set({
                name: name,
                email: email,
                coins: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            console.log('Signed up and data saved');
            closeModal(signupModal);
            updateUIForLoggedInUser(auth.currentUser);
        })
        .catch((error) => {
            alert('Signup error: ' + error.message);
        });
});

// Auth State Listener
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        updateUIForLoggedInUser(user);
        loadUserData(user.uid);
    } else {
        currentUser = null;
        updateUIForLoggedOutUser();
    }
});

// UI Update Functions
function updateUIForLoggedInUser(user) {
    loginBtn.textContent = 'Profile';
    loginBtn.removeEventListener('click', () => openModal(loginModal));
    loginBtn.addEventListener('click', () => openModal(profileModal));

    signupBtn.textContent = 'Logout';
    signupBtn.removeEventListener('click', () => openModal(signupModal));
    signupBtn.addEventListener('click', () => {
        auth.signOut();
    });

    // Load user data
    loadUserData(user.uid);
}

function updateUIForLoggedOutUser() {
    loginBtn.textContent = 'Login';
    loginBtn.removeEventListener('click', () => openModal(profileModal));
    loginBtn.addEventListener('click', () => openModal(loginModal));

    signupBtn.textContent = 'Sign Up';
    signupBtn.removeEventListener('click', () => auth.signOut());
    signupBtn.addEventListener('click', () => openModal(signupModal));
}

// User Data Functions
function loadUserData(uid) {
    db.collection('users').doc(uid).get()
        .then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                userCoins = userData.coins || 0;
                lastRewardClaim = userData.lastRewardClaim || null;

                // Update profile modal
                document.getElementById('userName').value = userData.name || '';
                document.getElementById('userEmail').value = userData.email || '';
                document.getElementById('userCoins').value = userCoins;

                // Update reward system
                updateRewardSystem();
            }
        })
        .catch((error) => {
            console.error('Error loading user data:', error);
        });
}

function saveUserData(uid, data) {
    db.collection('users').doc(uid).update(data)
        .then(() => {
            console.log('User data updated');
        })
        .catch((error) => {
            console.error('Error updating user data:', error);
        });
}

saveProfile.addEventListener('click', () => {
    if (!currentUser) return;

    const name = document.getElementById('userName').value;
    const coins = parseInt(document.getElementById('userCoins').value) || 0;

    saveUserData(currentUser.uid, {
        name: name,
        coins: coins,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert('Profile saved successfully!');
});

// Reward System
function updateRewardSystem() {
    // Check if user can claim reward
    const now = new Date();
    if (lastRewardClaim) {
        const lastClaimDate = lastRewardClaim.toDate();
        const timeDiff = now - lastClaimDate;
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        if (hoursDiff < 24) {
            const timeLeft = 24 - hoursDiff;
            claimRewardBtn.disabled = true;
            claimRewardBtn.textContent = `Available in ${Math.ceil(timeLeft)} hours`;
            return;
        }
    }

    claimRewardBtn.disabled = false;
    claimRewardBtn.textContent = 'Claim Daily Reward';
}

claimRewardBtn.addEventListener('click', () => {
    if (!currentUser) {
        alert('Please log in to claim rewards');
        return;
    }

    const rewardAmount = 50; // Coins to give
    const newCoins = userCoins + rewardAmount;

    saveUserData(currentUser.uid, {
        coins: newCoins,
        lastRewardClaim: firebase.firestore.FieldValue.serverTimestamp()
    });

    userCoins = newCoins;
    lastRewardClaim = new Date();

    document.getElementById('userCoins').value = userCoins;

    // Add to reward history
    const historyItem = document.createElement('li');
    historyItem.textContent = `+${rewardAmount} coins - ${new Date().toLocaleDateString()}`;
    rewardHistoryList.prepend(historyItem);

    if (rewardHistoryList.children.length > 5) {
        rewardHistoryList.removeChild(rewardHistoryList.lastChild);
    }

    // Remove "No rewards" message if present
    if (rewardHistoryList.children[0].textContent === 'No rewards claimed yet') {
        rewardHistoryList.removeChild(rewardHistoryList.firstChild);
    }

    alert(`You've claimed ${rewardAmount} coins!`);
    updateRewardSystem();
});

// Tool Purchase Function
document.querySelectorAll('.tool-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!currentUser) {
            alert('Please log in to purchase tools');
            openModal(loginModal);
            return;
        }

        const toolCard = this.closest('.tool-card');
        const toolName = toolCard.querySelector('h3').textContent;
        const coinElement = toolCard.querySelector('.coins');
        const coinText = coinElement.textContent;
        const price = parseInt(coinText);

        if (userCoins >= price) {
            const newCoins = userCoins - price;
            saveUserData(currentUser.uid, {
                coins: newCoins
            });

            userCoins = newCoins;
            document.getElementById('userCoins').value = userCoins;

            alert(`Successfully purchased ${toolName} for ${price} coins!`);
        } else {
            alert(`Not enough coins! You need ${price - userCoins} more coins.`);
        }
    });
});

// Initialize reward countdown
function updateCountdown() {
    const now = new Date();
    const nextReward = new Date();
    nextReward.setHours(24, 0, 0, 0);

    if (lastRewardClaim) {
        const lastClaimDate = lastRewardClaim.toDate ? lastRewardClaim.toDate() : new Date(lastRewardClaim);
        nextReward.setTime(lastClaimDate.getTime() + (24 * 60 * 60 * 1000));
    }

    const timeDiff = nextReward - now;

    if (timeDiff > 0) {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Initialize with some sample reward history
document.addEventListener('DOMContentLoaded', () => {
    // Add sample reward history if none exists
    if (rewardHistoryList.children.length === 1 && 
        rewardHistoryList.children[0].textContent === 'No rewards claimed yet') {
        // Keep the message for now
    }
});
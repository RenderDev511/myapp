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
const loadingScreen = document.getElementById('loadingScreen');
const appContainer = document.getElementById('appContainer');
const featureModal = document.getElementById('featureModal');
const closeButtons = document.querySelectorAll('.close');
const closeModalBtn = document.querySelector('.close-modal');

// Simulate loading process
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        appContainer.classList.remove('hidden');

        // Show feature modal after a short delay
        setTimeout(() => {
            featureModal.classList.remove('hidden');
        }, 1000);
    }, 2000);
});

// Close modal functionality
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        featureModal.classList.add('hidden');
    });
});

closeModalBtn.addEventListener('click', () => {
    featureModal.classList.add('hidden');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === featureModal) {
        featureModal.classList.add('hidden');
    }
});

// Channel switching
document.querySelectorAll('.channel').forEach(channel => {
    channel.addEventListener('click', function() {
        document.querySelectorAll('.channel').forEach(ch => {
            ch.classList.remove('active');
        });
        this.classList.add('active');

        const channelName = this.querySelector('span').textContent;
        document.querySelector('.channel-info h2').textContent = channelName;

        // Update channel description
        const descriptions = {
            'general': 'Welcome to the general channel!',
            'development': 'Discuss all things development',
            'design': 'Share design ideas and feedback',
            'random': 'Talk about anything and everything'
        };

        document.querySelector('.channel-info p').textContent = descriptions[channelName] || 'Channel description';
    });
});

// Message sending
const messageInput = document.querySelector('.message-input input');
const chatMessages = document.querySelector('.chat-messages');

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && messageInput.value.trim() !== '') {
        sendMessage(messageInput.value);
        messageInput.value = '';
    }
});

function sendMessage(text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageElement.innerHTML = `
        <div class="user-avatar">YOU</div>
        <div class="message-content">
            <div class="message-header">
                <span class="username">YourUsername</span>
                <span class="timestamp">Today at ${timeString}</span>
            </div>
            <div class="message-text">${text}</div>
        </div>
    `;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add reaction to messages
document.querySelectorAll('.message').forEach(message => {
    message.addEventListener('click', function(e) {
        if (e.target.classList.contains('message-text')) {
            // Add reaction effect
            const reaction = document.createElement('div');
            reaction.classList.add('reaction');
            reaction.innerHTML = '<i class="fas fa-heart"></i>';
            reaction.style.position = 'absolute';
            reaction.style.left = (e.clientX - 20) + 'px';
            reaction.style.top = (e.clientY - 20) + 'px';
            reaction.style.fontSize = '2rem';
            reaction.style.color = 'var(--danger)';
            reaction.style.pointerEvents = 'none';
            reaction.style.zIndex = '100';
            reaction.style.animation = 'floatUp 1s forwards';

            document.body.appendChild(reaction);

            // Remove after animation
            setTimeout(() => {
                reaction.remove();
            }, 1000);
        }
    });
});

// Add CSS for reaction animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-50px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Server icon switching
document.querySelectorAll('.server-icon:not(.add-server)').forEach(icon => {
    icon.addEventListener('click', function() {
        document.querySelectorAll('.server-icon').forEach(i => {
            i.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Toggle category visibility
document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', function() {
        const icon = this.querySelector('i');
        const category = this.parentElement;

        if (icon.classList.contains('fa-chevron-right')) {
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-down');
            // In a real app, you would show the channels here
        } else {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-right');
            // In a real app, you would hide the channels here
        }
    });
});

// User status indicator
setInterval(() => {
    const statuses = ['Online', 'Away', 'Do Not Disturb', 'Invisible'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    document.querySelector('.user-status').textContent = randomStatus;
}, 30000);

// Theme customization
function applyTheme(theme) {
    const root = document.documentElement;

    if (theme === 'dark') {
        root.style.setProperty('--dark', '#1e1f22');
        root.style.setProperty('--darker', '#121316');
        root.style.setProperty('--dark-gray', '#313338');
        root.style.setProperty('--darker-gray', '#2b2d31');
    } else if (theme === 'light') {
        root.style.setProperty('--dark', '#f2f3f5');
        root.style.setProperty('--darker', '#e3e5e8');
        root.style.setProperty('--dark-gray', '#ffffff');
        root.style.setProperty('--darker-gray', '#f9f9f9');
        root.style.setProperty('--light', '#1e1f22');
        root.style.setProperty('--gray', '#4f5660');
    }
}

// Simulate real-time features
function simulateRealTimeFeatures() {
    // Simulate typing indicator
    setInterval(() => {
        if (Math.random() > 0.7) {
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('message');
            typingIndicator.innerHTML = `
                <div class="user-avatar">JD</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="username">JohnDeveloper</span>
                    </div>
                    <div class="message-text">
                        <span class="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                </div>
            `;

            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Remove after random time
            setTimeout(() => {
                if (typingIndicator.parentNode) {
                    typingIndicator.remove();
                }
            }, 2000);
        }
    }, 5000);

    // Simulate new messages
    setInterval(() => {
        if (Math.random() > 0.8) {
            const users = ['AlexSmith', 'MariaJones', 'TomPeterson'];
            const messages = [
                'Just implemented the new feature!',
                'Anyone else experiencing issues with the latest update?',
                'Check out this cool article I found',
                'Meeting in 10 minutes in the voice channel',
                'The new design looks amazing!',
                'Can someone help me with this bug?',
                'Happy coding everyone!',
                'New release is coming soon!'
            ];

            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];

            const messageElement = document.createElement('div');
            messageElement.classList.add('message');

            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            messageElement.innerHTML = `
                <div class="user-avatar">${randomUser.substring(0, 2)}</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="username">${randomUser}</span>
                        <span class="timestamp">Today at ${timeString}</span>
                    </div>
                    <div class="message-text">${randomMessage}</div>
                </div>
            `;

            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }, 8000);
}

// Initialize real-time features
simulateRealTimeFeatures();

// Add notification badge to app icon
function addNotificationBadge() {
    const appIcon = document.querySelector('.server-icon.active');
    if (appIcon && !document.querySelector('.notification-badge')) {
        const badge = document.createElement('div');
        badge.classList.add('notification-badge');
        badge.textContent = '9+';
        badge.style.position = 'absolute';
        badge.style.top = '-5px';
        badge.style.right = '-5px';
        badge.style.backgroundColor = 'var(--danger)';
        badge.style.color = 'white';
        badge.style.borderRadius = '50%';
        badge.style.width = '20px';
        badge.style.height = '20px';
        badge.style.display = 'flex';
        badge.style.alignItems = 'center';
        badge.style.justifyContent = 'center';
        badge.style.fontSize = '0.7rem';
        badge.style.fontWeight = 'bold';

        appIcon.style.position = 'relative';
        appIcon.appendChild(badge);
    }
}

// Add notification badge after some time
setTimeout(addNotificationBadge, 5000);

// Simulate user online status changes
setInterval(() => {
    const members = document.querySelectorAll('.member');
    members.forEach(member => {
        if (Math.random() > 0.5 && !member.querySelector('.user-avatar').classList.contains('bot')) {
            const avatar = member.querySelector('.user-avatar');
            if (avatar.classList.contains('online')) {
                avatar.classList.remove('online');
            } else {
                avatar.classList.add('online');
            }
        }
    });
}, 10000);

// Add voice activity indicator
function addVoiceActivity() {
    const voiceChannels = document.querySelectorAll('.channel i.fa-microphone');
    voiceChannels.forEach(icon => {
        if (Math.random() > 0.5) {
            const activity = document.createElement('div');
            activity.classList.add('voice-activity');
            activity.style.position = 'absolute';
            activity.style.right = '5px';
            activity.style.top = '50%';
            activity.style.transform = 'translateY(-50%)';
            activity.style.width = '8px';
            activity.style.height = '8px';
            activity.style.borderRadius = '50%';
            activity.style.backgroundColor = 'var(--success)';
            activity.style.boxShadow = '0 0 0 0 rgba(59, 165, 93, 0.7)';
            activity.style.animation = 'pulse 1.5s infinite';

            icon.style.position = 'relative';
            icon.appendChild(activity);
        }
    });
}

// Add CSS for pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(59, 165, 93, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(59, 165, 93, 0); }
        100% { box-shadow: 0 0 0 0 rgba(59, 165, 93, 0); }
    }
`;
document.head.appendChild(pulseStyle);

// Add voice activity after some time
setTimeout(addVoiceActivity, 3000);

// Add hover effect to user avatars
document.querySelectorAll('.user-avatar').forEach(avatar => {
    avatar.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.2s ease';
    });

    avatar.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Simulate typing in message input
function simulateTyping() {
    const messages = [
        'Hello everyone!',
        'How is everyone doing today?',
        'Just finished a great feature',
        'Anyone working on the new project?',
        'Check out this cool tool I found',
        'Meeting at 3 PM today',
        'Happy coding!'
    ];

    let index = 0;

    setInterval(() => {
        if (messageInput.value === '') {
            messageInput.placeholder = messages[index];
            index = (index + 1) % messages.length;
        }
    }, 3000);
}

simulateTyping();

// Add emoji picker functionality
document.querySelector('.fa-face-smile').addEventListener('click', function() {
    const emojiPicker = document.createElement('div');
    emojiPicker.classList.add('emoji-picker');
    emojiPicker.innerHTML = `
        <div class="emoji-grid">
            <span>😀</span><span>😂</span><span>😍</span><span>😎</span>
            <span>🤩</span><span>🥳</span><span>👍</span><span>👏</span>
            <span>🔥</span><span>💯</span><span>🚀</span><span>💡</span>
        </div>
    `;

    emojiPicker.style.position = 'absolute';
    emojiPicker.style.bottom = '60px';
    emojiPicker.style.right = '20px';
    emojiPicker.style.background = 'var(--dark-gray)';
    emojiPicker.style.borderRadius = '8px';
    emojiPicker.style.padding = '10px';
    emojiPicker.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    emojiPicker.style.zIndex = '100';

    document.querySelector('.message-input').appendChild(emojiPicker);

    // Add click events to emojis
    emojiPicker.querySelectorAll('span').forEach(emoji => {
        emoji.style.cursor = 'pointer';
        emoji.style.fontSize = '1.5rem';
        emoji.style.padding = '5px';
        emoji.style.borderRadius = '4px';

        emoji.addEventListener('click', function() {
            messageInput.value += this.textContent;
            emojiPicker.remove();
            messageInput.focus();
        });

        emoji.addEventListener('mouseenter', function() {
            this.style.background = 'var(--darker-gray)';
        });

        emoji.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
    });

    // Close emoji picker when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closePicker(e) {
            if (!emojiPicker.contains(e.target) && e.target !== document.querySelector('.fa-face-smile')) {
                emojiPicker.remove();
                document.removeEventListener('click', closePicker);
            }
        });
    }, 100);
});

// Add file upload simulation
document.querySelector('.fa-paperclip').addEventListener('click', function() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,.pdf,.doc,.txt';

    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            const fileName = this.files[0].name;
            const fileSize = (this.files[0].size / 1024 / 1024).toFixed(2);

            const messageElement = document.createElement('div');
            messageElement.classList.add('message');

            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            messageElement.innerHTML = `
                <div class="user-avatar">YOU</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="username">YourUsername</span>
                        <span class="timestamp">Today at ${timeString}</span>
                    </div>
                    <div class="message-text">
                        <div class="file-attachment">
                            <i class="fas fa-file"></i>
                            <div>
                                <div>${fileName}</div>
                                <div style="font-size: 0.8rem; color: var(--gray);">${fileSize} MB</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    fileInput.click();
});

// Add search functionality
document.querySelector('.fa-search').addEventListener('click', function() {
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('search-container');
    searchContainer.innerHTML = `
        <input type="text" placeholder="Search messages" class="search-input">
        <div class="search-results">
            <div class="search-result">Message from JohnDeveloper: "Just implemented the new feature!"</div>
            <div class="search-result">Message from AlexSmith: "Check out this cool article I found"</div>
            <div class="search-result">Message from YourUsername: "The new design looks amazing!"</div>
        </div>
    `;

    searchContainer.style.position = 'absolute';
    searchContainer.style.top = '60px';
    searchContainer.style.right = '20px';
    searchContainer.style.width = '300px';
    searchContainer.style.background = 'var(--dark-gray)';
    searchContainer.style.borderRadius = '8px';
    searchContainer.style.padding = '15px';
    searchContainer.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    searchContainer.style.zIndex = '100';

    document.querySelector('.chat-header').appendChild(searchContainer);

    const searchInput = searchContainer.querySelector('.search-input');
    searchInput.style.width = '100%';
    searchInput.style.padding = '10px';
    searchInput.style.borderRadius = '4px';
    searchInput.style.border = 'none';
    searchInput.style.background = 'var(--darker-gray)';
    searchInput.style.color = 'var(--light)';
    searchInput.focus();

    const searchResults = searchContainer.querySelector('.search-results');
    searchResults.style.marginTop = '10px';

    const searchResultElements = searchResults.querySelectorAll('.search-result');
    searchResultElements.forEach(result => {
        result.style.padding = '8px';
        result.style.borderRadius = '4px';
        result.style.cursor = 'pointer';
        result.style.marginBottom = '5px';

        result.addEventListener('mouseenter', function() {
            this.style.background = 'var(--darker-gray)';
        });

        result.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });

        result.addEventListener('click', function() {
            searchContainer.remove();
        });
    });

    // Close search when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeSearch(e) {
            if (!searchContainer.contains(e.target) && e.target !== document.querySelector('.fa-search')) {
                searchContainer.remove();
                document.removeEventListener('click', closeSearch);
            }
        });
    }, 100);
});

// Add notification permission request
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            }
        });
    }
}

// Request notification permission after a delay
setTimeout(requestNotificationPermission, 10000);

// Add theme switcher
document.querySelector('.fa-cog').addEventListener('click', function() {
    const themeSwitcher = document.createElement('div');
    themeSwitcher.classList.add('theme-switcher');
    themeSwitcher.innerHTML = `
        <h4>Theme Settings</h4>
        <div class="theme-option" data-theme="dark">Dark Theme</div>
        <div class="theme-option" data-theme="light">Light Theme</div>
        <div class="theme-option" data-theme="auto">Auto (System)</div>
    `;

    themeSwitcher.style.position = 'absolute';
    themeSwitcher.style.bottom = '60px';
    themeSwitcher.style.right = '20px';
    themeSwitcher.style.width = '200px';
    themeSwitcher.style.background = 'var(--dark-gray)';
    themeSwitcher.style.borderRadius = '8px';
    themeSwitcher.style.padding = '15px';
    themeSwitcher.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    themeSwitcher.style.zIndex = '100';

    document.querySelector('.user-panel').appendChild(themeSwitcher);

    const themeOptions = themeSwitcher.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.style.padding = '10px';
        option.style.borderRadius = '4px';
        option.style.cursor = 'pointer';
        option.style.marginBottom = '5px';

        option.addEventListener('mouseenter', function() {
            this.style.background = 'var(--darker-gray)';
        });

        option.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });

        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            applyTheme(theme);
            themeSwitcher.remove();
        });
    });

    // Close theme switcher when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeSwitcher(e) {
            if (!themeSwitcher.contains(e.target) && e.target !== document.querySelector('.fa-cog')) {
                themeSwitcher.remove();
                document.removeEventListener('click', closeSwitcher);
            }
        });
    }, 100);
});

// Add connection status indicator
function addConnectionStatus() {
    const statusIndicator = document.createElement('div');
    statusIndicator.classList.add('connection-status');
    statusIndicator.innerHTML = '<i class="fas fa-wifi"></i> Connected';
    statusIndicator.style.position = 'fixed';
    statusIndicator.style.bottom = '20px';
    statusIndicator.style.left = '50%';
    statusIndicator.style.transform = 'translateX(-50%)';
    statusIndicator.style.background = 'var(--success)';
    statusIndicator.style.color = 'white';
    statusIndicator.style.padding = '5px 15px';
    statusIndicator.style.borderRadius = '20px';
    statusIndicator.style.fontSize = '0.8rem';
    statusIndicator.style.zIndex = '1000';
    statusIndicator.style.display = 'none';

    document.body.appendChild(statusIndicator);

    // Simulate connection status changes
    setInterval(() => {
        if (Math.random() > 0.9) {
            statusIndicator.style.display = 'flex';
            statusIndicator.style.background = Math.random() > 0.5 ? 'var(--success)' : 'var(--warning)';
            statusIndicator.innerHTML = Math.random() > 0.5 ? 
                '<i class="fas fa-wifi"></i> Connected' : 
                '<i class="fas fa-exclamation-triangle"></i> Reconnecting...';

            setTimeout(() => {
                statusIndicator.style.display = 'none';
            }, 3000);
        }
    }, 15000);
}

addConnectionStatus();

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.fa-search').click();
    }

    // Ctrl/Cmd + Shift + U for user panel toggle
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'U') {
        e.preventDefault();
        document.querySelector('.members-panel').style.display = 
            document.querySelector('.members-panel').style.display === 'none' ? 'block' : 'none';
    }

    // Escape to close modals
    if (e.key === 'Escape') {
        if (!featureModal.classList.contains('hidden')) {
            featureModal.classList.add('hidden');
        }

        // Close any open dropdowns
        document.querySelectorAll('.emoji-picker, .search-container, .theme-switcher').forEach(el => {
            el.remove();
        });
    }
});

// Add welcome message
setTimeout(() => {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.classList.add('message');
    welcomeMessage.innerHTML = `
        <div class="user-avatar bot">AI</div>
        <div class="message-content">
            <div class="message-header">
                <span class="username">DevAssistant</span>
                <span class="timestamp">Just now</span>
                <span class="bot-tag">BOT</span>
            </div>
            <div class="message-text">
                <strong>Welcome to DevChat 2025!</strong> I'm your AI assistant. Try typing <code>/help</code> to see what I can do!
            </div>
        </div>
    `;

    chatMessages.appendChild(welcomeMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}, 3000);

// Add slash command functionality
messageInput.addEventListener('input', function() {
    if (this.value === '/') {
        const commandList = document.createElement('div');
        commandList.classList.add('command-list');
        commandList.innerHTML = `
            <div class="command-item"><strong>/help</strong> - Show available commands</div>
            <div class="command-item"><strong>/code</strong> - Share code snippet</div>
            <div class="command-item"><strong>/gif</strong> - Search for GIFs</div>
            <div class="command-item"><strong>/poll</strong> - Create a poll</div>
            <div class="command-item"><strong>/remind</strong> - Set a reminder</div>
        `;

        commandList.style.position = 'absolute';
        commandList.style.bottom = '60px';
        commandList.style.left = '20px';
        commandList.style.width = '300px';
        commandList.style.background = 'var(--dark-gray)';
        commandList.style.borderRadius = '8px';
        commandList.style.padding = '10px';
        commandList.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        commandList.style.zIndex = '100';

        document.querySelector('.message-input').appendChild(commandList);

        const commandItems = commandList.querySelectorAll('.command-item');
        commandItems.forEach(item => {
            item.style.padding = '8px';
            item.style.borderRadius = '4px';
            item.style.cursor = 'pointer';

            item.addEventListener('mouseenter', function() {
                this.style.background = 'var(--darker-gray)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.background = 'transparent';
            });

            item.addEventListener('click', function() {
                const command = this.querySelector('strong').textContent;
                messageInput.value = command + ' ';
                commandList.remove();
                messageInput.focus();
            });
        });

        // Close command list when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeCommands(e) {
                if (!commandList.contains(e.target) && e.target !== messageInput) {
                    commandList.remove();
                    document.removeEventListener('click', closeCommands);
                }
            });
        }, 100);
    }
});
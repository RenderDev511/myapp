// --- YouTube Player API Setup ---
let player;
let playerReady = false;

// 1. This function creates an <iframe> (and YouTube player) after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', // Keep hidden
        width: '0',
        videoId: 'knoQO1G0S44', // Video ID from your URL
        playerVars: {
            'playsinline': 1,
            'controls': 0, // Hide controls
            'autoplay': 0, // Start muted, play on interaction
            'mute': 1,
            'loop': 1,
            'playlist': 'knoQO1G0S44' // Required for looping
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 2. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    playerReady = true;
    // console.log("Player is ready");
    // Do not autoplay here due to browser policies
}

// 3. Handle player state changes (optional)
function onPlayerStateChange(event) {
    // Loop fix if needed
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

// 4. Load the IFrame Player API code asynchronously.
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}


// --- Play Music on User Interaction ---
let musicPlayed = false;

function attemptPlayMusic() {
    if (playerReady && !musicPlayed) {
        // console.log("Attempting to play music...");
        player.unMute(); // Unmute first
        player.playVideo();
        musicPlayed = true;
        // Remove the event listener after the first successful play attempt
        document.removeEventListener('click', attemptPlayMusic);
        document.removeEventListener('touchstart', attemptPlayMusic);
    }
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    loadYouTubeAPI();

    // Add event listeners to the whole document to capture user interaction
    document.addEventListener('click', attemptPlayMusic);
    document.addEventListener('touchstart', attemptPlayMusic);

    // Optional: Add specific interaction to the card itself
    const card = document.getElementById('developerCard');
    if (card) {
        card.addEventListener('click', attemptPlayMusic);
    }
});
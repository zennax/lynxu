const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const playlist = document.getElementById('playlist');
const playlistItems = playlist.getElementsByTagName('li');
const currentSongTitleDisplay = document.getElementById('currentSongTitle'); // Updated line

// Variable to store the currently selected playlist item
let currentPlaylistItem = null;

playPauseBtn.addEventListener('click', togglePlayPause);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);
volume.addEventListener('input', setVolume);

// Listen for the 'ended' event to go to the next song
audio.addEventListener('ended', playNextSong);

for (let i = 0; i < playlistItems.length; i++) {
    playlistItems[i].addEventListener('click', function () {
        const songSrc = this.getAttribute('data-src');

        // Remove the highlight class from the previously selected item
        if (currentPlaylistItem) {
            currentPlaylistItem.classList.remove('highlight');
        }

        // Add the highlight class to the clicked item
        this.classList.add('highlight');
        currentPlaylistItem = this;

        changeSong(songSrc);
        togglePlayPause();
        updateCurrentSongTitleDisplay();
    });
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '&#10074;&#10074;'; // Pause symbol
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '&#9658;'; // Play symbol
    }
}

function updateProgress() {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progress.value = percentage;

    // Update track duration display
    const durationDisplay = document.getElementById('duration');
    durationDisplay.innerHTML = formatTime(audio.duration);
}

function setProgress() {
    const newTime = (progress.value / 100) * audio.duration;
    audio.currentTime = newTime;
}

function setVolume() {
    audio.volume = volume.value / 100;
}

function changeSong(songSrc) {
    audio.src = songSrc;
    audio.load();
}

function playNextSong() {
    // Find the next playlist item
    let nextPlaylistItem = currentPlaylistItem.nextElementSibling;

    // If there is a next playlist item, play it
    if (nextPlaylistItem) {
        const songSrc = nextPlaylistItem.getAttribute('data-src');
        changeSong(songSrc);
        togglePlayPause();
        updateCurrentSongTitleDisplay();

        // Remove the highlight class from the previously selected item
        currentPlaylistItem.classList.remove('highlight');

        // Add the highlight class to the next item
        nextPlaylistItem.classList.add('highlight');
        currentPlaylistItem = nextPlaylistItem;
    }
}

function updateCurrentSongTitleDisplay() {
    const currentSongTitle = currentPlaylistItem.textContent;
    currentSongTitleDisplay.textContent = currentSongTitle;
}

function formatTime(seconds) {
    // Format seconds into mm:ss
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
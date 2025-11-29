const songs = [
    {
        id: 1,
        title: "Perfect",
        artist: "Ed Sheeran",
        src: "Perfect Song.mp3",
        cover: "https://m.media-amazon.com/images/I/71fqFyMSaNL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 2,
        title: "Ordinary",
        artist: "Alex Warren",
        src: "Ordinary song.mp3",
        cover: "https://i1.sndcdn.com/artworks-O1jZi2jR4hEqdsIv-6XIs6Q-t500x500.jpg"
    },
    {
        id: 3,
        title: "We Are Getting Older",
        artist: "Billie Eilish",
        src: "We are getting older.mp3",
        cover: "https://i.pinimg.com/736x/dc/1d/3b/dc1d3b0f9b98b209f34f8432ca18cafa.jpg"
    }
];


let currentSong = 0;

// Elements
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

// Load song with cover image
function loadSong(index) {
    const s = songs[index];
    audio.src = s.src;
    document.getElementById("song-title").textContent = s.title;
    document.getElementById("song-artist").textContent = s.artist;
    document.getElementById("cover").src = s.cover;

    updatePlaylistActive();
}

loadSong(currentSong);

// Play / Pause
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶️";
    }
});

// Next Song
nextBtn.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
});

// Previous Song
prevBtn.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
});

// Progress bar update
audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

// Seek audio
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Volume Control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Format Time (mm:ss)
function formatTime(sec) {
    if (isNaN(sec)) return "00:00";
    let m = Math.floor(sec / 60);
    let s = Math.floor(sec % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
}

// Build Playlist
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
        currentSong = index;
        loadSong(currentSong);
        audio.play();
    });
    playlistEl.appendChild(li);
});

// Highlight current song
function updatePlaylistActive() {
    const items = document.querySelectorAll("#playlist li");
    items.forEach((item, i) => {
        item.classList.toggle("active", i === currentSong);
    });
}

// Autoplay next song
audio.addEventListener("ended", () => {
    nextBtn.click();
});

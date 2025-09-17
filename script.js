const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const songs = [
  {
    title: "Lost in Japan",
    artist: "Shawn Mendes",
    src: "assets/track1.mp3",
    cover: "assets/cover1.jpg"
  },
  {
    title: "Dreaming",
    artist: "Lo-fi Beats",
    src: "assets/track2.mp3",
    cover: "assets/cover2.jpg"
  },
  {
    title: "Ocean Drive",
    artist: "Duke Dumont",
    src: "assets/track3.mp3",
    cover: "assets/cover3.jpg"
  }
];

let songIndex = 0;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = "❚❚";
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = "▶️";
}

playBtn.addEventListener("click", () => {
  const isPlaying = !audio.paused;
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  durationEl.textContent = formatTime(duration);
  currentTimeEl.textContent = formatTime(currentTime);
});

progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

loadSong(songs[songIndex]);

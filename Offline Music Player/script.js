const playAudio = document.querySelector("#play-audio");
const selectBtn = document.querySelector(".select-btn");
const songUpload = document.querySelector(".song-upload");
const playlist = document.querySelector(".playlist");
const albumArt = document.querySelector(".album-art");
const songName = document.querySelector(".song-name");
const currentDuration = document.querySelector(".current-duration");
const totalDuration = document.querySelector(".total-duration");
const playBtn = document.querySelector(".play-btn");
const playBtnImg = document.querySelector(".play-btn img");
const previousBtn = document.querySelector(".previous-btn");
const nextBtn = document.querySelector(".next-btn");
const progressBar = document.querySelector(".progress-bar");
const searchWrapper = document.querySelector(".search-wrapper");
const searchBar = document.querySelector(".search-bar");

const songsArr = new Array();

// select folder and save to array
selectBtn.addEventListener("click", () => {
  songUpload.click();

  songUpload.addEventListener("change", (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      if (
        event.target.files[i].type === "audio/mpeg" ||
        event.target.files[i].name.includes(".mp3")
      ) {
        songsArr.push(event.target.files[i]);
      }
    }
    renderPlaylist();

    searchWrapper.style.display = "flex";
    playlist.style.display = "block";
  });
});

// render/append all Songs to playlist
function renderPlaylist() {
  if (songsArr.length === 0) {
    alert("select song or folder");
    return;
  }
  for (let i = 0; i < songsArr.length; i++) {
    const li = document.createElement("li");
    li.innerText = songsArr[i].name;
    li.setAttribute("data-index", i);
    playlist.appendChild(li);
  }
  checkResume();
}

let currentIdx;
// playlist
function playlistPlay(e) {
  currentIdx = parseInt(e.target.getAttribute("data-index"));

  loadSong(currentIdx);
  playAudio.play();
  playBtnImg.setAttribute("src", "/icons/pause_circle_btn.svg");
  albumArt.style.animationPlayState = "running";
}
playlist.addEventListener("click", playlistPlay);

// set URL and song name
function loadSong(idx) {
  for (let i = 0; i < songsArr.length; i++) {
    if (idx === i) {
      const url = URL.createObjectURL(songsArr[i]);
      playAudio.setAttribute("src", url);

      songName.innerText = songsArr[i].name;
    }
  }
}

// previous and next btn
function nextPreviousPlay(e) {
  let className = e.target.parentElement.classList.value;
  if (playAudio.getAttribute("src") === "") {
    alert("select song or folder");
  } else if (isRepeat) {
    currentIdx = currentIdx;
  } else if (isShuffle) {
    currentIdx = Math.floor(Math.random() * songsArr.length);
  } else if (className === "next-btn") {
    currentIdx++;
    if (currentIdx > songsArr.length - 1) {
      currentIdx = 0;
    }
  } else if (className === "previous-btn") {
    currentIdx--;
    if (currentIdx < 0) {
      currentIdx = songsArr.length - 1;
    }
  }

  const url = URL.createObjectURL(songsArr[currentIdx]);
  playAudio.setAttribute("src", url);
  songName.innerText = songsArr[currentIdx].name;
  playAudio.play();
  playBtnImg.setAttribute("src", "/icons/pause_circle_btn.svg");
}
nextBtn.addEventListener("click", nextPreviousPlay);
previousBtn.addEventListener("click", nextPreviousPlay);

// play and Pause

function playPause() {
  if (playAudio.getAttribute("src") === "") {
    alert("select song or folder");
  } else if (playAudio.paused) {
    playAudio.play();
    playBtnImg.setAttribute("src", "/icons/pause_circle_btn.svg");
    albumArt.style.animationPlayState = "running";
  } else {
    playAudio.pause();
    playBtnImg.setAttribute("src", "/icons/play_circle_btn.svg");
    albumArt.style.animationPlayState = "paused";
  }
}

playBtn.addEventListener("click", playPause);

// time format
function timeFormat(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds;
}

// save to local current playing song, time
function saveProgress() {
  localStorage.setItem("lastSongIndex", currentIdx);
  localStorage.setItem("lastSongTime", playAudio.currentTime);
}

function checkResume() {
  let savedIndex = localStorage.getItem("lastSongIndex");
  let savedTime = localStorage.getItem("lastSongTime");

  if (savedIndex !== null && songsArr.length > 0) {
    currentIdx = parseInt(savedIndex);
  }

  loadSong(currentIdx);

  playAudio.addEventListener(
    "loadedmetadata",
    () => {
      if (savedTime) {
        playAudio.currentTime = parseFloat(savedTime);
      }
    },
    { once: true },
  );
}

// progressBar
playAudio.addEventListener("loadedmetadata", (e) => {
  progressBar.max = e.target.duration;
});

let isDragging = false;
playAudio.addEventListener("timeupdate", (e) => {
  if (!isDragging) {
    progressBar.value = e.target.currentTime;
  }
  currentDuration.innerHTML = timeFormat(e.target.currentTime);
  totalDuration.innerHTML = timeFormat(e.target.duration);

  saveProgress();
});

progressBar.addEventListener("change", (e) => {
  playAudio.currentTime = progressBar.value;
  isDragging = false;
});

progressBar.addEventListener("mousedown", (e) => {
  isDragging = true;
});

// play auto next
playAudio.addEventListener("ended", () => {
  if (currentIdx > songsArr.length - 1) {
    currentIdx = 0;
  }
  if (isRepeat) {
    currentIdx = currentIdx;
  } else {
    currentIdx++;
  }
  if (isShuffle) {
    currentIdx = Math.floor(Math.random() * songsArr.length);
  }
  const url = URL.createObjectURL(songsArr[currentIdx]);
  playAudio.setAttribute("src", url);
  songName.innerText = songsArr[currentIdx].name;
  playAudio.play();
});

// volume control
const volumeSlider = document.querySelector(".volume-slider");

volumeSlider.addEventListener("change", () => {
  playAudio.volume = volumeSlider.value;
});

// search Bar
searchBar.addEventListener("input", (e) => {
  let filter = e.target.value.toLowerCase();
  playlist.innerHTML = "";

  songsArr.forEach((item, id) => {
    const text = item.name.toLowerCase();

    if (text.includes(filter)) {
      const li = document.createElement("li");
      li.innerText = text;
      li.setAttribute("data-index", id);
      playlist.appendChild(li);
    }
  });
});

// repeat button
const repeatBtn = document.querySelector(".repeat-btn");

let isRepeat = false;
repeatBtn.addEventListener("click", (e) => {
  if (playAudio.getAttribute("src") === "") {
    alert("select song or folder");
  } else if (isRepeat) {
    isRepeat = false;
    e.target.setAttribute("src", "/icons/repeat_off.svg");
  } else {
    isRepeat = true;
    e.target.setAttribute("src", "/icons/repeat_on.svg");
  }
});

// shuffle
const shuffleBtn = document.querySelector(".shuffle-btn");

let isShuffle = false;

shuffleBtn.addEventListener("click", (e) => {
  if (playAudio.getAttribute("src") === "") {
    alert("select song or folder");
  } else if (isShuffle) {
    isShuffle = false;
    e.target.setAttribute("src", "/icons/shuffle_off.svg");
  } else {
    isShuffle = true;
    e.target.setAttribute("src", "/icons/shuffle_on.svg");
  }
});

// toggle
const toggleBtn = document.querySelector(".toggle-btn");
const playlistContainer = document.querySelector(".playlist-container");

toggleBtn.addEventListener("click", () => {
  if (playAudio.getAttribute("src") === "") {
    alert("select song or folder");
  } else {
    playlistContainer.classList.toggle("active");
  }
});

# 🎵 Offline Music Player

A lightweight, web-based offline music player built using **HTML, CSS, and Vanilla JavaScript**. This application allows users to play local MP3 files by selecting a folder from their device. It features a modern UI, responsive design, and essential playback controls.

## 🚀 Live Demo
[https://offline-music-player-online.netlify.app/](#) 

## ✨ Features

- **Folder Selection:** Load multiple songs at once by selecting a local folder (uses `webkitdirectory`).
- **Playback Controls:** Play, Pause, Next, Previous, and Seek functionality.
- **Auto-Next:** Automatically plays the next song when the current one ends.
- **Search Functionality:** Search through the playlist with **text highlighting** for matched terms.
- **Smart Resume:** Remembers the last played song and timestamp using `localStorage` (resumes on page reload after folder re-selection).
- **Responsive Design:** Fully optimized for Desktop, Tablet, and Mobile screens.
- **Animations:** Rotating album art animation when music is playing.
- **Shuffle mode:** Automatically plays the Random Song

## 🛠️ Tech Stack

- **HTML5:** For structure and semantic markup.
- **CSS3:** For styling, flexbox/grid layout, and animations.
- **JavaScript (ES6):** For DOM manipulation, Audio API logic, and event handling.

## ⚙️ How to Run

1.  **Clone or Download** this repository.
2.  Open the project folder.
3.  Double-click `index.html` to open it in your web browser.
    * *Note: For the best experience, use Google Chrome, Edge, or Brave browsers.*
4.  Click on the **"Select Music Folder"** button.
5.  Choose a folder on your computer that contains `.mp3` files.
6.  Click "Upload" (or "View files") when prompted by the browser.
7.  Enjoy your music! 🎧

## 🧠 Logic Highlights (How it works)

* **Audio Handling:** Uses the HTML5 `Audio()` object to manage playback state.
* **File Handling:** Filters user-selected files to ensure only audio files are loaded into the playlist.
* **Search Logic:** Uses `RegExp` to filter the list and wraps matched text in a `<span>` with a highlight class.
* **Visuals:** Extracts the folder name from `webkitRelativePath` to display the Album/Movie name.

## 📸 Screenshots

Music Player Desktop View
<img width="633" height="913" alt="Screenshot 2026-02-02 204547" src="https://github.com/user-attachments/assets/0dc1095e-8388-47a3-a0e9-ac19a2617f7d" />
<img width="1583" height="855" alt="Screenshot 2026-02-02 204621" src="https://github.com/user-attachments/assets/02496641-4d58-4284-ab48-6d1f210c952c" />


Mobile View

<img width="622" height="869" alt="Screenshot 2026-02-02 204701" src="https://github.com/user-attachments/assets/3bd4bee6-97a6-42ff-a78f-c9a12f9c9297" />
<img width="604" height="862" alt="Screenshot 2026-02-02 204738" src="https://github.com/user-attachments/assets/6c49ffaa-fcce-41de-9f11-89c0b1be4a94" />


## 🤝 Contributing

Feel free to fork this project and add new features like:
- Keyboard Controls
- Equalizer.
- Custom playlists.

---

*Made with ❤️ and JavaScript.*

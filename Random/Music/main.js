const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const selector = document.getElementById('songSelector');
const title = document.getElementById('title');

let playlist = [];
let index = 0;

// Formatear tiempo mm:ss
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// Cargar lista desde el selector
selector.addEventListener('change', () => {
    if (selector.value !== "") {
        playlist = Array.from(selector.options)
                        .filter(opt => opt.value !== "")
                        .map(opt => opt.value);

        index = playlist.indexOf(selector.value);
        loadSong();
        audio.play();
        updatePlayIcon();
    }
});

function loadSong() {
    audio.src = playlist[index];
    title.textContent = playlist[index].split("/").pop();

    // 🔥 ACTUALIZAR EL SELECTOR
    selector.value = playlist[index];
}

// Cambiar icono Play/Pause
function updatePlayIcon() {
    playBtn.innerHTML = audio.paused
        ? '<i class="fa-solid fa-play"></i>'
        : '<i class="fa-solid fa-pause"></i>';
}

// Botón Play/Pause
playBtn.addEventListener('click', () => {
    audio.paused ? audio.play() : audio.pause();
    updatePlayIcon();
});

// Actualizar barra de progreso y tiempos
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;

        document.getElementById('current').textContent = formatTime(audio.currentTime);
        document.getElementById('duration').textContent = formatTime(audio.duration);
    }
});

// Cambiar tiempo desde la barra
progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Botón Next
document.getElementById('next').addEventListener('click', () => {
    index = (index + 1) % playlist.length;
    loadSong();
    audio.play();
    updatePlayIcon();
});

// Botón Prev
document.getElementById('prev').addEventListener('click', () => {
    index = (index - 1 + playlist.length) % playlist.length;
    loadSong();
    audio.play();
    updatePlayIcon();
});

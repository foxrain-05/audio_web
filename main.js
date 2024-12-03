const elements = {
    slider: document.querySelector(".seek-bar"),
    audio: document.querySelector("audio"),
    playButton: document.querySelector(".play"),
    pauseButton: document.querySelector(".pause"),
    currentTime: document.querySelector(".current-time"),
    duration: document.querySelector(".duration"),
};

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const togglePlay = (isPlaying) => {
    elements.playButton.classList.toggle("hidden", isPlaying);
    elements.pauseButton.classList.toggle("hidden", !isPlaying);

    if (isPlaying) {
        elements.audio.play();
    } else {
        elements.audio.pause();
    }
};

const updateProgress = () => {
    const { audio, slider, currentTime, duration } = elements;
    const progress = (audio.currentTime / audio.duration) * 100;

    slider.style.setProperty("--progress", `${progress}%`);
    slider.value = progress;
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);

    requestAnimationFrame(updateProgress);
};

// 이벤트 리스너 설정
const initializeEventListeners = () => {
    const { playButton, pauseButton, audio, slider } = elements;

    playButton.addEventListener("click", () => togglePlay(true));
    pauseButton.addEventListener("click", () => togglePlay(false));

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => {
        updateProgress();
        elements.duration.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("ended", () => {
        slider.style.setProperty("--progress", "0%");
        slider.value = 0;
        audio.currentTime = 0;
        togglePlay(false);
    });

    slider.addEventListener("input", (e) => {
        const value = e.target.value;
        slider.style.setProperty("--progress", `${value}%`);
        audio.currentTime = (audio.duration / 100) * value;
    });
};

initializeEventListeners();

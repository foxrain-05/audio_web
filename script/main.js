let currentlyPlaying = null;

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const togglePlay = (audioPlayer, isPlaying) => {
    const elements = {
        audio: audioPlayer.querySelector("audio"),
        playButton: audioPlayer.querySelector(".play"),
        pauseButton: audioPlayer.querySelector(".pause"),
        slider: audioPlayer.querySelector(".seek-bar"),
        currentTime: audioPlayer.querySelector(".current-time"),
        duration: audioPlayer.querySelector(".duration"),
    };
    
    if (isPlaying && currentlyPlaying && currentlyPlaying !== elements.audio) {
        const prevPlayer = currentlyPlaying.closest('.audio-player');
        togglePlay(prevPlayer, false);
    }

    elements.playButton.classList.toggle("hidden", isPlaying);
    elements.pauseButton.classList.toggle("hidden", !isPlaying);

    if (isPlaying) {
        elements.audio.play();
        currentlyPlaying = elements.audio;
    } else {
        elements.audio.pause();
        if (currentlyPlaying === elements.audio) {
            currentlyPlaying = null;
        }
    }
};

const updateProgress = (audioPlayer) => {
    const elements = {
        audio: audioPlayer.querySelector("audio"),
        slider: audioPlayer.querySelector(".seek-bar"),
        currentTime: audioPlayer.querySelector(".current-time"),
        duration: audioPlayer.querySelector(".duration"),
    };

    const progress = (elements.audio.currentTime / elements.audio.duration) * 100;

    elements.slider.style.setProperty("--progress", `${progress}%`);
    elements.slider.value = progress;
    elements.currentTime.textContent = formatTime(elements.audio.currentTime);
    elements.duration.textContent = formatTime(elements.audio.duration);

    requestAnimationFrame(() => updateProgress(audioPlayer));
};

const initializeAudioPlayer = (audioPlayer) => {
    const elements = {
        audio: audioPlayer.querySelector("audio"),
        playButton: audioPlayer.querySelector(".play"),
        pauseButton: audioPlayer.querySelector(".pause"),
        slider: audioPlayer.querySelector(".seek-bar"),
    };

    elements.playButton.addEventListener("click", () => togglePlay(audioPlayer, true));
    elements.pauseButton.addEventListener("click", () => togglePlay(audioPlayer, false));

    elements.audio.addEventListener("loadedmetadata", () => {
        updateProgress(audioPlayer);
    });

    elements.audio.addEventListener("ended", () => {
        elements.slider.style.setProperty("--progress", "0%");
        elements.slider.value = 0;
        elements.audio.currentTime = 0;
        togglePlay(audioPlayer, false);
    });

    elements.slider.addEventListener("input", (e) => {
        const value = e.target.value;
        elements.slider.style.setProperty("--progress", `${value}%`);
        elements.audio.currentTime = (elements.audio.duration / 100) * value;
    });
};

// 모든 오디오 플레이어 초기화
document.querySelectorAll('.audio-player').forEach(player => {
    updateProgress(player);
    initializeAudioPlayer(player);
});

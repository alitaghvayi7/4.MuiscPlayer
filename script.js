const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
    },
];

let indexMusic = 0;
let activeMusic = songs[0];
let isPlaying = false;
const globalMusic = document.querySelector('.music')
const globalImage = document.querySelector('.music-image-container>img');
const playPauseButton = document.querySelector('.play-pause-button');
const playPauseIcon = document.querySelector('.play-pause-button>i');
const progressBar = document.querySelector('.progress-bar');
const musicCurrentTime = document.querySelector('.music-current-time')
const musicDuration = document.querySelector('.music-duration-time');
const musicName = document.querySelector('.music-name');
const musicSinger = document.querySelector('.music-singer');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const progressContainer = document.querySelector('.progress-container');

playPauseButton.addEventListener('click', () => isPlaying ? pauseMusic() : playMusic());
prevButton.addEventListener('click', prevMusic);
nextButton.addEventListener('click', nextMusic);
progressContainer.addEventListener('click', clickProgress);
globalMusic.addEventListener('timeupdate', updateMusic);
globalMusic.addEventListener('ended', pauseMusic);

function playMusic() {
    isPlaying = true;
    playPauseIcon.classList.replace('fa-play', 'fa-pause');
    globalMusic.play();
}

function pauseMusic() {
    isPlaying = false;
    playPauseIcon.classList.replace('fa-pause', 'fa-play');
    globalMusic.pause();
}

function updateDom(currentMusic) {
    globalMusic.setAttribute('src', `music/${currentMusic.name}.mp3`);
    globalImage.setAttribute('src', `img/${currentMusic.name}.jpg`);
    musicName.textContent = currentMusic.displayName;
    musicSinger.textContent = currentMusic.artist;
}


function updateMusic() {
    if (isPlaying) {

        const durationMinute = Math.floor(globalMusic.duration / 60);
        let durationSecond = Math.floor(globalMusic.duration % 60);

        if (durationSecond < 10) {
            durationSecond = `0${durationSecond}`
        }

        musicDuration.textContent = `${durationMinute}:${durationSecond}`;

        const percentage = (globalMusic.currentTime / globalMusic.duration) * 100;

        progressBar.style.width = `${percentage}%`;

        const currentMinute = Math.floor(globalMusic.currentTime / 60);
        let currentSecond = Math.floor(globalMusic.currentTime % 60);

        if (currentSecond < 10) {
            currentSecond = `0${currentSecond}`;
        }

        musicCurrentTime.textContent = `${currentMinute}:${currentSecond}`;

    }
}


function nextMusic() {
    if (isPlaying) {
        pauseMusic();
    }
    indexMusic = indexMusic + 1 > songs.length - 1 ? 0 : indexMusic + 1;
    activeMusic = songs[indexMusic];
    updateDom(activeMusic);
    playMusic();
}

function prevMusic() {
    if (isPlaying) {
        pauseMusic();
    }
    indexMusic = indexMusic - 1 < 0 ? songs.length - 1 : indexMusic - 1;
    activeMusic = songs[indexMusic];
    updateDom(activeMusic);
    playMusic();
}

function clickProgress(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const { duration } = globalMusic;

    globalMusic.currentTime = clickX / width * duration;
}
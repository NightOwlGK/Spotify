
let songList = document.getElementById('song-list').children;

let audioPlayer = document.getElementById('audio-player');

let audioSource = document.getElementById('audio-player-source');

let songArray = ["./assets/songs/1.mp3", "./assets/songs/2.mp3", "./assets/songs/3.mp3", "./assets/songs/4.mp3", "./assets/songs/5.mp3", "./assets/songs/6.mp3", "./assets/songs/7.mp3", "./assets/songs/8.mp3", "./assets/songs/9.mp3", "./assets/songs/10.mp3"]

let songTime = document.getElementById('song-time');

let musicProgressBar = document.getElementById('music-progress-bar');

let playButton = document.getElementById('play-button');
let playButtonDiv = document.getElementById('play-button-div');

let pauseButton = document.getElementById('pause-button');
let pauseButtonDiv = document.getElementById('pause-button-div');

let backwardButton = document.getElementById('backward-button');

let forwardButton = document.getElementById('forward-button');



let currentSongIndex = 0;

audioPlayer.addEventListener('loadedmetadata', function () {
    musicProgressBar.max = audioPlayer.duration;
});


audioPlayer.addEventListener('timeupdate', function () {

    const time = audioPlayer.currentTime;
    musicProgressBar.value = time;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    songTime.textContent = `${minutes} : ${seconds.toString().padStart(2, '0')}`;
});

audioPlayer.addEventListener('ended', function () {
    currentSongIndex += 1;
    if (currentSongIndex > songArray.length - 1) {
        currentSongIndex = 0;
    }
    audioSource.src = songArray[currentSongIndex];
    audioPlayer.load();
    audioPlayer.play();
});


musicProgressBar.addEventListener('input', function () {
    audioPlayer.currentTime = musicProgressBar.value;
})


for (let i = 0; i < songList.length; i++) {
    songList[i].addEventListener('click', function () {
        audioSource.src = songArray[i];
        audioPlayer.load();
        audioPlayer.play();
        playButtonDiv.classList.add('hidden');
        pauseButtonDiv.classList.remove('hidden');
        currentSongIndex = i;
    });
}


playButton.addEventListener('click', function () {
    console.log("play")
    audioPlayer.play();
    playButtonDiv.classList.add('hidden');
    pauseButtonDiv.classList.remove('hidden');
});


pauseButton.addEventListener('click', function () {
    console.log("Pause")
    audioPlayer.pause();
    playButtonDiv.classList.remove('hidden');
    pauseButtonDiv.classList.add('hidden');
});

backwardButton.addEventListener('click', function () {
    if(audioPlayer.currentTime <= 5){
        currentSongIndex -= 1;
        if(currentSongIndex < 0){
            currentSongIndex = songArray.length - 1;
        }
        audioSource.src = songArray[currentSongIndex];
        audioPlayer.load();
        audioPlayer.play();
    }else{
    audioPlayer.currentTime = 0;
    }
});

forwardButton.addEventListener('click', function () {
    currentSongIndex += 1;
    if (currentSongIndex > songArray.length - 1) {
        currentSongIndex = 0;
    }
    audioSource.src = songArray[currentSongIndex];
    audioPlayer.load();
    audioPlayer.play();
})



const albArt = document.querySelector("#albumArt")
const songName = document.querySelector("#songName")
const songArtist = document.querySelector("#songArtist")
//
const seekBar = document.querySelector("#seekBar")
const currTime = document.querySelector("#currentTime")
const totalTime = document.querySelector("#totalTime")
//
const play = document.querySelector("#playBtn")
const prev = document.querySelector("#prevBtn")
const next = document.querySelector("#fwdBtn")
const rep = document.querySelector("#repBtn")
const shuffle = document.querySelector("#shufBtn")
//
const volIcon = document.querySelector("#volIcon")
const volBar = document.querySelector("#volBar")
const hamburger = document.querySelector("#hamburger")
//
const playlistView = document.querySelector(".playlist")
const songTile = document.querySelector(".songTile")
// albumPage vars
const albPlayBtn = document.getElementById("albPlay");
//control variables
let timer;
let indexSong = 0;
let isPlaying = false;
let song = document.createElement("audio");
let albAutoPlayState = 0;
let volState = 1;

//setting initial volume = 100
song.volume = 1;
volBar.value = 100;

// Event Listeners
play.addEventListener("click", togglePlay);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
// albPlayBtn.addEventListener("click", autoPlayFunc);
volIcon.addEventListener("click", muteToggle);
volBar.addEventListener("change", changeVolume);
seekBar.addEventListener("change", changeCurrTime);

// Load Songs
function loadSong(indexSong) {
    songName.innerHTML = musicList[indexSong].name;
    song.src = musicList[indexSong].audioPath;
    albArt.src = musicList[indexSong].albumArt;
    songArtist.innerHTML = musicList[indexSong].artist;
    song.load();
}

loadSong(indexSong);

// Play with toggle

function togglePlay() {
    if(!isPlaying) {
        song.play();
        isPlaying = true;
        play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    else{
        song.pause();
        isPlaying = false;
        play.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

//Play without toggle

function noTogglePlay() {
    if(isPlaying) {
        song.play();
        play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    else{
        song.pause();
        play.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

// Next Song
function nextSong() {
    if(indexSong < musicList.length) {
        indexSong = (indexSong+1)%musicList.length
    }
    loadSong(indexSong);
    noTogglePlay();
}

// Prev Song
function prevSong() {
    if(indexSong > 0) {
        indexSong = indexSong-1
    }
    else{
        indexSong = musicList.length-1
    }
    loadSong(indexSong);
    noTogglePlay();
}

// Album AutoPlay all functionality
// function autoPlayFunc() {
//     if(albAutoPlayState == 0) {
//          albAutoPlayState = 1;
//          albPlayBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';

//     }
//     else{
//         albAutoPlayState = 0;
//         albPlayBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
        

//     }
    
// }

// Mute Toggle
function muteToggle() {
    if(volState == 1) {
        volState = 0;
        song.volume = 0;
        volBar.value = 0;
        volIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
    else{
        volState = 1;
        song.volume = 1;
        volBar.value = 100;
        volIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }
}

// change Volume
function changeVolume() {
    song.volume = (volBar.value) / 100;
    if(volBar.value == 0) {
        volIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
    else{
        volIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }
}

// change current time
function changeCurrTime() {
    let seekBarPosition = song.duration * (seekBar.value / 100);
    song.currentTime = seekBarPosition;
}
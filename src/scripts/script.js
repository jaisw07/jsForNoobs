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
//control variables
let timer;
let indexSong = 0;
let isPlaying = false;
let song = document.createElement("audio");

// Event Listeners
play.addEventListener("click", togglePlay);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

// Load Songs
function loadSong(indexSong) {
    songName.innerHTML = musicList[indexSong].name;
    song.src = musicList[indexSong].audioPath;
    albArt.src = musicList[indexSong].albumArt;
    songArtist.innerHTML = musicList[indexSong].artist;
    song.load();
}

loadSong(indexSong);

// Play Song

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
        isPlaying = true;
        play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    else{
        song.pause();
        isPlaying = false;
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
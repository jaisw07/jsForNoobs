document.addEventListener("DOMContentLoaded", () => {
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
    // const autoPlayToggle = document.querySelector("#autoPlayToggle")
    const shuffleBtn = document.querySelector("#shuffleBtn")
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
    // let albAutoPlayState = 0;
    // let autoPlayToggleState = 0;
    let volState = 1;
    let shuffleState = 0;

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
    seekBar.addEventListener("change", seekSong);
    // autoPlayToggle.addEventListener("click", toggleAutoPlayFunc);
    song.addEventListener("timeupdate", currentTimeUpdate)
    shuffleBtn.addEventListener("click", shuffleSongs)

    // Load Songs
    function loadSong(indexSong) {
        clearInterval(timer);
        resetSeekBar();
        songName.innerHTML = musicList[indexSong].name;
        song.src = musicList[indexSong].audioPath;
        albArt.src = musicList[indexSong].albumArt;
        songArtist.innerHTML = musicList[indexSong].artist;
        song.load();
        timer = setInterval(updateSeekBar, 16);
    }

    loadSong(indexSong);

    // Play with toggle

    function togglePlay() {
        if (!isPlaying) {
            song.play();
            isPlaying = true;
            play.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
        else {
            song.pause();
            isPlaying = false;
            play.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    }

    //Play without toggle

    function noTogglePlay() {
        if (isPlaying) {
            song.play();
            play.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
        else {
            song.pause();
            play.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    }

    // Next Song
    function nextSong() {
        if (indexSong < musicList.length) {
            if (shuffleState == 0) {
                indexSong = (indexSong + 1) % musicList.length
            }
            else {
                indexSong = getRandomInt(0, musicList.length - 1);
            }
        }
        loadSong(indexSong);
        noTogglePlay();
    }

    // Prev Song
    function prevSong() {
        if (indexSong > 0) {
            indexSong = indexSong - 1
        }
        else {
            indexSong = musicList.length - 1
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

    // autoPlayToggle
    // function toggleAutoPlayFunc() {
    //     if(autoPlayToggleState == 0) {
    //         autoPlayToggleState = 1;
    //         autoPlayToggle.innerHTML = '<i class="fa-solid fa-toggle-on"></i>';
    //     }
    //     else {
    //         autoPlayToggleState = 0;
    //         autoPlayToggle.innerHTML = '<i class="fa-solid fa-toggle-off"></i>';
    //     }
    // }


    // Mute Toggle
    function muteToggle() {
        if (volState == 1) {
            volState = 0;
            song.volume = 0;
            volBar.value = 0;
            volIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
        else {
            volState = 1;
            song.volume = 1;
            volBar.value = 100;
            volIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
    }

    // change Volume
    function changeVolume() {
        song.volume = (volBar.value) / 100;
        if (volBar.value == 0) {
            volIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
        else {
            volIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
    }

    // seekSong
    function seekSong() {
        let seekBarPosition = song.duration * (seekBar.value / 100);
        song.currentTime = seekBarPosition;
    }

    // updateSeekBar
    function resetSeekBar() {
        seekBar.value = 0;
    }
    function updateSeekBar() {
        let position = 0;
        if (!isNaN(song.duration)) {
            position = song.currentTime * (100 / song.duration);
            seekBar.value = position;
        }
        if (song.ended) {
            // if(autoPlayToggleState == 1) {
            //     nextSong();
            // }
            // else {
            //     play.innerHTML = '<i class="fa-solid fa-play"></i>';
            // }
            nextSong();
        }
    }

    //
    function currentTimeUpdate() {
        let currMins = Math.floor(song.currentTime / 60);
        let currSecs = Math.floor(song.currentTime) - (currMins * 60);
        let totalMins = Math.floor(song.duration / 60);
        let totalSecs = Math.floor(song.duration) - (totalMins * 60);
        // currTime.innerHTML = currMins+":"+String.format("%02d", currSecs);
        // totalTime.innerHTML = totalMins+":"+String.format("%02d", totalSecs);
        // Format seconds to always show two digits
        currSecs = String(currSecs).padStart(2, '0');
        totalSecs = String(totalSecs).padStart(2, '0');

        currTime.innerHTML = currMins + ":" + currSecs;
        totalTime.innerHTML = totalMins + ":" + totalSecs;
    }

    //random number gen for shuffle
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //shuffle functionality
    function shuffleSongs() {
        if (shuffleState == 0) {
            shuffleState = 1;
            shuffleBtn.innerHTML = '<i class="fa-solid fa-shuffle" style = "color: #32CD32"></i>'
        }
        else {
            shuffleState = 0;
            shuffleBtn.innerHTML = '<i class="fa-solid fa-shuffle"></i>'
        }
    }
});
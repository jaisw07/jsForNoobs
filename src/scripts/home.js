const songPanel = document.querySelector(".song-list");

// Playing song from library
function playHome() {
    songPanel.addEventListener("click", (e) => {
        // Use closest to find the nearest ancestor with the class 'song-row-item'
        const songTile = e.target.closest(".song-row-item");
        if (songTile) {
            // Get the song title from the clicked song tile
            const songTitle = songTile.querySelector(".song-title").innerHTML.trim(); // Trim whitespace

            // Find the index of the song in the musicList
            const songIndex = musicList.findIndex(song => song.name === songTitle);
            console.log("Clicked Song Title:", songTitle); // Debugging log
            console.log("Found Song Index:", songIndex); // Debugging log

            if (songIndex !== -1) {
                loadSong(songIndex); // Load the song
                noTogglePlay(); // Play the song without toggling
            } else {
                console.error("Song not found in musicList");
            }
        }
    });
}

playHome();
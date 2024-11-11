document.addEventListener("DOMContentLoaded", () => {
    toggleLike('.likebtn');
    loadLikedSongs();
    
    function toggleLike(likeBtnSelector) {
        const likeBtns = document.querySelectorAll(likeBtnSelector);

        likeBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const checkbox = btn.previousElementSibling;
                const isLiked = !checkbox.checked;
                checkbox.checked = isLiked;
                btn.classList.toggle("liked", isLiked);
                
                storeLikedSongs();
            });
        });
    }
    

    function storeLikedSongs() {
        const likedSongs = [];
        document.querySelectorAll('.songTile').forEach(songTile => {
            
            const btn = songTile.querySelector('.likebtn');
            
            if (btn.classList.contains('liked')) {
                const songId = songTile.getAttribute('data-song-id');
                const songName = songTile.querySelector('.songName p').textContent;
                const songDuration = songTile.querySelector('.duration p').textContent;
                const songData = {
                    id: songId,
                    name: songName,
                    duration: songDuration
                };
                likedSongs.push(songData);
            }
        });
        localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    }
    
    function loadLikedSongs() {
        const likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
        const songList = document.querySelector('.song-list'); // Select the song list container
        songList.innerHTML = '';

        likedSongs.forEach(song => {
            const songItem = document.createElement('div');
            songItem.classList.add('song-item');
            songItem.setAttribute('data-song-id', song.id); // Set the song ID
            songItem.innerHTML = `
            <span class="song-number">${song.id}</span>
            <span class="song-title">${song.name}</span>
            <span class="song-duration">${song.duration}</span>
            <div class="like-button">
            <input type="checkbox" id="like-check" style="display: none;" checked>
            <i class="fas fa-heart likebtn liked" style="font-size: larger;"></i>
            </div>
            `;
            songList.appendChild(songItem);
        });
        
        toggleLike('.likebtn');
    }
    
});
//Liked Songs
const toggleLike = (likeBtnSelector, checkboxSelector) => {
    const likeBtn = document.querySelectorAll(likeBtnSelector);
    const checkbox = document.querySelectorAll(checkboxSelector);
    console.log("CALL")

    likeBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const isLiked = !checkbox[0].checked;
            checkbox[0].checked = isLiked;
            btn.classList.toggle("liked", isLiked);
            console.log("Okay")
        });
    });
};

toggleLike('.likebtn', '.checkbox');


function storeLikedSongs() {
    const likedSongs = [];
    document.querySelectorAll('.song-item.liked').forEach(song => {
        likedSongs.push(song.getAttribute('data-song-id'));
    });
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
}
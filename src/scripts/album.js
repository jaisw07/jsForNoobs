//display songs
async function displaySongsInLibrary(list) {
    for (let i = 0; i < list.length; i++) {
        await new Promise((resolve) => {
            let tempSong = new Audio(); // Create a new audio element for each song
            tempSong.src = list[i].audioPath; 
            tempSong.load();

            // Set up the onloadedmetadata event
            tempSong.onloadedmetadata = function() {
                // Calculating duration
                let totalMins = Math.floor(tempSong.duration / 60);
                let totalSecs = Math.floor(tempSong.duration) - (totalMins * 60);
                totalSecs = String(totalSecs).padStart(2, '0');

                console.log(`${totalMins}:${totalSecs}`);

                let div = document.createElement("div");
                div.classList.add("songTile");
                div.innerHTML = 
                `
                    <div class="leftTile">
                        <div class="index">
                            <p class="paraWithIndex">${i + 1}</p>
                        </div>
                        <div class="songName">
                            <p class="paraWithName">${list[i].name}</p>
                        </div>
                    </div>
                    <div class="rightTile">
                        <div class="duration">
                            <p>${totalMins}:${totalSecs}</p>
                        </div>
                        <div class="heartIcon">
                            <button class="heart"><i class="fa-regular fa-heart"></i></button>
                        </div>
                    </div>
                `;
                songPanel.appendChild(div);
                resolve(); // Resolve the promise when the song tile is created
            };
        });
    }

    console.log("All songs have been loaded and displayed.");
}

// Call the function with your music list
displaySongsInLibrary(VeerZaara);


//playing song from library
function playFromLibrary() {
    songPanel.addEventListener("click", (e)=>{
        if(e.target.classList.contains("songTile")) {
            // alert(e.target.innerHTML);
            songIndex = (e.target.querySelector(".paraWithIndex").innerHTML) - 1;
            console.log(songIndex)
            loadSong(songIndex);
            noTogglePlay();
        }
    })
}

playFromLibrary();
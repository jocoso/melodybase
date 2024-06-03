async function displaySongInfo(songName, artistName) {
    try {
        const auth = "db1815126935bc7fef98a221fafbf0fe";
        const track = await getTrack(songName, artistName, auth);
        
        const albumImg = $('#album-img');

        console.log(track);

        // const album = await getAlbum()

        if (track) {
            $('#songname').text(`Song Name: ${track.track_name}`); //Adding information to HTML
            $('#artistname').text(`Artist Name: ${track.artist_name}`);
            $('#albumname').text(`Album Name: ${track.album_name}`);
            
            let albums = await getAlbum(track.artist_id, 1, auth);
            await snitcher("ALBUMS CONTENT", albums);
            if(albums) {
                // await snitcher("IS ALBUMS UNDEFINED?", albums);
                await snitcher("WHAT IS IN ALBUMS?", albums);

                // await snitcher("CHECKING IF ALBUMS ARE AN ARRAY OF OBJECT AND WHAT AM I RETURNING", albums);
                // await snitcher("WHAT TYPE IS ALBUMS", typeof albums);

                let target = albums.album_list.find(album => {
                   return album.album_name === track.album_name;
                });
                
                console.log(target);
                
                if(target !== undefined){
                    //await snitcher("TRACK NAME", track.album_name);
                    await snitcher("TARGET", target);
                }
                
            }
            
            if (track.has_lyrics) {
                const lyricsData = await getLyrics(track.track_id, auth); //Adding lyrics to HTML
                if (lyricsData && lyricsData.message.body.lyrics) {
                    const lyrics = lyricsData.message.body.lyrics.lyrics_body;
                    $('#lyrics').text(`Lyrics: ${lyrics}`);
                } else {
                    $('#lyrics').text('Lyrics: Not available');
                }
            } else {
                $('#lyrics').text('Lyrics: Not available');
            }
        } else {
            $('#lyrics').text('Lyrics: Track not found');
        }
    } catch (error) {
        console.error('Error displaying song info:', error); //Error handling
        $('#lyrics').text('Lyrics: Error fetching data');
    }

    // Fetch and display the top tracks from Last.fm
    await displayTopTracks();
}

async function displayTopTracks() {
    try {
        const auth = "9f7a36fd82e8b73c6616a2b8a9a4d93b";
        const topTracks = await getTopTracks(auth);

        if (topTracks && topTracks.length > 0) {
            const topTracksContainer = $('#top-tracks-container');
            topTracksContainer.empty(); // Clear any existing tracks

            // Limit to top 3 tracks
            const limitedTopTracks = topTracks.slice(0, 3);

            limitedTopTracks.forEach(track => { //Adding top tracks to HTML
                const trackHtml = `
                    <div class="column is-one-third">
                        <div class="box">
                            <p><strong>Track:</strong> ${track.name}</p>
                            <p><strong>Artist:</strong> ${track.artist.name}</p>
                            <p><strong>Playcount:</strong> ${track.playcount}</p>
                        </div>
                    </div>
                `;
                topTracksContainer.append(trackHtml);
            });
        } else {
            $('#top-tracks-container').html('<p>No top tracks available.</p>');
        }
    } catch (error) {
        console.error('Error displaying top tracks:', error); //Error handling
        $('#top-tracks-container').html('<p>Error fetching top tracks.</p>');
    }
}

$(document).ready(() => {
    const $findMusicBtn = $('#findMusic');
    const $modal = $('#modal');

    // Show modal on button click
    $findMusicBtn.on('click', () => {
        $modal.css('display', 'block');
    });

    // Hide modal when modal background is clicked
    $('.modal-background').on('click', () => {
        $modal.css('display', 'none');
    });

    // Form submission event
    $('#field').on("submit", (e) => {
        e.preventDefault();

        // Getting user input...
        const songName = $('input[type=text][name=container-songname]').val();
        const artistName = $('input[type=text][name=container-artistname]').val();

        // Sanity check
        if (songName && artistName) {
            displaySongInfo(songName, artistName);
            $modal.css('display', 'none'); // Hide the modal after submission
        } else {
            alert('Please enter both song name and artist name.');
        }
    });

    // Display top tracks when the page loads
    displayTopTracks();
});
async function displaySongInfo(songName, artistName) {
    try {
        const auth = "db1815126935bc7fef98a221fafbf0fe";
        const track = await getTrack(songName, artistName, auth);

        if (track) {
            $('#songname').text(`Song Name: ${track.track_name}`); //Displaying information to the page. Ensuring capitalization matches the API data rather than using exactly what the user types
            $('#artistname').text(`Artist Name: ${track.artist_name}`);
            $('#albumname').text(`Album Name: ${track.album_name}`);
            console.log(track);
            
            if (track.has_lyrics) {
                const lyricsData = await getLyrics(track.track_id, auth);
                if (lyricsData && lyricsData.message.body.lyrics) { //Finding lyrics through the API and displaying them
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
}

$(document).ready(() => {
    // Modal handling
    const $findMusicBtn = $('#findMusic');
    const $modalBg = $('.modal-background');
    const $modal = $('.modal');
    
    $findMusicBtn.on('click', () => {
        $modal.addClass('is-active');
    });
    $modalBg.on('click', () => {
        $modal.removeClass('is-active');
    });

    // Search button handling
    $('#field').on("submit", (e) => {
        e.preventDefault();

        // Getting user input...
        const songName = $('input[type=text][name=container-songname]').val();
        const artistName = $('input[type=text][name=container-artistname]').val();

        // Sanity check
        if (songName && artistName) {
            displaySongInfo(songName, artistName);
        } else {
            alert('Please enter both song name and artist name.');
        }
    });
});
async function displaySongInfo(songName, artistName) {
    try {
        const auth = "db1815126935bc7fef98a221fafbf0fe";
        const track = await getTrack(songName, artistName, auth);

        if (track) {
            $('#songname').text(`Song Name: ${songName}`);
            $('#artistname').text(`Artist Name: ${artistName}`);
            // $('#albumcover').attr('src', track.album_coverart_350x350 || '');
            $('#albumname').text(`Album Name: ${track.album_name}`);
            
            if (track.has_lyrics) {
                const lyricsData = await getLyrics(track.track_id, auth);
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

        console.log(track);
        
    } catch (error) {
        console.error('Error displaying song info:', error);
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

    console.log('Still alive');
    // Search button handling
    $('#field').on("submit", (e) => {
        e.preventDefault();

        // Getting user input...
        const songName = $('input[type=text][name=container-songname]').val();
        const artistName = $('input[type=text][name=container-artistname]').val();

        // TODO: Erase this!
        console.log(songName, "  ", artistName);

        // Sanity check
        if (songName && artistName) {
            displaySongInfo(songName, artistName);
        } else {
            alert('Please enter both song name and artist name.');
        }
    });
});
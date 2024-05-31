async function displaySongInfo(songName, artistName) {
    try {
        const track = getTrack(songName, artistName, "db1815126935bc7fef98a221fafbf0fe");

        // if (track) {
        //     const lyricsUrl = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track.track_id}&apikey=${apiKey}`;
        //     const lyricsResponse = await $.getJSON(lyricsUrl);
        //     const lyrics = lyricsResponse.message.body.lyrics ? lyricsResponse.message.body.lyrics.lyrics_body : 'Lyrics not found';

        //     $('#container-songname').text(songName);
        //     $('#container-artistname').text(artistName);
        //     $('#container-albumcover').attr('src', track.album_coverart_350x350 || '');
        //     $('#container-albumname').text(track.album_name || 'Unknown Album');
        //     $('#container-lyrics').text(lyrics);
        
        // } else {
        //     $('#lyrics').text('Track not found');
        // }

        track.then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        })
        
    } catch (error) {
        console.error('Error displaying song info:', error);
        $('#lyrics').text('Error fetching data');
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

        const songName = $('input[type=text][name=container-songname]').val();
        const artistName = $('input[type=text][name=container-artistname]').val();

        console.log(songName, "  ", artistName);
        if (songName && artistName) {
            displaySongInfo(songName, artistName);
        } else {
            alert('Please enter both song name and artist name.');
        }
    });
});
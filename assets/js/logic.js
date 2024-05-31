async function displaySongInfo(songName, artistName) {
    try {
        const track = await getTrack(songName, artistName, "db1815126935bc7fef98a221fafbf0fe");
        if (track) {
            $('#songname').text(`Song Name: ${songName}`);
            $('#artistname').text(`Artist Name: ${artistName}`);
            // $('#albumcover').attr('src', track.album_coverart_350x350 || '');
            $('#albumname').text(`Album Name: ${track.album_name}`);
            $('#lyrics').text(`Lyrics: ${track.has_lyrics}`);
        
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
    console.log('I exists');
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
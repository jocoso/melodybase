import { getTrack } from './data.js';

async function displaySongInfo(songName, artistName) {
    try {
        const track = await getTrack(songName, artistName, apiKey);

        if (track) {
            const lyricsUrl = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track.track_id}&apikey=${apiKey}`;
            const lyricsResponse = await $.getJSON(lyricsUrl);
            const lyrics = lyricsResponse.message.body.lyrics ? lyricsResponse.message.body.lyrics.lyrics_body : 'Lyrics not found';

            $('#container-songname').text(songName);
            $('#container-artistname').text(artistName);
            $('#container-albumcover').attr('src', track.album_coverart_350x350 || '');
            $('#container-albumname').text(track.album_name || 'Unknown Album');
            $('#container-lyrics').text(lyrics);
        } else {
            $('#lyrics').text('Track not found');
        }
    } catch (error) {
        console.error('Error displaying song info:', error);
        $('#lyrics').text('Error fetching data');
    }
}

$(document).ready(() => {
    $('#search-button').click(() => {
        const songName = $('#song-name').val().trim();
        const artistName = $('#artist-name').val().trim();

        if (songName && artistName) {
            displaySongInfo(songName, artistName);
        } else {
            alert('Please enter both song name and artist name.');
        }
    });
});
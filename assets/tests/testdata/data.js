describe('Testing the functionality, this is calling musixmatch', ()=>{
    it('should return a not null', () => {
        
        const songName = 'I Can Do It With a Broken Heart';
        const artistName = 'Taylor Swift';
        const apiKey = 'db1815126935bc7fef98a221fafbf0fe';
        const apiUrl = `https://api.musixmatch.com/ws/1.1/matcher.track.get?format=json&callback=call&q_artist=${artistName}&q_track=I Can Do It With a Broken Heart&f_has_lyrics=true&f_has_subtitle=true&apikey=${apiKey}`;
        const done = getAPIData(apiUrl, apiKey);
    

        expect(done !== null).toBe(true);

    });
  });

  
describe('Testing that we could get the track information using one function', () => {
    
    it('should return an object', () => {
        const songName = 'I Can Do It With a Broken Heart';
        const artistName = 'Taylor Swift';
        const apiKey = 'db1815126935bc7fef98a221fafbf0fe';

        const track = getTrack(songName, artistName, apiKey);

        expect(track != null).toBe(true);

    });

    it('console.log four of the music data we will need', () => {
        const songName = 'I Can Do It With a Broken Heart';
        const artistName = 'Taylor Swift';
        const apiKey = 'db1815126935bc7fef98a221fafbf0fe';

        const track = getTrack(songName, artistName, apiKey)
            .then(data => {
                console.log(data);
                console.log(data.album_id);
                console.log(data.album_name);
            })

        expect(track != null).toBe(true);

    })
});

describe('Testing the function getLyrics return the lyrics.', () => {
    
    it('should return an object', () => {
        const songName = 'I Can Do It With a Broken Heart';
        const artistName = 'Taylor Swift';
        const apiKey = 'db1815126935bc7fef98a221fafbf0fe';

        const track = getTrack(songName, artistName, apiKey);

        track.then(trackdata => {
            console.log(trackdata.track_id);
            if(trackdata.has_lyrics) {
                console.log("we got Lyrics!");
                const lyrics = getLyrics(trackdata.track_id, apiKey);
                // lyrics.then(lyricdata => {
                //     console.log(lyricdata);
                // });
            }
        });

        expect(track != null).toBe(true);

    });
});
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

  


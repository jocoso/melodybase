describe('Testing the functionality, this is calling musixmatch', ()=>{
    it('should return an not null', ()=>{
        const songName = 'I Can Do It With a Broken Heart';
        const artistName = 'Taylor Swift';
        const apiKey = 'db1815126935bc7fef98a221fafbf0fe';
        const apiUrl = `https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=5&country=it&f_has_lyrics=1&apikey=${apiKey}`;
        
        const done = getAPIData(apiUrl, apiKey);
        console.log(done);
        expect(done !== null).toBe(true);
    })

  });
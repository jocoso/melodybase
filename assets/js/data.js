/**
 * Retrieves the data from the Server API
 * and returns it as an Object
 * 
 * @param {String} url the API used to fetch request 
 * @return {Promise} data requested ready to be harvested
 * 
 */
const getAPIData = async function(url, auth) {
    // console.log("I exists...");
    
    // XXX: Proxy is needed to avoid CORS error
    const proxyUrl = 'https://corsproxy.io/?';
    const targetUrl = proxyUrl + url;
    let header = new Headers();
    
    // TODO: Check if these are needed. If not, erase.
    header.append('Authorization', `Bearer ${auth}`);
    header.append('Content-Type', 'application/json');
    
    try {

        // fetch data from the api and return a promise.
        return await fetch(targetUrl, {
            method: "GET",
            mode: "cors",
            headers: header,
        }).then(res => {return res.json()})

    } catch(error) {
        throw new Error('Error fetching data:', error);
    }

}

/**
 * Given a song and artist name, this function returns a Promise
 * with all the data about the song from the API
 * @param {string} songname The name of the song
 * @param {string} artistname The name of the artist
 * @param {string} auth The APIKey
 * @returns {Promise} The API promises to return the track
 */
const getTrack = function(songname, artistname, auth) {
    const apiUrl = `https://api.musixmatch.com/ws/1.1/matcher.track.get?format=json&callback=call&q_artist=${artistname}&q_track=${songname}&f_has_lyrics=true&f_has_subtitle=true&apikey=${auth}`;

    return getAPIData(apiUrl, auth).then(
        (data) => {
            return data.message.body.track;
        }
    ).catch((error) => {
        throw new Error('Error fetching track:', error);
    });

}

/**
 * Given a track identification number and the apikey string
 * returns all the track data.
 * @param {string} trackId ID number of the track
 * @param {string} auth The API KEY
 * @returns {Promise} The API promises to return the lyrics
 */
const getLyrics = function(trackId, auth) {
    const apiUrl = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${auth}`;

    return getAPIData(apiUrl, auth).then(
        (trackdata) => {
            return trackdata;
        }
    ).catch((error) => {
        throw new Error('Error fetching track:', error);
    })
}




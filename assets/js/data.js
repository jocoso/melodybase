/**
 * Retrieves the data from the Server API
 * and returns it as an Object
 * 
 * @param {String} url the API used to fetch request 
 * @return {Promise} data requested ready to be harvested
 * 
 */
const getAPIData = async function(url, auth) {
    // XXX: Proxy is needed to avoid CORS error
    const proxyUrl = 'https://corsproxy.io/?';
    const targetUrl = proxyUrl + encodeURIComponent(url);
    let header = new Headers();
    
    // Headers not needed for this API
    // header.append('Authorization', `Bearer ${auth}`);
    // header.append('Content-Type', 'application/json');
    
    try {
        // fetch data from the api and return a promise.
        const response = await fetch(targetUrl, {
            method: "GET",
            mode: "cors",
            headers: header,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

/**
 * Given a song and artist name, this function returns a Promise
 * with all the data about the song from the API
 * @param {string} songname The name of the song
 * @param {string} artistname The name of the artist
 * @param {string} auth The APIKey
 * @returns {Promise} The API promises to return the track
 */
const getTrack = async function(songname, artistname, auth) {
    const apiUrl = `https://api.musixmatch.com/ws/1.1/matcher.track.get?format=json&q_artist=${artistname}&q_track=${songname}&f_has_lyrics=true&apikey=${auth}`;

    try {
        const data = await getAPIData(apiUrl, auth);
        return data.message.body.track;
    } catch (error) {
        console.error('Error fetching track:', error);
        throw error;
    }
};


/**
 * Given a track identification number and the apikey string
 * returns all the track data.
 * @param {string} trackId ID number of the track
 * @param {string} auth The API KEY
 * @returns {Promise} The API promises to return the lyrics
 */
const getLyrics = async function(trackId, auth) {
    const apiUrl = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${auth}`;

    try {
        const trackdata = await getAPIData(apiUrl, auth);
        return trackdata;
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        throw error;
    }
};

/**
 * Given an API key, this function returns a Promise
 * with the top tracks data from the Last.fm API.
 * @param {string} auth The API key
 * @returns {Promise} The API promises to return the top tracks
 */
const getTopTracks = async function(auth) {
    const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${auth}&format=json`;

    try {
        const data = await getAPIData(apiUrl, auth);
        return data.tracks.track;
    } catch (error) {
        console.error('Error fetching top tracks:', error);
        throw error;
    }
};

const getAlbum = async function(
    artist_id, 
//    artist_mbid, 
    g_album_name, 
    api_key,
//    s_release_date, 
//    page, 
//    page_size)
) 
{
    const apiUrl = `https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${artist_id}&s_release_date=desc&g_album_name=${g_album_name}&apikey=${api_key}`;

    try {
        
        const data = await getAPIData(apiUrl, api_key);
        return data.message.body;
    } catch (error) {
        console.log('Error fetching Album:', error);
        throw error;
    }
    


}

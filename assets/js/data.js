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
        const response = await fetch(targetUrl, {
            method: "GET",
            mode: "cors",
            headers: header,
        }).then(response => response.json())
        .then(json => {return json;}).then(result => {
            return result.message.body;
        }).catch(
            error => { throw new Error("ERROR:" + error);}
        );

        return response;

    } catch(error) {
        throw new Error('Error fetching data:', error);
    }

}




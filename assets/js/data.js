/**
 * Retrieves the data from the Server API
 * and returns it as an Object
 * 
 * @param {String} url the API used to fetch request 
 * @return {Object} data requested
 */
const getAPIData = (url, auth) => {
    const data = {};

    fetch(url, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        if(!response.ok)
            throw new Error(`Error! status: ${response.status}`);

        return response.json();
    }).catch((error) => {
        console.log("Request failed", error);
        return null;
    });

    return data;
    
}


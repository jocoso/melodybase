/**
 * Retrieves the data from the Server API
 * and returns it as an Object
 * 
 * @param {String} url the API used to fetch request 
 * @return {Object} data requested
 */
const getAPIData = function(url, auth) {
    let out = null;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + auth);
    headers.append('Access-Control-Allow-Origin', '*');
    
    fetch(url, {
        method: 'GET',
        headers: headers,
    })
        .then((response) => {

            if(!response.ok) throw new Error('Networking response was not ok');
            return response.text;

        }).then((data) => {

           if(data) {
                try {
                    out = JSON.parse(data);
                    console.log(out);
                } catch(e) {
                    console.error('Error parsing JSON:', e);
                }
           } else {
                console.error('No data received');
           }
    
        }).catch((error) => {
      
            console.log(error);
    
        });
    
    return out;
}


async function snitcher(test_message, ...test_output) {
    if(!test_output || !test_message) 
        throw new Error("One of the parameters in undefined.");

    let message = test_message + "\n ========= \n";

    try {
        for(let i = 0; i < test_output.length; i++) {
            
            if(!test_output[i]) {
                throw new Error(`The Item at index ${i} is undefined`);
            } else if(typeof test_output[i] === "String") {
                console.log("It is a string");
                message += test_output[i] + "\n ";
            }else if(typeof test_output[i] === "object" || test_output[i].constructor.name === "Array") {
                console.log("It is an array");
                message += JSON.stringify(test_output[i], null, 4);
            } else {
                console.log("Not sure what this is...");
                console.log('-' + test_output + '-');
                throw new Error("Sorry! Unable to Snitch at this time");
            }

            if(i > 0) message += "; ";
        }
    } catch(error) {
        console.error("Snitcher ERROR:", error);
    }

    console.log(message);
}
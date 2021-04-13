/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements the utility functions...">
 *
 * Student Name:
 * Student Number:
 *
 */

export {splitHash, getDate};

// splitHash - given a hash path like "#!/people/2" 
//   return an object with properties `path` ("people") and `id` (2)
function splitHash(hash) {

    const regex = "#!/([^/]*)/?(.*)?";
    const match = hash.match(regex);
    if (match) {
        return {
            path: match[1],
            id: match[2]
        }
    } else {
        return { path: "" }
    }
}

function getDate(date){
    return date.slice(0,10);
}

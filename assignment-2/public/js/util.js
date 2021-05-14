/*
 *
 * Module: Utility Module for storing general function of the website. 
 * General function is a kind of function which does not affect the logical action of the website.
 *
 * Student Name: Van Nguyen Nguyen
 * Student Number: 45515409
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

// getDate - only taking the dd/mm/yy format of the date data.
// return a dd/mm/yy string
function getDate(date){
    return date.slice(0,10);
}

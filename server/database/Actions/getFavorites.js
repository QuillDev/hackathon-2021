const getUser = require("../Users/getUser");

async function getFavorites(db, email){

    //get the user
    const user = await getUser(db, email);

    //if the user was bad, return null;
    if(user == null){
        return {};
    }

    return { result: user.servers }
}

module.exports = getFavorites;
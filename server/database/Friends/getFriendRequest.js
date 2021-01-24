const getUser = require("../Users/getUser");

async function getFriendRequests(db, email){

    //get the user
    const user = await getUser(db, email);

    //if the user is bad return null
    if(!user){
        return null;
    }


    return user.friendRequests;
}

module.exports = getFriendRequests;
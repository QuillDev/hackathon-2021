const getUser= require("../Users/getUser");

async function getFriends(db, email){

    //get the user from the database
    const user = await getUser(db, email);

    if(!user){
        return {};
    }

    return user.friends;
}

module.exports = getFriends;
const getUser = require("../Users/getUser");

async function sendFriendRequest(db, sender, receiver) {

    console.log(1, sender, receiver)
    //you can't send a friend request to yourself
    if (receiver === sender) {
        return "null"
    }

    //get the sender and receiver
    const userOne = await getUser(db, sender);
    const userTwo = await getUser(db, receiver);

    //if the sender or receiver are bad return null
    if (!userOne || !userTwo) {
        return null;
    }

    console.log(2, sender, receiver)

    if (alreadyFriends(userOne, userTwo)) {
        return;
    }

    //if they already sent a fq, return
    if (alreadySent(userOne, userTwo)) {
        return;
    }

    console.log(2, sender, receiver)

    //get the users db
    const users = await db.get("users");

    //If the other person already sent one, become friends
    if (alreadySent(userTwo, userOne)) {
        console.log("yo")
        await friend(userOne, userTwo, users);
    } else{
        console.log("yo2")
        let rqs = userTwo.friendRequests;

        //push the sender to their friends requests
        rqs.push(userOne);

        //send a friend request to the user
        await users.findOneAndUpdate({email: userTwo.email},
            {$set: {friendRequests: rqs}});
    }


}

async function friend(userOne, userTwo, users) {
    let userOneNewFRQList = removeFRQs(userOne, userTwo);
    let userTwoNewFRQList = removeFRQs(userTwo, userOne);

    let userOneNewFL = addToFriends(userOne, userTwo);
    let userTwoNewFL = addToFriends(userTwo, userOne);


    await users.findOneAndUpdate({email: userOne.email})
        .then({$set: {friendsList: userOneNewFL, friendRequests: userOneNewFRQList}});

    await users.findOneAndUpdate({email: userTwo.email})
        .then({$set: {friendsList: userTwoNewFL, friendRequests: userTwoNewFRQList}});
}

function addToFriends(userOne, userTwo) {
    let old = userOne.friends();
    old.push(userTwo);
    return old;
}
function removeFRQs(removeFrom, personToRemove){
    return removeFrom.friendRequests.filter( (x) => x.email !== personToRemove.email);
}
function alreadyFriends(p1, p2){
    return (p1.friends.filter(x => x.email === p2.email).length > 0);
}
function alreadySent(user, sender){
    return (user.friendRequests.filter(u => u.email === sender.email).length > 0);
}
module.exports = sendFriendRequest;
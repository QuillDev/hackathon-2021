async function getUser(db, email) {
    const users = db.get("users");

    const matches = await users.find({email: email}, '-bigdata');

    //if matches is null return
    if(matches == null){
        return null;
    }

    //if there are no matches it's a new user!
    if(matches.length === 0) {
        return null;
    }

    //return the first match
    return matches[0];
}

module.exports = getUser;
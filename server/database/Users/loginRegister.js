async function loginRegister(db, email, name, icon) {

    try {
        const users = db.get("users");

        const matches = await users.find({email: email}, '-bigdata');

        //if matches is null return
        if(matches == null){
            return;
        }

        //if there are no matches it's a new user!
        if(matches.length === 0){
            await users.insert({
                email,
                name,
                icon
            });
        }

    }catch (e){
        console.log(e);
    }

}
module.exports = loginRegister;
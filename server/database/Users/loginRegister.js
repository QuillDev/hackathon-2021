const User = require("./user");

async function loginRegister(db, email, name) {

    try {
        const users = db.get("users");

        //create a user
        const user = new User(email, name);

        const matches = await users.find({email: email}, '-bigdata');

        //if matches is null return
        if(matches == null){
            db.close();
            return;
        }

        //if there are no matches it's a new user!
        if(matches.length === 0){
            await users.insert(user.getObject());
            return `Welcome ${user.name}`
        }
        else{
            return `Welcome back ${user.name}`;
        }

    }catch (e){
        console.log(e);
    }

}
module.exports = loginRegister;
const User = require("./user");

async function loginRegister(email, name) {
    const db = require("monk")("localhost:27017/hackathon-2021");

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
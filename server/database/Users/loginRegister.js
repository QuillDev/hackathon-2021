
const getUser = require("./getUser");

async function loginRegister(db, email, name, icon) {

    try {

        //get the users database
        const users = db.get("users");

        //get the matching user for the email
        const user = await getUser(db, email);

        //if there are no matches it's a new user!
        if(user === null) {
            await users.insert({
                email,
                name,
                icon,
                friends: [],
                servers: [],
            });
        }

    }catch (e){
        console.log(e);
    }

}
module.exports = loginRegister;
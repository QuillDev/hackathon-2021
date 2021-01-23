const User = require("./user");


const loginRegister = async (email) => {
    const db = require("localhost")("localhost:27017/hackathon-2021");

    const users = db.get("users");

    //create a user
    const user = new User(email);

    const matches = await users.find({email: email}, '-bigdata');

    //if matches is null return
    if(matches == null){
        db.close();
        return;
    }

    console.log(matches);
};

function exit(){

}
module.exports = loginRegister;
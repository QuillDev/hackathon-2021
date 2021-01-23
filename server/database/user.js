const { v4: uuidv4 } = require("uuid");

class User {
    constructor(email, name) {
        this.email = email;
        this.uuid = uuidv4();
        this.name = name;
    }

    getObject(){
        return {
            email: this.email,
            uuid: this.uuid,
            name: this.name
        }
    }
}

module.exports = User;
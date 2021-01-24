class User {
    constructor (username, email, icon, server = [], favorites = []){
        this.username = username;
        this.email = email;
        this.icon = icon;
        this.server = server;
        this.favorites = favorites;
    }
    static fromDBUser(dbUser){
        return new User(dbUser.username, dbUser.email, dbUser.icon, dbUser.server, dbUser.favorites);
    }
}

module.exports = {
    User,
}
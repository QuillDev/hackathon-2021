const { elements } = require("./periodic.json");
const Owlbot = require('owlbot-js');
require("dotenv").config();
const owlclient = Owlbot(process.env.REACT_APP_OWLBOT_KEY);

async function handleCommand(msg, usr, icon, room, io) {

    if(!msg.startsWith("/")){
        return;
    }

    let args = msg.split(" ");
    let command = args[0].substring(1, args[0].length);

    switch (command){
        case "define":
            spitFire(await define(args), io, room);
            break
        case "tb":
            spitFire(getElement(args), io, room);
            break;
        case "help":
            spitFire(getHelp(), io, room)
            break;
        case "?":
            spitFire(getHelp(), io, room)
            break;
        default:
            spitFire("No valid command found, type /help to view commands!", io, room);
            break;
    }
}

function getHelp(){
    return`tb [elementName] - gets information about the specified element.
    define [word] - gets the english definition and type for the given word`;
}
function spitFire(string, io, room){

    if(!string){
        io.emit("chat message", "Invalid Query!", "NL", "https://i.redd.it/l4q6sfc99u0z.jpg", room);
        return;
    }

    let bullets = string.split("\n");
    for(const bullet of bullets){
        io.emit("chat message", bullet, "NL", "https://i.redd.it/l4q6sfc99u0z.jpg", room);
    }

}
function getElement(args){
    for(const element of elements){
        if(args[1].toLowerCase() === element.name.toLowerCase()){
            return `Element: ${element.name}
            Atomic Mass: ${element.atomic_mass}
            Discovered By: ${element.discovered_by}
            Description: ${element.summary}`
        }
    }
}

async function define(args) {
    let word = args.splice(1, args.length -1).join(" ");
    return await owlclient.define(word)
        .then(function (result) {
            let def = result.definitions[0];

            return `Word: ${result.word}\nType: ${def.type}\nDefinition: ${def.definition}`;
        });
}

module.exports = handleCommand;
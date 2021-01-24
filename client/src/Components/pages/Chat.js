import {Component} from "react";
import qs from "qs";
import socketIOClient from "socket.io-client";
import "./chat.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard, faReply} from "@fortawesome/free-solid-svg-icons";
import timestamp from "time-stamp";
import {faChild} from "@fortawesome/free-solid-svg-icons/faChild";

class Chat extends Component{

    constructor(props) {
        super(props);
        this.state = {
            "roomName": "New Chat",
            "roomCode": ""
        };
        this.roomCode = null;
        this.favorite = false;
        this.icon = localStorage.getItem("icon");
        this.socket = socketIOClient("https://api.quilldev.tech");

        //working var for locking favorite spamming
        this.working = false;

        //Log the message
        this.socket.on("chat message", (msg, usr, icon, room) => {
            if(this.roomCode !== room){
                return;
            }

            //add the chat message
            this.addChatMessage(msg, usr, icon);
        });
    }

    /**
     * Add a chat message given a user, msg, and icon
     * @param msg to add
     * @param usr who added the message
     * @param icon of the user
     * @param stamp a timestamp for the message
     */
    addChatMessage(msg, usr, icon, stamp = timestamp("HH:mm")){
        const messages = document.getElementById("messages");
        const prevMsgs = messages.getElementsByTagName("li");
        const lastMsg = prevMsgs.item(prevMsgs.length - 1);

        const classname = usr.split(" ").join("-");

        if(prevMsgs.length === 0 || classname !== lastMsg.className) {
            const nameMsg = document.createElement('li');
            nameMsg.classList.add(classname);
            nameMsg.classList.add("name");
            nameMsg.innerHTML= `<img src="${icon}" class="user-icon" alt="">  ${usr}</p></img>`;
            messages.appendChild(nameMsg);
            window.scrollTo(0, document.body.scrollHeight);
        }
        const item = document.createElement('li');
        item.classList.add(classname);

        item.textContent = `[${stamp}]: ${msg}`;
        messages.appendChild(item);
        window.scrollTo(0,document.body.scrollHeight);;
    }

    /**
     * Update the favorite status of a room
     * @returns {Promise<void>}
     */
    async updateFavorite(){

        //if we're in an invalid room, we ain't having none of it
        if(this.roomCode == null || this.working){
            return;
        }

        this.working = true;

        await fetch(`https://api.quilldev.tech/api/editFavorite?favorite=${this.favorite}&roomCode=${this.roomCode}&email=${localStorage.email}&roomName=${this.state.roomName}`);
        this.working = false;
    }

    /**
     * Get data about the room
     * @returns {Promise<void>}
     */
    async getRoomData() {
        const roomCode = qs.parse(this.props.location.search, { ignoreQueryPrefix: true}).roomCode;

        //if the code is bad, return
        if(!roomCode || roomCode.length !== 8){
            return;
        }

        //get the data for the given room
        const roomData = await fetch(`https://api.quilldev.tech/api/join-room?id=${roomCode}`)
            .then( async (res) => {

                //if the status is bad, return an error
                if(res.status !== 200){
                    return new Error(`Error getting room [CODE: ${res.status}]`);
                }

                return await res.json();
            });

        //if room data is null, return
        if(roomData === null ){
            return;
        }

        this.roomCode = roomData.code;

        this.setState({
            "roomName": roomData.name,
            "roomCode": this.roomCode,
            "favorite": false
        });

    }

    /**
     * Get old message history (since we last connected)
     * @returns {Promise<void>}
     */
    async getOldMessages(){
        let json = await fetch(`https://api.quilldev.tech/api/getMessageHistory?roomCode=${this.roomCode}`)
            .then(res => res.json());

        let result = json.result;

        //if we didn't get a result, just return out
        if(!result){
            return;
        }

        console.log(result)
        //push each message to the chat
        for(const message of result){
            this.addChatMessage(message.msg, message.usr, message.icon, message.timestamp);
        }
    }
    /**
     * Get whether this channel is favorited
     * @returns {Promise<void>}
     */
    async getFavorite() {
        try {
            let data = await fetch(`https://api.quilldev.tech/api/getFavorites?email=${localStorage.email}`)
                .then(res => res.json())

            //get the response from the data
            let result = data.result;

            //check for a bad response
            if(!result) {
                console.log("error retrieving data");
                return;
            }

            //check if we already have this page favorited
            this.favorite = result.filter(x => x.code === this.roomCode).length > 0;

            //draw the favorite icon
            this.drawFavorite();

        } catch (error){
            console.log(error);
        }
    }
    /**
     * Draw the favorited icon
     */
    drawFavorite(){
        const starDiv = document.getElementById("starDiv");
        starDiv.innerHTML =  this.favorite ? "💖" : "💔" ;
    }

    //Open the file explorer
    getFile(){
        document.getElementById("openfile").click();
    }

    //ignore this
    async componentWillMount() {
        await this.getRoomData();

        //get favorite and old message data
        let res = this.getFavorite();
        let res2 = this.getOldMessages();

        await Promise.all([res, res2]);
    }

    async sendMessage(event){
        event.preventDefault();

        //if the room code is null we can't send messages
        if(this.roomCode == null){
            return;
        }

        //get the form data
        const data = new FormData(event.target);

        //get the entered name for the chat
        let message = data.get("chatBox");

        //if the message is bad return
        if(!message || message.length === 0){
            return;
        }

        event.target.reset();

        this.socket.emit("chat message", message, localStorage.getItem("name"), localStorage.getItem("icon"), this.roomCode);
    }
    render(){
        return(
            <div className={"App"}>
                <header className={"App-header-fix"}>
                    {/* Set the room name */}
                    <div id="roomBanner">
                        {this.state.roomName} (Room code: {this.state.roomCode})
                        <div as="button" onClick={ () => {this.favorite = !this.favorite; this.drawFavorite(); this.updateFavorite();}}  id="starDiv"/>
                    </div>
                    <div id="messages">
                    </div>
                    <div id="chat-box-div">

                        <div style={{textAlign: "center"}}>
                            <form onSubmit={(event) => this.sendMessage(event)} id="form" action="">
                                <input autoComplete="off" name="chatBox"/>
                                <button type="submit"><FontAwesomeIcon icon={faReply}/></button>
                                <button onClick={() => this.getFile()} type='button' ><FontAwesomeIcon icon={faClipboard}/></button>
                                <button type='button' ><FontAwesomeIcon icon={faChild}/></button>
                                <input id="openfile" type='file' hidden/>
                            </form>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default Chat;
import {Component} from "react";
import qs from "qs";
import socketIOClient from "socket.io-client";
import "./chat.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard, faReply} from "@fortawesome/free-solid-svg-icons";
import timestamp from "time-stamp";

class Chat extends Component{

    constructor(props) {
        super(props);
        this.state = {
            "roomName": "New Chat"
        };
        this.roomCode = null;
        this.icon = localStorage.getItem("icon");
        this.socket = socketIOClient("https://api.quilldev.tech");

        //Log the message
        this.socket.on("chat message", (msg, usr, icon, room) => {
            if(this.roomCode !== room){
                return;
            }

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

            let hour = parseInt(timestamp("HH"));
            let suffix = hour > 12 ? "pm" : "am";
            item.textContent = `[${timestamp("HH:mm")}${suffix}]: ${msg}`;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    //Ignore this
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

        this.setState({
            "roomName": roomData.name
        });

        this.roomCode = roomData.code;
    }

    getFile(){
        document.getElementById("openfile").click();
    }
    //ignore this
    async componentWillMount() {
        await this.getRoomData();
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
                        {this.state.roomName}
                    </div>
                    <div id="messages">
                    </div>
                    <div id="chat-box-div">

                        <div style={{textAlign: "center"}}>
                            <form onSubmit={(event) => this.sendMessage(event)} id="form" action="">

                                <input autoComplete="off" name="chatBox"/>
                                <button type="submit"><FontAwesomeIcon icon={faReply}/></button>
                                <button onClick={() => this.getFile()} type='button' ><FontAwesomeIcon icon={faClipboard}/></button>
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
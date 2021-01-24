import {Component} from "react";
import qs from "qs";
import socketIOClient from "socket.io-client";
import "./chat.css";

class Chat extends Component{

    constructor(props) {
        super(props);
        this.state = {
            "roomName": "New Chat"
        };
        this.roomCode = null;
        this.icon = localStorage.getItem("icon");
        this.socket = socketIOClient("https://api.quilldev.tech")

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
                nameMsg.innerHTML= `<p><img src="${icon}" class="user-icon" alt="">${usr}</p></img>`;
                messages.appendChild(nameMsg);
                window.scrollTo(0, document.body.scrollHeight);
            }
            const item = document.createElement('li');
            item.classList.add(classname);
            item.textContent = msg;
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
                    <div style={{alignItems:"flex-start", flexDirection:"row"}}>
                        <div style={{paddingBottom:"20px", paddingTop:"10px"}}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a style={{borderStyle:"solid", fontSize:"40px", padding:"15px"}}>{this.state.roomName}</a>
                        </div>
                    </div>
                    <div id="messages">
                    </div>
                    <form onSubmit={(event) => this.sendMessage(event)} id="form" action="">
                        <input autoComplete="off" name="chatBox"/>
                        <button>Send</button>
                    </form>
                </header>
            </div>
        );
    }
}

export default Chat;
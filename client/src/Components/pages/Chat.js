import {Component} from "react";
import qs from "qs";
import socketIOClient from "socket.io-client";

class Chat extends Component{

    constructor(props) {
        super(props);
        this.state = {"roomName": "New Chat"};
        this.roomCode = null;
        this.socket = socketIOClient("https://api.quilldev.tech");

        //Log the message
        this.socket.on("chat message", (msg, usr, room) => {
            if(this.roomCode !== room){
                return;
            }

            console.log(`${usr} : ${msg}`);
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

        this.socket.emit("chat message", message, localStorage.getItem("name"), this.roomCode);
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
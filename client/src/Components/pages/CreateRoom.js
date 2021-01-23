import {Component} from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RoomForm from "../Forms/RoomForm";

class CreateRoom extends Component{

    constructor(props) {
        super(props);
        this.state = {};
        this.processing = false;
    }

    async testFunc(){
        //if we're creating a room currently, return
        if(this.processing) {
            return;
        }

        //start processing
        this.processing = true;

        //say we're creating a room.
        this.setState({roomStatus: "Creating Room"});

        let room = await fetch("https://api.quilldev.tech/api/create-room")
            .then( async (res) => {

                //if it went bad, return null
                if(res.status !== 200){
                    return new Error(`Failed to create room [Code: ${res.status}]`);
                }

                return await res.text();
            })

        //if the room was an error, tell the user
        if(room instanceof Error){
            this.setState({ roomStatus: room } );
            return;
        }

        //take them to the chat
        window.location.href = `../chat?room=${room}`;

        //set processing to false
        this.processing = false;
    }
    render(){
        return(
            <div className={"App"}>
                <header className={"App-header-fix"}>
                    <RoomForm/>
                    <p>{this.state.roomStatus}</p>
                </header>
            </div>
        )
    }
}

export default CreateRoom;
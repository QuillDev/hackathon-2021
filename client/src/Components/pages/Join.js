import {Component} from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class Join extends Component{

    constructor(props) {
        super(props);
        this.processing = false;
        this.state = {chatStatus: ""};
    }

    async submitForm(e){
        e.preventDefault();

        //if we're already processing a room, don't start on a new one (prevents spam)
        if(this.working){
            return;
        }

        //lock out new inputs
        this.working = true;

        //get the form data
        const data = new FormData(e.target);

        //get the entered name for the chat
        let code = data.get("roomCode");

        //if the code isn't the right length return
        if(code.length !== 8){
            this.setState({chatStatus: "Invalid room code, must be 8 characters!"});
            this.working = false;
            return;
        }

        //Say that we're trying to create a chatroom
        this.setState({chatStatus: `Creating Chatroom "${code}"`});

        //make a create room request to the api
        let roomData = await fetch(`https://api.quilldev.tech/api/join-room?id=${code}`)
            .then( async (res) => {

                //if we fail to create a room, let us know
                if(res.status !== 200){
                    return new Error(`Couldn't create room Error: [${res.status}]`);
                }

                return await res.json();
            }).catch();

        if(roomData === null){
            this.setState({chatStatus: `Room does not exist!`});
        }
        else if(roomData instanceof Error){
            this.setState({chatStatus: `Error getting room: ${roomData.toString()}`});
        }
        else {
            window.location.href = `../chat?roomCode=${roomData.code}`;
        }


        //set working to false
        this.working = false;
    }

    render(){
        return(
            <div className={"App"}>
                <header className={"App-header-fix"}>
                    <div style={{alignItems:"flex-start", flexDirection:"column"}}>
                        <div style={{width:"100%", display:"inline-block", whiteSpace:"nowrap", paddingBottom:"20px", paddingTop:"10px", borderStyle:"solid", fontSize:"40px", padding:"18px"}}>
                            <Form onSubmit={ async (event) => {await this.submitForm(event)}}>
                                <Form.Group controlId="roomCode">
                                    <Form.Label style={{display:"inline-block"}}>Enter Room Code: </Form.Label>
                                    <div style={{paddingLeft:"15px", display:"inline-block"}}/>
                                    <Form.Control style={{display:"inline-block", height:"50px", paddingTop:"10px", fontSize:"40px", width:"275px"}} name="roomCode" type="text" placeholder="Room Code" />
                                </Form.Group>
                                <Button type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <p>{this.state.chatStatus}</p>
                        </div>
                        <div style={{paddingTop:"25px"}}/>
                        <Button style={{width:"50%"}} variant="outline-light" onClick={() => window.location.href = "../create-room"}>Create a New Room</Button>
                    </div>
                </header>
            </div>
        )
    }
}

export default Join;
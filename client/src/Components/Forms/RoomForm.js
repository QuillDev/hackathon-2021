import {Component} from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

class RoomForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.working = false;
    }

    /**
     * Submit the form and create the chat room
     * @param e
     */
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
        let name = data.get("chatName");

        //if the name has a length of 0,
        if(!name || name.length === 0){
            name = "New Chatroom";
        }

        //Say that we're trying to create a chatroom
        this.setState({chatStatus: `Creating Chatroom "${name}"`});

        //make a create room request to the api
        let roomCode = await fetch(`https://api.quilldev.tech/api/create-room?name=${name}`)
            .then( async (res) => {
                //if we fail to create a room, let us know
                if(res.status !== 200){
                    return new Error(`Couldn't create room Error: [${res.status}]`);
                }

                return await res.text();
            }).catch();

        //if the room code was an error let us know
        if(roomCode instanceof Error){
            this.setState({chatStatus: roomCode.toString()});
        }
        else {
            window.location.href = `../chat?roomCode=${roomCode}`;
        }

        //set working to false
        this.working = false;
    }

    render() {
        return (
            <div style={{flex:"content"}}>
                <Form onSubmit={ (e) => this.submitForm(e)}>
                    <Form.Group className="text-center">
                        <Form.Label style={{paddingBottom:"10px"}}>Create a study room: </Form.Label>
                        <Form.Control style={{textAlign:"center", height:"50px", fontSize:"30px"}} name="chatName" placeholder="Study Room" />
                    </Form.Group>
                    <Button variant="outline-light" type="submit">
                        Submit
                    </Button>
                </Form>

                <p>{this.state.chatStatus}</p>
            </div>
        );
    }
}

export default RoomForm;
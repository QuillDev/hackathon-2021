import {Component} from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

class RoomForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * Submit the form and create the chat room
     * @param e
     */
    submitForm(e){
        e.preventDefault();
        const data = new FormData(e.target);

        let name = data.get("chatname");

        this.setState({chatStatus: "Creating the chatroom..."});
    }

    handleKeyPress(e){
        console.log(e);
    }
    render() {
        return (
            <div style={{flex:"content"}} onKeyUpCapture={ (key) => this.handleKeyPress(key)}>
                <Form onSubmit={ (e) => this.submitForm(e)}>
                    <Form.Group class="text-center">
                        <Form.Label style={{paddingBottom:"10px"}}>Create a study room: </Form.Label>
                        <Form.Control style={{textAlign:"center", height:"50px", fontSize:"30px"}} name="chatname" placeholder="Study Room" />
                    </Form.Group>
                    <Button variant="outline-light" type="button">
                        Create
                    </Button>
                </Form>

                <p>{this.state.chatStatus}</p>
            </div>



        );
    }
}

export default RoomForm;
import {Component} from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

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
            <div onKeyUpCapture={ (key) => this.handleKeyPress(key)}>
                <Form onSubmit={ (e) => this.submitForm(e)}>
                    <Form.Group>
                        <Form.Label>Name of chatroom: </Form.Label>
                        <Form.Control name="chatname" placeholder="Chatroom Name" />
                    </Form.Group>
                    <Button variant="primary" type="button">
                        Submit
                    </Button>
                </Form>

                <p>{this.state.chatStatus}</p>
            </div>



        );
    }
}

export default RoomForm;
import {Component} from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class Join extends Component{
    render(){
        return(
            <div className={"App"}>
                <header className={"App-header-fix"}>
                    <div style={{alignItems:"flex-start", flexDirection:"column"}}>
                        <div style={{width:"100%", display:"inline-block", whiteSpace:"nowrap", paddingBottom:"20px", paddingTop:"10px", borderStyle:"solid", fontSize:"40px", padding:"15px"}}>
                            <Form>
                                <Form.Group controlId="roomCode">
                                    <Form.Label>Enter Room Code: </Form.Label>
                                    <Form.Control style={{height:"40px", paddingTop:"10px", fontSize:"40px", width:"250px"}} type="text" placeholder="Room Code" />
                                </Form.Group>
                            </Form>
                        </div>
                        <div style={{paddingTop:"15px"}}>
                            PUBLIC ROOMS
                        </div>
                    </div>
                    <Button onClick={() => window.location.href = "../create-room"}>Click to Create a new room! </Button>
                </header>
            </div>
        )
    }
}

export default Join;
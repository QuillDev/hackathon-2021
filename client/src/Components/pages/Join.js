import {Component} from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class Join extends Component{
    render(){
        return(
            <div className={"App"}>
                <header className={"App-header-fix"}>
                    <div style={{alignItems:"flex-start", flexDirection:"column"}}>
                        <div style={{width:"100%", display:"inline-block", whiteSpace:"nowrap", paddingBottom:"20px", paddingTop:"10px", borderStyle:"solid", fontSize:"40px", padding:"18px"}}>
                            <Form style={{whiteSpace:"nowrap"}}>
                                <Form.Group controlId="roomCode">
                                    <Form.Label style={{display:"inline-block"}}>Enter Room Code: </Form.Label>
                                    <div style={{paddingLeft:"15px", display:"inline-block"}}/>
                                    <Form.Control style={{display:"inline-block", height:"50px", paddingTop:"10px", fontSize:"40px", width:"275px"}} type="text" placeholder="Room Code" />
                                </Form.Group>
                            </Form>
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
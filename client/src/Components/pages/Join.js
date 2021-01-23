import {Component} from "react";
import {Form} from "react-bootstrap";

class Join extends Component{
    render(){
        return(
            <div className={"App"}>
                <header className={"App-header-fix"}>
                    <div style={{alignItems:"flex-start", flexDirection:"column"}}>
                        <div style={{paddingBottom:"20px", paddingTop:"10px", borderStyle:"solid", fontSize:"40px", padding:"15px"}}>
                            <Form>
                                <Form.Group controlId="roomCode">
                                    <Form.Label>Enter Room Code: </Form.Label>
                                    <Form.Control style={{height:"40px", paddingTop:"10px", fontSize:"40px", width:"250px"}} type="text" placeholder="Room Code" />
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default Join;
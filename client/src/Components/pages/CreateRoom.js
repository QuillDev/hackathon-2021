import {Component} from "react";
import RoomForm from "../Forms/RoomForm";

class CreateRoom extends Component{
    render(){
        return(
            <div className={"App"}>
                <header className={"App-header"}>
                    <div style={{borderStyle:"solid", fontSize:"40px", padding:"15px"}}>
                        <RoomForm/>
                    </div>
                </header>
            </div>
        )
    }
}

export default CreateRoom;
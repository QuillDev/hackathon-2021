import {Component} from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

class Chat extends Component{
    render(){
        return(
            <div className={"App"}>
                <header className={"App-header"} style={{alignItems:"flex-start", flexDirection:"row"}}>
                    <div style={{position:"absolute", left:"0px", width:"10px"}}>
                        <circle></circle>
                    </div>
                    <div style={{paddingBottom:"20px", paddingTop:"10px"}}>
                        <a style={{borderStyle:"solid", fontSize:"40px", padding:"15px"}}>Michael's Chat Room</a>
                    </div>
                    <div>
                        <Link to={"/"}>
                            <Button className="btn" variant="dark">
                                Wowee
                            </Button>
                        </Link>
                    </div>
                </header>
            </div>
        );
    }
}

export default Chat;
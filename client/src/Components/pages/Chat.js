import {Component} from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import avatar from "../../avatar.jpg";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Michael Erickson
    </Tooltip>
);

class Chat extends Component{
    render(){
        return(
            <div className={"App"}>
                <header className={"App-header-fix"}>
                    <div style={{alignItems:"flex-start", flexDirection:"row"}}>
                        <div style={{paddingBottom:"20px", paddingTop:"10px"}}>
                            <a style={{borderStyle:"solid", fontSize:"40px", padding:"15px"}}>Michael's Chat Room</a>
                        </div>
                    </div>
                    <div style={{position:"absolute", left:"0px", width:"10px"}}>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <img src={avatar} style={{borderRadius:"50%", width:"85px", height:"85px"}}></img>
                        </OverlayTrigger>
                        <img src={avatar} style={{borderRadius:"50%", width:"85px", height:"85px"}}></img>
                        <img src={avatar} style={{borderRadius:"50%", width:"85px", height:"85px"}}></img>
                        <img src={avatar} style={{borderRadius:"50%", width:"85px", height:"85px"}}></img>
                        <img src={avatar} style={{borderRadius:"50%", width:"85px", height:"85px"}}></img>
                    </div>

                </header>
            </div>
        );
    }
}

export default Chat;
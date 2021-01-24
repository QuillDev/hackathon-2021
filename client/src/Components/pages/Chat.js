import {Component} from "react";
import avatar from "../../avatar.jpg";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import qs from "qs";

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Michael Erickson
    </Tooltip>
);

class Chat extends Component{

    constructor(props) {
        super(props);
        this.state = {"roomName": "New Chat"};
    }

    //Ignore this
    async getRoomData() {
        const roomCode = qs.parse(this.props.location.search, { ignoreQueryPrefix: true}).roomCode;

        //if the code is bad, return
        if(!roomCode || roomCode.length !== 8){
            return;
        }

        //get the data for the given room
        const roomData = await fetch(`https://api.quilldev.tech/api/join-room?id=${roomCode}`)
            .then( async (res) => {

                //if the status is bad, return an error
                if(res.status !== 200){
                    return new Error(`Error getting room [CODE: ${res.status}]`);
                }

                return await res.json();
            });

        //if room data is null, return
        if(roomData === null ){
            return;
        }

        this.setState({
            "roomName": roomData.name
        });
    }

    //ignore this
    async componentWillMount() {
        await this.getRoomData();
    }

    render(){
        return(
            <div className={"App"}>
                <header className={"App-header-fix"}>
                    <div style={{alignItems:"flex-start", flexDirection:"row"}}>
                        <div style={{paddingBottom:"20px", paddingTop:"10px"}}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a style={{borderStyle:"solid", fontSize:"40px", padding:"15px"}}>{this.state.roomName}</a>
                        </div>
                    </div>
                    <div style={{position:"absolute", left:"0px", width:"10px"}}>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <img src={avatar} style={{borderRadius: "50%", width: "85px", height: "85px"}}/>
                        </OverlayTrigger>
                        <img src={avatar} style={{borderRadius: "50%", width: "85px", height: "85px"}}/>
                        <img src={avatar} style={{borderRadius: "50%", width: "85px", height: "85px"}}/>
                        <img src={avatar} style={{borderRadius: "50%", width: "85px", height: "85px"}}/>
                        <img src={avatar} style={{borderRadius: "50%", width: "85px", height: "85px"}}/>
                    </div>
                </header>
            </div>
        );
    }
}

export default Chat;
import './App.css';
import {Component} from "react";
import Main from "./Main";
import logo from "../nonAnimatedLogo.gif";
import {OverlayTrigger, Popover, Tooltip} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class App extends Component {
    render(){

        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3" style={{textAlign:"center"}}>Log out</Popover.Title>
                <Popover.Content>
                    <Button variant="danger">Log Me Out</Button>
                </Popover.Content>
            </Popover>
        );

        return (
            <header className="App-header">
                <div style={{display:"inline-block"}} className="App">
                    <img style={{width:"50px", height:"50px", borderRadius: 50, position:"absolute", left:"0px"}} src={logo} alt={"logo"}/>
                    <p style={{display:"inline-block", position:"absolute", left:"45px", fontSize:"28px"}}>{localStorage.getItem("name")}</p>
                    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                        <img style={{borderRadius: 75, display:"inline-block", position:"absolute", right:"0px"}} src={localStorage.getItem("icon")} alt={"PFP"}/>
                    </OverlayTrigger>
                    <Main />
                </div>
            </header>
        );
    }
}

export default App;

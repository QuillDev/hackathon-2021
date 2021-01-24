import {Component} from "react";
import {useLocation} from 'react-router-dom';

class LoginWidget extends Component {

    getDir() {
        const location = useLocation();
        return location.pathname;
    }
    render() {
        if(this.getDir() === "/"){
            return <div/>
        }
        else {
            return (
                <div>
                    <p>Logged in as: {localStorage.getItem("name")}</p>
                    <img style={{borderRadius: 50}} src={localStorage.getItem("icon")} alt={"PFP"}/>
                </div>
            )
        }
    }
}
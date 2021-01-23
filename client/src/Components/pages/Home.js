import {Jumbotron} from "react-bootstrap";
import logo from "../../logo.gif";
import Login from "../GoogleLogin/Login";
import { Component } from "react";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: ""};
    }

    //Ignore this
    callAPI() {
        try {
            fetch("https://api.quilldev.tech/api")
                .then(res => res.text())
                .then(res => this.setState({apiResponse: res}));
    } catch (error){
            console.log(error);
        }
    }

    //ignore this
    componentWillMount() {
        this.callAPI();
    }

    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <Jumbotron style={{backgroundColor: "#332927", borderRadius:"40px"}}>
                        <h1>Observe</h1>
                        <img src={logo} alt="Logo" width={200} height={200}/>
                        <p style={{paddingLeft:"20px", paddingRight:"20px"}}>
                            A comprehensive solution to online tutoring.
                        </p>
                    </Jumbotron>
                    <div style={{paddingTop: "40px"}}/>
                    <Login/>
                    <p>{this.state.apiResponse}</p>
                </header>
            </div>
        )
    }
}


export default Home;
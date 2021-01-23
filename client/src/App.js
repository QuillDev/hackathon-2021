import logo from './logo.gif';
import './App.css';
import Login from "./GoogleLogin/Login";
import Logout from "./GoogleLogin/Logout";
import {Jumbotron} from "react-bootstrap";
import {Component} from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: ""};
  }

  callAPI() {
    fetch("http://localhost:3069/api")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render(){
    return (
        <div className="App">
          <header className="App-header">
            <Jumbotron style={{backgroundColor: "#332927", borderRadius:"40px"}}>
              <h1>Observe</h1>
              <img src={logo} alt="Logo" width={300} height={300}/>
              <p style={{paddingLeft:"20px", paddingRight:"20px"}}>
                A comprehensive solution to online tutoring.
              </p>
            </Jumbotron>
            <div style={{paddingTop: "10px"}}/>

            <p>{this.state.apiResponse}</p>
            <div style={{borderStyle:"solid"}}><Login/></div>
          </header>
        </div>


    );
  }
}

export default App;

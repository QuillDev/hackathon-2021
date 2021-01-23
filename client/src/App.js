import logo from './logo.png';
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

            <p>Michael's Chat Room</p>

            <Jumbotron>
              <h1>Observe</h1>
              <img src={logo} alt="Logo" />
              <p>
                A comprehensive solution to online tutoring.
              </p>
            </Jumbotron>
            {/* Login and Logout Buttons */}
            <Login/>
            <Logout/>

            <p>{this.state.apiResponse}</p>
          </header>
        </div>
    );
  }
}

export default App;

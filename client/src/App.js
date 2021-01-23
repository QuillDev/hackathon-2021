import logo from './logo.png';
import './App.css';
import Login from "./GoogleLogin/Login";
import Logout from "./GoogleLogin/Logout";
import {Button, Jumbotron} from "react-bootstrap";

function App() {
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
      </header>
    </div>
  );
}

export default App;

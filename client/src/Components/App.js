import './App.css';
import {Component} from "react";
import Main from "./Main";

class App extends Component {

  render(){
    return (
        <div className="App">
            <p>Logged in as: {localStorage.getItem("name")}</p>
            <img style={{borderRadius: 50}} src={localStorage.getItem("icon")} alt={"PFP"}/>
          <Main />
        </div>
    );
  }
}

export default App;

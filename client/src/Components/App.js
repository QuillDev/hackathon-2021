import './App.css';
import {Component} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import Logout from "./GoogleLogin/Logout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";

class App extends Component {
    render(){
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand className="brand-text" href="../dash">

                    <p id="App-logo">
                        <FontAwesomeIcon icon={faEye}/> { "{ Observe }" }
                    </p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                </Navbar.Collapse>
                <Nav>
                    <Navbar.Brand href="https://hackathon.quilldev.tech/dash">
                        <img
                            src={localStorage.icon}
                            width="50"
                            height="50"
                            style={{borderRadius: 50, borderColor: "white", borderStyle: "solid"}}
                            alt="ICO"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title={`Signed in as: ${localStorage.name}`} id="collasible-nav-dropdown">
                            <NavDropdown.Item > <Logout/></NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Nav>
            </Navbar>
        );
    }
}

export default App;

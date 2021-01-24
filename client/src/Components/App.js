import './App.css';
import {Component} from "react";
import {Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from "../nonAnimatedLogo.gif"
import Logout from "./GoogleLogin/Logout";

class App extends Component {
    render(){
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Nav.Item as="img" src={logo} style={{width: "40px", height: "40px", marginRight: "10px"}}/>
                <Navbar.Brand className="brand-text" href="../"> {"{ Observe }"} </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                </Navbar.Collapse>
                <Nav>
                    <Navbar.Brand href="#home">
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
                            <NavDropdown.Item ><Logout/></NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Nav>
            </Navbar>
        );
    }
}

export default App;

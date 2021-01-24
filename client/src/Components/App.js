import './App.css';
import {Component} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from "../nonAnimatedLogo.gif"

class App extends Component {
    render(){
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Nav.Item as="img" src={logo} style={{width:"40px", height:"40px", marginRight:"10px"}}></Nav.Item>
                <Navbar.Brand href="#home">Observe</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                </Navbar.Collapse>
                <Nav>
                    <!-- add profile photo/logout and name here-->
                </Nav>
            </Navbar>
        );
    }
}

export default App;

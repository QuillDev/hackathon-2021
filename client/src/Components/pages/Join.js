import { Component } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./join.css";
import {faBook, faCalculator, faFlask, faPen} from "@fortawesome/free-solid-svg-icons";

class Join extends Component {
    constructor(props) {
        super(props);
        this.processing = false;
        this.state = { chatStatus: "" };
    }

    joinRoom(string){
        window.location.href = `../chat?roomCode=${string}`;
    }
    async submitForm(e) {
        e.preventDefault();

        //if we're already processing a room, don't start on a new one (prevents spam)
        if (this.working) {
            return;
        }

        //lock out new inputs
        this.working = true;

        //get the form data
        const data = new FormData(e.target);

        //get the entered name for the chat
        let code = data.get("roomCode");

        //if the code isn't the right length return
        if (code.length !== 8) {
            this.setState({ chatStatus: "Invalid room code, must be 8 characters!" });
            this.working = false;
            return;
        }

        //Say that we're trying to create a chatroom
        this.setState({ chatStatus: `Creating Chatroom "${code}"` });

        //make a create room request to the api
        let roomData = await fetch(
            `https://api.quilldev.tech/api/join-room?id=${code}`
        )
            .then(async (res) => {
                //if we fail to create a room, let us know
                if (res.status !== 200) {
                    return new Error(`Couldn't create room Error: [${res.status}]`);
                }

                return await res.json();
            })
            .catch();

        if (roomData === null) {
            this.setState({ chatStatus: `Room does not exist!` });
        } else if (roomData instanceof Error) {
            this.setState({
                chatStatus: `Error getting room: ${roomData.toString()}`,
            });
        } else {
            window.location.href = `../chat?roomCode=${roomData.code}`;
        }

        //set working to false
        this.working = false;
    }

    render() {
        return (
            <>
                <div className={"App"}>
                    <header className={"App-header-fix"}>
                        <div style={{ alignItems: "flex-start", flexDirection: "column" }}>
                            <div
                                style={{
                                    width: "100%",
                                    display: "inline-block",
                                    whiteSpace: "nowrap",
                                    paddingBottom: "20px",
                                    paddingTop: "10px",
                                    borderStyle: "solid",
                                    borderTop: "none",
                                    borderLeft: "none",
                                    borderRight: "none",
                                    fontSize: "40px",
                                    padding: "18px",
                                }}
                            >
                                <Form
                                    onSubmit={async (event) => {
                                        await this.submitForm(event);
                                    }}
                                >
                                    <Form.Group controlId="roomCode">
                                        <Form.Label style={{ display: "inline-block"}}>
                                            Enter Room Code:{" "}
                                        </Form.Label>
                                        <div
                                            style={{ paddingLeft: "15px", display: "inline-block" }}
                                        />
                                        <Form.Control
                                            style={{
                                                display: "inline-block",
                                                height: "60px",
                                                paddingTop: "10px",
                                                fontSize: "40px",
                                                width: "275px",
                                            }}
                                            name="roomCode"
                                            type="text"
                                            placeholder="Room Code"
                                        />
                                    </Form.Group>

                                </Form>
                                <p>{this.state.chatStatus}</p>
                                <div style={{ paddingTop: "25px" }} />
                                <Button
                                    variant="outline-light"
                                    className="create-button"
                                    onClick={() => (window.location.href = "../create-room")}
                                >
                                    Create New Room
                                </Button>
                            </div>
                            <p className="public-text" style={{marginTop:".5em"}}>Public Chat Rooms</p>
                            <Container className="public">
                                <Row>
                                    <Col as="button" className="public-button" onClick={() => this.joinRoom("MATHMATH")}>
                                        Math <FontAwesomeIcon icon={faCalculator}/>
                                    </Col>
                                    <Col as="button" className="public-button" onClick={() => this.joinRoom("PSCIENCE")}>
                                        Science <FontAwesomeIcon icon={faFlask}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col as="button" className="public-button" onClick={() => this.joinRoom("PENGLISH")}>
                                        English <FontAwesomeIcon icon={faPen}/>
                                    </Col>
                                    <Col as="button" className="public-button" onClick={() => this.joinRoom("SSTUDIES")}>
                                        Social Studies <FontAwesomeIcon icon={faBook}/>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </header>
                </div>
            </>
        );
    }
}

export default Join;

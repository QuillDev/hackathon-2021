import {Component} from "react";
import Button from "react-bootstrap/Button";
import {Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./question.css";

class Question extends Component{
    checkboxEnabler() {
        document.getElementById("question4TextBox").disabled = "false";
    }

    render(){

        return(
            <div className={"App"}>
                <header className={"App-header"} style={{minHeight:"89%"}}>
                    <Modal class="modal" show={true}>
                        <Form>
                            <Modal.Header className="modalHeader">Create Question</Modal.Header>
                            <Modal.Body className="modalBody">
                                    <InputGroup size="sm" className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text required>Question: </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required/>
                                    </InputGroup>

                                    <InputGroup size="sm" className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Radio defaultChecked name="correctRadio" id="question1radio" aria-label="Radio button for following text input" />
                                            <InputGroup.Text>Option 1</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required id="question1"/>
                                    </InputGroup>

                                    <InputGroup size="sm" className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Radio name="correctRadio" id="question2radio" aria-label="Radio button for following text input" />
                                            <InputGroup.Text>Option 2</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required id="question2"/>
                                    </InputGroup>

                                    <InputGroup size="sm" className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Radio name="correctRadio" id="question3radio" aria-label="Radio button for following text input" />
                                            <InputGroup.Text>Option 3</InputGroup.Text></InputGroup.Prepend>
                                        <FormControl required id="question3"/>
                                    </InputGroup>

                                    <InputGroup size="sm" className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Radio name="correctRadio" id="question4radio" aria-label="Radio button for following text input" />
                                            <InputGroup.Text >Option 4</InputGroup.Text></InputGroup.Prepend>
                                        <FormControl required id="question4"/>
                                    </InputGroup>
                            </Modal.Body>
                            <Modal.Footer className="modalFooter">
                                <Button variant="danger">Go back</Button>
                                <Button variant="success">Send</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </header>
            </div>
        )
    }
}

export default Question;
import {Component} from "react";
import Button from "react-bootstrap/Button";
import {Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Question extends Component{
    render(){

        return(
            <div className={"App"}>
                <header className={"App-header"} style={{minHeight:"89%"}}>
                    <Modal show={true} style={{color:"black"} }>
                        <Modal.Header>Create Question</Modal.Header>
                        <Modal.Body>
                            <Form>
                                <InputGroup size="sm" className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox checked name="useQuestion" id="question1checkbox" aria-label="Checkbox for following text input" />
                                        <InputGroup.Radio name="correctRadio" id="question1radio" aria-label="Radio button for following text input" />
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                </InputGroup>

                                <InputGroup size="sm" className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox checked name="useQuestion" id="question2checkbox" aria-label="Checkbox for following text input" />
                                        <InputGroup.Radio name="correctRadio" id="question2radio" aria-label="Radio button for following text input" />
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                </InputGroup>

                                <InputGroup size="sm" className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox name="useQuestion" id="question3checkbox" aria-label="Checkbox for following text input" />
                                        <InputGroup.Radio name="correctRadio" id="question3radio" aria-label="Radio button for following text input" />
                                    </InputGroup.Prepend>
                                    <FormControl id="question3TextBox" disabled="true" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                </InputGroup>

                                <InputGroup size="sm" className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox name="useQuestion" id="question4checkbox" ria-label="Checkbox for following text input" />
                                        <InputGroup.Radio name="correctRadio" id="question4radio" aria-label="Radio button for following text input" />
                                    </InputGroup.Prepend>
                                    <FormControl id="question4TextBox" disabled="true" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                </InputGroup>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>This is the footer</Modal.Footer>
                    </Modal>
                </header>
            </div>
        )
    }
}

export default Question;
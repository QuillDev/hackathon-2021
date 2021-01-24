import {Component} from "react";
import Question from "../Question";

class ModalTest extends Component{

    constructor(props) {
        super(props);
        this.state = {
            "showQuizz": false
        }
    }
    render() {
        return (
            <div>
                <Question showModal={true}/>
            </div>
        );
    }
}

export default ModalTest;
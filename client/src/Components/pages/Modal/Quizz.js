import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import {Component} from "react";

export class Quizz extends Component {

    constructor(props) {
        super(props);
            this.onOpenModal = this.onOpenModal.bind(this);
            this.onCloseModal = this.onCloseModal.bind(this);

            this.state = {
                open: false
            };
    }

    onOpenModal(){
        this.setState({open: this.props.openModal});
    }

    onCloseModal() {
        this.setState({open: false});
    }

    render() {
        const bstyle = {
            backgroundColor: 'green',
            textAlign:"left",
            paddingLeft: '0px',
            color: 'white'
        };
        const {open} = this.state;
        return (
            <div>
                <Modal open={open} onClose={this.onCloseModal} little>
                    <h1>TEST</h1>
                    <Button bsStyle="success" bsSize="small" onClick ={(ev) => {console.log(ev)} }> Save </Button>
                </Modal>
            </div>
        );
    }
}
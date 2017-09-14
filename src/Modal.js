import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const buttonFloatRightStyles = {
    float: 'right'
}

export default class ModalBox extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { open: false };

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }
    
    closeModal() { this.setState({ open: false }) }
    openModal() { this.setState({ open: true }) }

    render() {
        return (
        <div>
            <button onClick={this.openModal} style={buttonFloatRightStyles}>
                Configure Roundups
            </button>

            <Modal
              show={this.state.open}
              onHide={this.closeModal}
              aria-labelledby="ModalHeader">
            <Modal.Header closeButton>
                <Modal.Title id='ModalHeader'>Roundup Configuration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Some Content here</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.closeModal} className='btn btn-default'>Close</Button>
            </Modal.Footer>
            </Modal>
        </div>
        )
    }
}
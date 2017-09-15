import React from 'react';
import { Modal, Button, ControlLabel, FormControl } from 'react-bootstrap';

const buttonFloatRightStyles = {
    float: 'right',
}

export default class ModalBox extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { open: false, roundupValue: this.props.submitAsTransaction ? 15.50 : (localStorage.getItem("roundup") || 1 )};

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.saveAndClose = this.saveAndClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    closeModal() { this.setState({ open: false }); }
    openModal() { this.setState({ open: true }); }
    saveAndClose() { 
        localStorage.setItem(this.props.localStorageVal, this.state.roundupValue); 
        if (this.props.submitAsTransaction) {


            var exampleTransaction = {
                        "type": "transfer",
                        "attributes": {
                            "amount": parseFloat(this.state.roundupValue),
                            "memo": "Tasty Lunch"
                        },
                        "relationships": {
                            "fromAccount" : {
                                data: {
                                    "type": "account",
                                    "id": "28f615b0-9957-11e7-8883-413f540e4781"
                                }
                            },
                            "toAccount": {
                                data: {
                                    "type": "account",
                                    "id": "37d6fbd0-9957-11e7-8883-413f540e4781"
                                }
                            }

                        }
                    };

            // Make jQuery request to rest API create transaction
            fetch('https://api.sunhack.suncorp.com.au/bank/transfers', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': 'A3XDgfMQm78cEB86wS6B8a1WWMVbcofQ5Iu5k3DH',
                    'x-customer-id': '1589631e-2625-4832-a09c-e64eceecb132'
                },
                body: JSON.stringify({
                    data: exampleTransaction
                })
            })
            var exampleRoundup = exampleTransaction;
            exampleRoundup.attributes.memo = "Roundup!";
            exampleRoundup.attributes.amount = (Math.ceil(parseFloat(this.state.roundupValue) / parseFloat(localStorage.getItem("roundup"))) * parseFloat(localStorage.getItem("roundup"))) - parseFloat(this.state.roundupValue);
            fetch('https://api.sunhack.suncorp.com.au/bank/transfers', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': 'A3XDgfMQm78cEB86wS6B8a1WWMVbcofQ5Iu5k3DH',
                    'x-customer-id': '1589631e-2625-4832-a09c-e64eceecb132'
                },
                body: JSON.stringify({
                    data: exampleRoundup
                })
            })
        }
        this.setState({ open: false }); }

    handleChange(e) { this.setState({ roundupValue: e.target.value } ); }

    renderedFormInput() {
        
        const accountFormInputStyles = {
            marginTop: "20px"
        }

        if (!this.props.submitAsTransaction) {
            return <div style={ accountFormInputStyles }>
                    <ControlLabel>Account to send roundups to:</ControlLabel>
                    <FormControl disabled
                        type="text"
                        value="Insurance Premium"
                    />
                </div>;
        } else {
            return "";
        }
    }

    render() {
        return (
        <div>
            <Button bsStyle="primary" onClick={this.openModal} style={buttonFloatRightStyles}>
                {this.props.buttonLabel}
            </Button>

            <Modal
              show={this.state.open}
              onHide={this.closeModal}
              aria-labelledby="ModalHeader">
            <Modal.Header closeButton>
                <Modal.Title id='ModalHeader'>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ControlLabel>{this.props.formLabel}</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.roundupValue}
                    onChange={this.handleChange}
                />
                {this.renderedFormInput()}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.closeModal} className='btn btn-default'>Close</Button>
            
                <Button className='btn btn-primary' onClick={this.saveAndClose}>
                    Save
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
        )
    }
}
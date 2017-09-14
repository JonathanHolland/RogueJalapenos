import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const userImageStyles = {
   borderRadius: '50%',
   width: '100px',
   height: '100px',
   margin: 'auto',
   marginTop: '40px',
   marginBottom: '40px',
   display: 'block'
}

const accountButtonGroupStyles = {
    marginTop: '100px'
}

export default class SideBarContent extends Component {
    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
                <img style={userImageStyles} src="https://static.pexels.com/photos/61100/pexels-photo-61100.jpeg" alt="user's face"/>
                <h3>Hey Sarah!</h3>
                <ButtonGroup vertical block className="AccountDiv" style={accountButtonGroupStyles}>
                    <Button bsSize="large" bsStyle="primary">Everyday Options</Button>
                    <Button bsSize="large">Insurance Premium</Button>
                </ButtonGroup>
            </div>
        );
    }
}
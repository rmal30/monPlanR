import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react';

export default class ConfirmDeleteTeachingPeriod extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };

        this.handlePress = this.handlePress.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handlePress() {
        this.setState({ open: true});
    }

    handleCancel() {
        console.log("cancelled")
    }

    handleConfirm() {
        console.log("cancelled")
    }

    render() {
        return (
            <div>
                <Button basic className="no-print" floated="right" onClick={this.handlePress} size="tiny" color="red" icon="close" />
                <Confirm
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm} />
            </div>
        );
    }
}

// <Button basic className="no-print" floated="right" onClick={props.deleteTeachingPeriod.bind(null, props.index)} size="tiny" color="red" icon="close" />

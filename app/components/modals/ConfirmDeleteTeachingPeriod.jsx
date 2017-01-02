import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react';

export default class ConfirmDeleteTeachingPeriod extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            units: props.units,
            unitArray: []
        };

        this.handlePress = this.handlePress.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handlePress() {
        let unitArray = [];
        for (var i=0; i < this.state.units.length; i++) {
            var item = this.state.units[i];
            if (item !== null) {
                unitArray.push(item.UnitCode)
            }
        }

        if (unitArray.length === 0) {
            this.props.onDeletePress();
        } else {
            this.setState({ 
                open: true,
                unitArray: unitArray
            });
        }
        

    }

    handleCancel() {
        this.setState({ open: false });
    }

    handleConfirm() {
        this.setState({ open: false });
        this.props.onDeletePress();
    }

    render() {
        const message = <div>
                            <p>Deleting this teaching period will remove the following units from your course plan:</p>
                            <ul>{this.state.unitArray.map(function(item) {return <li>{item}</li>})}</ul>
                        </div>
        if (this.state.open) {
            return (
                <Confirm
                    header="Are you sure you want to delete teaching period?"
                    content={message}
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm} />
            );
        } else {
            return (
                <Button basic className="no-print" floated="right" onClick={this.handlePress} size="tiny" color="red" icon="close" />
            );
        }
    }
}

// <Button basic className="no-print" floated="right" onClick={props.deleteTeachingPeriod.bind(null, props.index)} size="tiny" color="red" icon="close" />

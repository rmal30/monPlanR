import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react';


/**
 * @author JXNS
 * @param {array} units - The unit object array used in the teaching period, this is necessary to know what units a teaching period contains
 * @param {array} unitArray - The array of unitcode strings that is extracted from the unit array
 */
export default class ConfirmDeleteTeachingPeriod extends Component {
    
    /**
     * Sets up initial state and binds the functions
     */
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

    /**
     * handles the initial pressing of the remove button. It then processes the current unit array. If the unit array is empty, 
     * then it can jump straight to deleting the teaching period, however, if there are units in the array, then the confirmation modal 
     * is triggered to open
     */
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

    /**
     * If the user selects cancel, nothing happens and the modal closes
     */
    handleCancel() {
        this.setState({ open: false });
    }

    /**
     * If the user presses confirm, the modal closes and the delete action is carried out by parent component
     */
    handleConfirm() {
        this.setState({ open: false });
        this.props.onDeletePress();
    }

    /**
     * on render we process the message that will be shown in the confirmation popup, if the state is set to open then we show the 
     * modal, otherwise we just show the plain remove button
     */
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

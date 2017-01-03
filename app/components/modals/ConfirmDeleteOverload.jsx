import React, { Component, PropTypes } from "react";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";


/**
 * @author JXNS
 * @param {boolean} isDisabled - parent component controls when the button should be disabled
 * @param {function} getAffectedUnits - parent component calculates all units that would be affected by the remove and returns them in an array
 * @param {function} handleRemove - when user confirms deletion, this function is called to handle the removal of overload column
 */
export default class ConfirmDeleteOverload extends Component {
    
    /**
     * sets up start values, modal should not be opened at start and unitArray is empty
     */
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            unitArray: []
        };

        this.handlePress = this.handlePress.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    /**
     * When the user presses the remove button, the parent calculates what (if any) units will be affected and returns them in an array.
     * If the array is empty, the parent can safely remove, if the array has values, then the confirm modal is displayed
     */
    handlePress() {
        let unitArray = this.props.getAffectedUnits();
        if (unitArray.length === 0) {
            this.props.handleRemove();
        } else {
            this.setState({
                open: true,
                unitArray: unitArray
            });
        }
    }

    /**
     * The modal closes and the overload column is not affected if user presses cancel
     */
    handleCancel() {
        this.setState({ open: false });
    }

    /**
     * user confirms, the modal is closed and parents handles removal.
     */
    handleConfirm() {
        this.setState({ open: false });
        this.props.handleRemove();
    }

    /**
     * Construct list of affected items in message for modal, if the modal is not open then show a button
     */
    render() {
        const message = (<div>
                            <p>Removing this overload column will delete the following units from your course plan:</p>
                            <ul>{this.state.unitArray.map((item) => {return (<li key={item}>{item}</li>);})}</ul>
                        </div>);
        if (this.state.open) {
            return (
                <Confirm
                    header={<p><Icon name="trash" />Are you sure you want to remove overload column?</p>}
                    content={message}
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm} />
            );
        } else {
            return (
                <Popup
                    trigger={<Button icon className="no-print" disabled={this.props.isDisabled}  onClick={this.handlePress} color="red" floated="right"> <Icon name='minus' /></Button>}
                    content="Removes last column from your course plan."
                    size='mini'
                    positioning='bottom center'
                />
            );
        }
    }
}


ConfirmDeleteOverload.propTypes = {
    isDisabled: PropTypes.bool,
    getAffectedUnits: PropTypes.func,
    handleRemove: PropTypes.func

};

import React, { Component, PropTypes } from "react";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";


/**
 * 
 */
export default class ConfirmDeleteOverload extends Component {
    
    /**
     * 
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
     * n
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
     * 
     */
    handleCancel() {
        this.setState({ open: false });
    }

    /**
     *
     */
    handleConfirm() {
        this.setState({ open: false });
        this.props.handleRemove();
    }

    /**
     * 
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
    units: PropTypes.array,
    isDisabled: PropTypes.bool,
    getAffectedUnits: PropTypes.func,
    handleRemove: PropTypes.func

};

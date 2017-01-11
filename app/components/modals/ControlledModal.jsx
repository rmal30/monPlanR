import React, { Component, PropTypes } from "react";
import { Modal } from "semantic-ui-react";

/**
 * ControlledModal adds the option of a trigger element which upon clicked, will
 * close it.
 */
class ControlledModal extends Component {
    /**
     * A boolean value is used to indicate to Semantic UI whether or not to
     * show the modal.
     */
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: !!props.defaultOpen
        };
    }

    /**
     * Displays the modal
     */
    handleOpen() {
        this.setState({
            modalOpen: true
        });
    }

    /**
     * Hides the modal
     */
    handleClose() {
        this.setState({
            modalOpen: false
        });

        if(this.props.onClose) {
            this.props.onClose();
        }
    }

    /**
     * Renders a Modal with custom children for body of Modal, and Modal.Actions
     * is used to display the close trigger element.
     */
    render() {
        let trigger;

        if(this.props.openTrigger) {
            trigger = React.cloneElement(this.props.openTrigger, {onClick: this.handleOpen.bind(this)});
        } else {
            trigger = undefined;
        }

        const closeButton = React.cloneElement(this.props.closeTrigger, {onClick: this.handleClose.bind(this)});

        return (
            <Modal trigger={trigger}
                   open={this.state.modalOpen}
                   onClose={this.handleClose.bind(this)}>
                {this.props.children}
                <Modal.Actions>
                    {this.props.positiveButton}
                    {closeButton}
                </Modal.Actions>
            </Modal>
        );
    }
}

ControlledModal.propTypes = {
    openTrigger: PropTypes.element,
    closeTrigger: PropTypes.element.isRequired,
    positiveButton: PropTypes.element,
    defaultOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node
};

export default ControlledModal;

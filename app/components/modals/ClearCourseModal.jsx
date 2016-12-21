import React, { Component, PropTypes } from "react";
import { Button, Icon, Input, Modal } from "semantic-ui-react";

/**
* A modal used specifically for students who wish to clear their course.
*/
class ClearCourseModal extends Component {
    /**
     * A boolean value in the state is used to keep track on whether or not
     * to show the modal, and another boolean is used to disable the confirm
     * clear course button.
     */
    constructor() {
        super();
        this.state = {
            modalOpen: false,
            disabled: true
        };
    }

    /**
     * Checks if string in input tag is "clear", and if so, enables the confirm
     * clear course button.
     */
    handleChange(e) {
        if(e.target.value === "clear" || e.target.value === "Clear") {
            this.setState({disabled:false});
        } else {
            this.setState({disabled:true});
        }
    }

    /**
     * Opens the modal
     */
    handleOpen() {
        this.setState({
            modalOpen: true
        });
    }

    /**
     * Closes the modal
     */
    handleClose() {
        this.setState({
            modalOpen: false,
            disabled: true
        });
    }

    /**
     * Clears the course and then closes the modal.
     */
    handleClick() {
        this.props.clearCourse();
        this.handleClose();
    }

    /**
     * Returns a Modal asking the user if they really want to clear their course
     * plan.
     *
     * @returns {ReactElement} Modal
     */
    render() {
        return (
            <Modal trigger={<Button className="no-print" fluid={this.props.fluid} color="red" onClick={this.handleOpen.bind(this)}>Clear course</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}>
                <Modal.Header>
                    <Icon name="trash" /> Clear Course
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>To clear course, type "clear" into the input box. After doing this, click "Clear Course" and your course
                        structure will be cleared.</p>
                    <Input onChange={this.handleChange.bind(this)} />
                    </Modal.Description>
                </Modal.Content>

                <Modal.Actions>
                    <Button color='red' disabled={this.state.disabled} floated={"left"} onClick={this.handleClick.bind(this)}>Clear Course</Button>
                    <Button onClick={this.handleClose.bind(this)}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

ClearCourseModal.propTypes = {
    clearCourse: PropTypes.func.isRequired,
    fluid: PropTypes.bool
};


export default ClearCourseModal;

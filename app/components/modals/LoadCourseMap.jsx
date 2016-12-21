import React, { Component, PropTypes } from "react";
import { Button, Icon, Input, Modal } from "semantic-ui-react";

/**
* A modal used specifically for students who wish to clear their course.
*/
class LoadCourseMap extends Component {
    /**
     * Holds states
     * courseCode - the Code to Be Found.
     */
    constructor() {
        super();
        this.state = {
            courseCode: null
        };
    }

    /**
     * Checks if string in input tag is "clear", and if so, enables the confirm
     * clear course button.
     */
    handleChange(e) {

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
            <Modal trigger={<Button className="no-print" color="red" onClick={this.handleOpen.bind(this)}>Clear course</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}>
                <Modal.Header>
                    <Icon name="" /> Find Course
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>To load a course map, enter your course name and it will automatically load up a template for you</p>
                    <Input />
                    </Modal.Description>
                </Modal.Content>

                <Modal.Actions>
                    <Button onClick={this.handleClose.bind(this)}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

LoadCourseMap.propTypes = {
    CourseCode: PropTypes.func.isRequired,
};


export default LoadCourseMap;

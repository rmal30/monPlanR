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
            CourseCode: null
        };
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

    handleChange(e){
        this.setState({
            CourseCode: e.target.value
        });
    }

    /**
     * Returns a Modal asking the user if they really want to clear their course
     * plan.
     *
     * @returns {ReactElement} Modal
     */
    render() {
        return (
            <Modal trigger={<Button className="no-print" color="green" onClick={this.handleOpen.bind(this)}>Load Course Map</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}>
                <Modal.Header>
                    <Icon name="external square" /> Load Course Map
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>To load a course map, enter your course name and it will automatically load up a template for you</p>
                    <Input onChange={this.handleChange.bind(this)} label="Find a course" />
                    </Modal.Description>
                </Modal.Content>

                <Modal.Actions>
                    <Button color="green">Go</Button>
                    <Button onClick={this.handleClose.bind(this)}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

LoadCourseMap.propTypes = {
    CourseCode: PropTypes.func.isRequired
};

export default LoadCourseMap;

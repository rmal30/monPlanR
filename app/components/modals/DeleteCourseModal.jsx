import React, { Component } from "react";
import { Button, Header, Icon, Input, Modal } from "semantic-ui-react";

/**
* A modal used specifically for students who wish to delete their course.
*/
class DeleteCourseModal extends Component {
    constructor() {
        super();
        this.state = {modalOpen: false};
    }

    handleChange(e) {
        if(this.props.deleteCourse(e.target.value)) {
            this.handleClose();
        }
    }

    handleOpen() {
        this.setState({
            modalOpen: true
        });
    }
    handleClose() {
        console.log("blah");
        this.setState({
            modalOpen: false
        });
    }
    render() {
        return (
            <Modal trigger={<Button color="red" onClick={this.handleOpen.bind(this)}>Clear course</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}>
                <Modal.Header>
                    <Icon name="trash" /> Clear Course
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>To clear course, type "clear" into the input box. After doing this, your course
                        structure will be cleared, and this popup will disappear.</p>
                        <Input onChange={this.handleChange.bind(this)} />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.handleClose.bind(this)}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        );
    }
};

export default DeleteCourseModal;

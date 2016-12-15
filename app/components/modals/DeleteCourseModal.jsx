import React, { Component } from "react";
import { Button, Header, Icon, Input, Modal } from "semantic-ui-react";

/**
* A modal used specifically for students who wish to delete their course.
*/
class DeleteCourseModal extends Component {
    constructor() {
        super();
        this.state = {
            modalOpen: false,
            disabled: true
        };
    }

    handleChange(e) {
        if(this.props.deleteCourse(e.target.value)) {
            this.setState({disabled:false});
        }
    }

    handleOpen() {
        this.setState({
            modalOpen: true
        });
    }
    handleClose() {
        this.setState({
            modalOpen: false,
            disabled: true
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
                        <p>To clear course, type "clear" into the input box. After doing this, click "Clear Course" and your course
                        structure will be cleared.</p>
                        <Input onChange={this.handleChange.bind(this)} />
                    </Modal.Description>
                </Modal.Content>
                
                <Modal.Actions>
                    <Button color='red' disabled={this.state.disabled} floated={"left"} onClick={this.handleClose.bind(this)}>Clear Course</Button>
                    <Button danger onClick={this.handleClose.bind(this)}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        );
    }
};

export default DeleteCourseModal;

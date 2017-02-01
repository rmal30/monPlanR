import React, { Component, PropTypes } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { Link } from "react-router";
/**
 * A modal used specifically for students who wish to clear their course.
 *
 * @author Saurabh Joshi, JXNS
 * @param {func} clearCourse - Method used when user confirms that they want
 * to clear their course. This function should clear the course upon call.
 * @param {bool} disabled - Disables the "Clear course" button before the user
 * reaches the confirmation modal. Useful if course has already been cleared.
 * @param {bool} fluid - Whether or not to set 100% width to the "Clear course"
 * button in the course structure screen (and not the modal).
 * @param {string} redirect - Used to indicate whether a component should re-route to a certain path once cleared, if it is defined the clear course
 * button will reroute there
 * @param {string} floated - Used if you want the button to float to left or right
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
     * Focus on input once component is displayed.
     */
    componentDidUpdate(prevProps, prevState) {
        if(!prevState.modalOpen && this.state.modalOpen) {
            this.input.focus();
        }
    }

    /**
     * Checks if string in input tag is "clear", and if so, enables the confirm
     * clear course button.
     *
     * @param {SyntheticEvent} e
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
     * Clears the course and then closes the modal.
     */
    handleEnterPress(e) {
        if(e.keyCode === 13 && !this.state.disabled){
            this.props.clearCourse();
            this.handleClose();
            if(this.props.redirect){
                this.context.router.push({
                    pathname: this.props.redirect
                });
            }
        }
    }

    /**
     * Returns a Modal asking the user if they really want to clear their course
     * plan.
     *
     * @return {Modal}
     */
    render() {
        let trigger;

        if(this.props.trigger) {
            trigger = React.cloneElement(this.props.trigger, {onClick: this.handleOpen.bind(this)});
        } else {
            trigger = undefined;
        }
        return (
            <Modal
                trigger={trigger}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}>
                <Modal.Header>
                    <Icon name="trash" /> Clear plan
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>
                            To clear course, type "clear" into the input box.
                            After doing this, click "Clear Course" and your
                            course plan will be cleared.
                        </p>
                        <div className="ui input">
                            <input
                                type="text"
                                ref={input => this.input = input}
                                onChange={this.handleChange.bind(this)}
                                onKeyDown={this.handleEnterPress.bind(this)} />
                        </div>
                    </Modal.Description>
                </Modal.Content>

                <Modal.Actions>
                    {this.props.redirect ? <Link to={this.props.redirect}><Button color="red" disabled={this.state.disabled} floated="right" onClick={this.handleClick.bind(this)}>Clear Course</Button></Link>
                                         : <Button color="red" disabled={this.state.disabled} floated="right" onClick={this.handleClick.bind(this)}>Clear Course</Button> }
                    <Button onClick={this.handleClose.bind(this)}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

ClearCourseModal.propTypes = {
    clearCourse: PropTypes.func.isRequired,
    redirect: PropTypes.string,
    trigger: PropTypes.node.isRequired
};

ClearCourseModal.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ClearCourseModal;

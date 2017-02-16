import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Container, Form, Select, Modal, Icon } from "semantic-ui-react";

import UnitMessage from "../Unit/UnitMessage.jsx";
import * as dataFetchActions from "../../actions/DataFetchActions";
import * as UIActions from "../../actions/UIActions";
import * as CourseActions from "../../actions/CourseActions";

/**
 * The custom unit modal that allows students to enter in units manually if our web
 * app does not have it in our API.
 *
 * @author Saurabh Joshi
 */
class CustomUnitModal extends Component {
    /**
     * Holds user input in the state, and options in other instance attributes.
     */
    constructor(props) {
        super(props);

        this.defaultCreditPoints = 6;

        this.scaBandOptions = [
            {value: 1, text: "1 - Law, Dentistry, Medicine, Veterinary Science, Accounting, Commerce, Administration, Economics"},
            {value: 2, text: "2 - Computing, Built Environment, Health, Engineering, Surveying, Agriculture, Mathematics, Statistics, Science"},
            {value: 3, text: "3 - Humanities, Behavioural Science, Social Studies, Clinical Psychology, Foreign Languages, Visual and Performing Arts, Education, Nursing"},
        ];

        this.facultyOptions = [
            {text: "Art, Design and Architecture", value: "Art, Design and Architecture"},
            {text: "Arts", value: "Arts"},
            {text: "Business and Economics", value: "Business and Economics"},
            {text: "Education", value: "Education"},
            {text: "Engineering", value: "Engineering"},
            {text: "Information Technology", value: "Information Technology"},
            {text: "Law", value: "Law"},
            {text: "Science", value: "Science"},
            {text: "Medicine, Nursing and Health Sciences", value: "Medicine, Nursing and Health Sciences"},
            {text: "Pharmacy and Pharmaceutical Sciences", value: "Pharmacy and Pharmaceutical Sciences"}
        ];

        this.state = {
            unitCode: this.props.unitCode && this.props.unitCode.toUpperCase(),
            unitName: "",
            faculty: "",
            scaBand: 0,
            creditPoints: this.defaultCreditPoints,
            custom: true
        };
    }

    /**
     * When modal opens from a closed state, populate unit code from the props
     * into the state.
     */
    componentWillReceiveProps(nextProps) {
        if(!this.props.open && nextProps.open) {
            this.setState({
                unitCode: nextProps.unitCode && nextProps.unitCode.toUpperCase()
            });
        }
    }

    /**
     * Focus on first input when modal is opened.
     */
    componentDidUpdate(prevProps) {
        if(!prevProps.open && this.props.open && this.startingInput) {
            this.startingInput.focus();
        }
    }

    /**
     * Set value of unit code field to state
     *
     * @author Saurabh Joshi
     */
    onunitCodeChange(e) {
        this.setState({
            unitCode: e.target.value.toUpperCase() || this.props.unitCode
        });
    }

    /**
     * Set value of unit name field to state
     *
     * @author Saurabh Joshi
     */
    onunitNameChange(e) {
        this.setState({
            unitName: e.target.value
        });
    }

    /**
     * Set value of credit points field to state
     *
     * @author Saurabh Joshi
     */
    oncreditPointsChange(e) {
        this.setState({
            creditPoints: parseInt(e.target.value) || 6
        });
    }

    /**
     * Set value of SCA Band field to state
     *
     * @author Saurabh Joshi
     */
    onscaBandChange(e, { value }) {
        this.setState({
            scaBand: parseInt(value) || 0
        });
    }

    /**
     * Set value of faculty field to state
     *
     * @author Saurabh Joshi
     */
    onfacultyChange(e, { value }) {
        this.setState({
            faculty: "faculty of " + value
        });
    }

    /**
     * Validates form
     *
     * @return {bool} valid
     */
    formIsValid() {
        const { unitCode, unitName, creditPoints, scaBand, faculty } = this.state;
        return unitCode && unitName && !isNaN(creditPoints) && !isNaN(scaBand) && scaBand && faculty;
    }

    /**
     * Renders a controlled modal holding form elements and a preview component.
     * @returns {ReactElement} ControlledModal
     */
    render() {
        const { unitCode, unitName, faculty } = this.state;

        return (
            <Modal
                open={this.props.open}
                onClose={() => this.props.hideCustomUnitUI()}>
                <Modal.Header className="header-primary">
                    <Icon name="write" />
                    Create custom unit
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>
                            Please fill in the following details before adding {unitCode}.
                        </p>
                        <Form>
                            <Form.Group widths="equal">
                                <div className="field">
                                    <label>Unit code:</label>
                                    <div className="ui input">
                                        <input
                                            onBlur={this.handleBlur}
                                            ref={startingInput => this.startingInput = startingInput}
                                            tabIndex={1}
                                            onChange={this.onunitCodeChange.bind(this)}
                                            placeholder={this.props.unitCode && this.props.unitCode.toUpperCase()} />
                                    </div>
                                </div>
                                <Form.Input tabIndex={2} onChange={this.onunitNameChange.bind(this)} label="Unit name:" />
                                <Form.Input tabIndex={3} onChange={this.oncreditPointsChange.bind(this)} label="Credit points:" placeholder={this.defaultCreditPoints} />
                            </Form.Group>
                            <Form.Field tabIndex={4} selectOnBlur onChange={this.onscaBandChange.bind(this)} label="SCA Band:" control={Select} search options={this.scaBandOptions} />
                            <Form.Field tabIndex={5} onChange={this.onfacultyChange.bind(this)} label="Faculty:" control={Select} search options={this.facultyOptions} />
                            <Container className="field preview">
                                <label>Preview:</label>
                                <UnitMessage
                                    width={200}
                                    showDetailButton
                                    basic
                                    viewOnly
                                    code={unitCode}
                                    name={unitName}
                                    faculty={faculty}
                                    />
                            </Container>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        tabIndex={7}
                        content="Cancel"
                        className="btncancel"
                        onClick={() => this.props.hideCustomUnitUI()} />
                    <Button
                        tabIndex={6}
                        disabled={!this.formIsValid.call(this)}
                        color="yellow"
                        className="btnmainblue"
                        onClick={() => {
                            if(typeof this.props.customTpIndex === "number" && typeof this.props.customUnitIndex === "number") {
                                this.props.addUnit(this.props.customTpIndex, this.props.customUnitIndex, this.state);
                            } else {
                                this.props.willAddUnit(unitCode, this.state);
                            }

                            this.props.hideCustomUnitUI();
                        }}
                        floated="right">
                            Add {unitCode}
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

CustomUnitModal.propTypes = {
    unitCode: PropTypes.string,
    position: PropTypes.array,
    open: PropTypes.bool,
    hideCustomUnitUI: PropTypes.func,
    willAddUnit: PropTypes.func,
    addUnit: PropTypes.func,

    /* For custom units that have been dragged onto the course plan */
    customTpIndex: PropTypes.number,
    customUnitIndex: PropTypes.number
};

/**
 * Tell custom unit modal whether to show or not.
 */
const mapStateToProps = state => {
    return {
        open: state.UI.showingCustomUnitModal,
        unitCode: state.UI.customUnitCode,
        customTpIndex: state.UI.customTpIndex,
        customUnitIndex: state.UI.customUnitIndex
    };
};

/**
 * Inject UI actions to allow users to hide the modal.
 */
const mapDispatchToProps = dispatch => {
    return bindActionCreators({...dataFetchActions, ...UIActions, ...CourseActions}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomUnitModal);

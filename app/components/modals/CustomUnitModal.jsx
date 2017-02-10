import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Container, Form, Select, Modal, Icon } from "semantic-ui-react";

import UnitMessage from "../Unit/UnitMessage.jsx";
import CostCalc from "../../utils/CostCalc.js";
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
            UnitCode: this.props.UnitCode && this.props.UnitCode.toUpperCase(),
            UnitName: "",
            Faculty: "",
            SCABand: 0,
            CreditPoints: this.defaultCreditPoints,
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
                UnitCode: nextProps.UnitCode && nextProps.UnitCode.toUpperCase()
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
    onUnitCodeChange(e) {
        this.setState({
            UnitCode: e.target.value.toUpperCase() || this.props.UnitCode
        });
    }

    /**
     * Set value of unit name field to state
     *
     * @author Saurabh Joshi
     */
    onUnitNameChange(e) {
        this.setState({
            UnitName: e.target.value
        });
    }

    /**
     * Set value of credit points field to state
     *
     * @author Saurabh Joshi
     */
    onCreditPointsChange(e) {
        this.setState({
            CreditPoints: parseInt(e.target.value) || 6
        });
    }

    /**
     * Set value of SCA Band field to state
     *
     * @author Saurabh Joshi
     */
    onSCABandChange(e, { value }) {
        this.setState({
            SCABand: parseInt(value) || 0
        });
    }

    /**
     * Set value of Faculty field to state
     *
     * @author Saurabh Joshi
     */
    onFacultyChange(e, { value }) {
        this.setState({
            Faculty: "Faculty of " + value
        });
    }

    /**
     * Validates form
     *
     * @return {bool} valid
     */
    formIsValid() {
        const { UnitCode, UnitName, CreditPoints, SCABand, Faculty } = this.state;
        return UnitCode && UnitName && !isNaN(CreditPoints) && !isNaN(SCABand) && SCABand && Faculty;
    }

    /**
     * Allows user to add their custom unit to their course plan.
     */
    addCustomUnitToCourse() {
        const { SCABand, CreditPoints } = this.state;

        this.props.addCustomUnitToCourse({
            ...this.state,
            Cost: CostCalc.calculateCost(SCABand, CreditPoints),
            position: this.props.position
        });
    }

    /**
     * Handles
     */
    handleBlur(e, { value }) {
        if(typeof e.target.value === "string" && e.target.value.trim() === "" || value && value.trim() === "") {
            alert("Please fill");
        }
    }

    /**
     * Renders a controlled modal holding form elements and a preview component.
     * @returns {ReactElement} ControlledModal
     */
    render() {
        const { UnitCode, UnitName, Faculty } = this.state;

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
                            Please fill in the following details before adding {UnitCode}.
                        </p>
                        <Form>
                            <Form.Group widths="equal">
                                <div className="field">
                                    <label>Unit code</label>
                                    <div className="ui input">
                                        <input
                                            onBlur={this.handleBlur}
                                            ref={startingInput => this.startingInput = startingInput}
                                            tabIndex={1}
                                            onChange={this.onUnitCodeChange.bind(this)}
                                            placeholder={this.props.UnitCode && this.props.UnitCode.toUpperCase()} />
                                    </div>
                                </div>
                                <Form.Input onBlur={this.handleBlur} tabIndex={2} onChange={this.onUnitNameChange.bind(this)} label="Unit name" />
                                <Form.Input onBlur={this.handleBlur} tabIndex={3} onChange={this.onCreditPointsChange.bind(this)} label="Credit points" placeholder={this.defaultCreditPoints} />
                            </Form.Group>
                            <Form.Field onBlur={this.handleBlur} tabIndex={4} selectOnBlur onChange={this.onSCABandChange.bind(this)} label="SCA Band" control={Select} search options={this.scaBandOptions} />
                            <Form.Field onBlur={this.handleBlur} tabIndex={5} onChange={this.onFacultyChange.bind(this)} label="Faculty" control={Select} search options={this.facultyOptions} />
                            <Container className="field preview">
                                <label>Preview:</label>
                                <UnitMessage
                                    width={200}
                                    showDetailButton
                                    basic
                                    viewOnly
                                    code={UnitCode}
                                    name={UnitName}
                                    faculty={Faculty}
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
                                this.props.willAddUnit(UnitCode, this.state);
                            }

                            this.props.hideCustomUnitUI();
                        }}
                        floated="right">
                            Add {UnitCode}
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

CustomUnitModal.propTypes = {
    UnitCode: PropTypes.string,
    addCustomUnitToCourse: PropTypes.func.isRequired,
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
        UnitCode: state.UI.customUnitCode,
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

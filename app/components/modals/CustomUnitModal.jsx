import React, { Component, PropTypes } from "react";
import { Button, Form, Select, Modal } from "semantic-ui-react";

import UnitInfo from "../Unit/UnitInfo.jsx";
import ControlledModal from "./ControlledModal.jsx";
import CostCalc from "../../utils/CostCalc.js";

/**
 * The custom unit modal that allows students to enter in units manually if our web
 * app does not have it in our API.
 *
 * @author Saurabh Joshi
 */
class CustomUnitModal extends Component {
    constructor(props) {
        super(props);

        this.defaultCreditPoints = 6;

        this.scaBandOptions = [
            {value: 1, text: "1"},
            {value: 2, text: "2"},
            {value: 3, text: "3"},
        ];

        this.facultyOptions = [
            {text: "Art, Design and Architecture", value: "Art, Design and Architecture"},
            {text: "Arts", value: "Arts"},
            {text: "Business and Economics", value: "Business and Economics"},
            {text: "Education", value: "Education"},
            {text: "Engineering", value: "Engineering"},
            {text: "Information Technology", value: "Information Technology"},
            {text: "Law", value: "Law"},
            {text: "Medicine, Nursing and Health Sciences", value: "Medicine, Nursing and Health Sciences"},
            {text: "Pharmacy and Pharmaceutical Sciences", value: "Pharmacy and Pharmaceutical Sciences"},
            {text: "Science", value: "Science"}
        ];

        this.state = {
            UnitCode: this.props.UnitCode, // TODO: find some better way of doing this
            UnitName: "",
            Faculty: "",
            SCABand: 0,
            creditPoints: this.defaultCreditPoints
        };
    }

    /**
     * Set value of unit code field to state
     *
     * @author Saurabh Joshi
     */
    onUnitCodeChange(e) {
        this.setState({
            UnitCode: e.target.value || this.props.UnitCode
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
            creditPoints: parseInt(e.target.value) || 6
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
            Faculty: value
        });
    }

    /**
     * Validates form
     *
     * @return {bool} valid
     */
    formIsValid() {
        const unitCodeRegularExpression = /^[A-Z]{3}[0-9]{4}$/;
        const { UnitCode, UnitName, creditPoints, SCABand, Faculty } = this.state;
        return unitCodeRegularExpression.test(UnitCode) && UnitName && !isNaN(creditPoints) && !isNaN(SCABand) && SCABand && Faculty;
    }

    /**
     * Reset state in plan component
     */
    onClose() {
        this.props.cancelAddingCustomUnitToCourse();
    }

    /**
     * Renders a controlled modal holding form elements and a preview component.
     * @returns {ReactElement} ControlledModal
     */
    render() {
        const { UnitCode, UnitName, Faculty, SCABand, creditPoints } = this.state;
        const closeTrigger = <Button content="Cancel" />;

        return (
            <ControlledModal
                defaultOpen
                onClose={this.onClose.bind(this)}
                closeTrigger={closeTrigger}>
                <Modal.Header>
                    <Button disabled={!this.formIsValid.call(this)} color="green" floated="right">Add {UnitCode}</Button>
                    Creating custom unit...
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>
                            Please fill in the following details before adding {UnitCode}.
                        </p>
                        <Form>
                            <Form.Group width="equal">
                                <Form.Input onChange={this.onUnitCodeChange.bind(this)} label="Unit code" placeholder={this.props.UnitCode} />
                                <Form.Input onChange={this.onUnitNameChange.bind(this)} label="Unit name" />
                                    <Form.Input onChange={this.onCreditPointsChange.bind(this)} label="Credit points" placeholder={this.defaultCreditPoints} />
                                    <Form.Field selectOnBlur onChange={this.onSCABandChange.bind(this)} label="SCA Band" control={Select} search options={this.scaBandOptions} />
                            </Form.Group>
                            <Form.Field onChange={this.onFacultyChange.bind(this)} label="Faculty" control={Select} search options={this.facultyOptions} />
                        </Form>
                        <b>Preview:</b>
                        <UnitInfo
                            collapse={false}
                            cost={CostCalc.calculateCost(SCABand, creditPoints)}
                            creditPoints={creditPoints}
                            error={false}
                            Faculty={`Faculty of ${Faculty}`}
                            isDisabled={false}
                            UnitCode={UnitCode}
                            UnitName={UnitName}
                             />
                    </Modal.Description>
                </Modal.Content>
            </ControlledModal>
        );
    }
}

CustomUnitModal.propTypes = {
    UnitCode: PropTypes.string.isRequired,
    trigger: PropTypes.element.isRequired,
    cancelAddingCustomUnitToCourse: PropTypes.func.isRequired
};

export default CustomUnitModal;

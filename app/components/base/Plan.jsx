import React, { Component, PropTypes } from "react";
import { Button, Container, Grid, Header, Icon, Menu, Sidebar, Segment } from "semantic-ui-react";

import CustomUnitModal from "../modals/CustomUnitModal.jsx";
import UnitQuery from "../../utils/UnitQuery";
import CostCalc from "../../utils/CostCalc";
import CourseStructure from "../CourseStructure.jsx";
import CourseStatisticGroup from "../CourseStatisticGroup.jsx";
import LoadCourseMap from "../modals/LoadCourseMap.jsx";
import UnitDetailModalPopup from "../Unit/UnitDetailModalPopup.jsx";
import UnitSearchContainer from "../../containers/UnitSearchContainer.jsx";

/**
 * The plan component is the main page of the app, where students can add and
 * remove teaching periods and units.
 */
class Plan extends Component {
    /**
     * State holds a unit object that is used during the add
     * unit process.
     *
     * @param {object} props - React's props
     */
    constructor(props) {
        super(props);
        this.state = {
            unitToAdd: undefined,
            showAddToCourseUI: false,
            totalCredits: 0,
            totalCost: 0,
            focusedUnitCode: "",
            customUnitCode: undefined,
            searchResults: null,
            searchResultIndex: 0
        };

        this.addToCourse = this.addToCourse.bind(this);
        this.doneAddingToCourse = this.doneAddingToCourse.bind(this);
        this.removeFromCourse = this.removeFromCourse.bind(this);
        this.handleChildUpdateTotals = this.handleChildUpdateTotals.bind(this);
        this.handleUnitDetailClick = this.handleUnitDetailClick.bind(this);
        this.cancelAddingToCourse = this.cancelAddingToCourse.bind(this);
    }

    /**
     * Adds unit to course by specifying unit code. It does not add unit
     * immediately.
     *
     * @param {string} unitToAdd - The unit to be added.
     * @param {boolean} custom - If it is a custom unit, prompt user to enter details
     */
    addToCourse(nUnitCode, custom) {
        if(nUnitCode !== undefined) {
            this.props.handleDocumentClick();
            if(!custom) {
                UnitQuery.getExtendedUnitData(nUnitCode)
                    .then(response => {
                        let data = response.data;
                        data.Cost = CostCalc.calculateCost(data.SCABand, data.CreditPoints);

                        this.setState({
                            unitToAdd: data,
                            focusedUnitCode: data.UnitCode
                        });

                    })
                    .catch(error => {
                        console.error(error);
                    });

            } else {
                this.setState({
                    customUnitCode: nUnitCode
                });
            }
        }
    }

    /**
     * Shows add unit UI and allows user to add their custom unit.
     *
     * @param {string} unitToAdd - The unit to be added.
     */
    addCustomUnitToCourse(unitToAdd) {
        this.setState({
            unitToAdd
        });
    }

    cancelAddingCustomUnitToCourse() {
        this.setState({
            customUnitCode: undefined
        });
    }

    /**
     * Handles the removal of a unit and updates the totals.
     */
    removeFromCourse(unit) {
        let newCred = this.state.totalCredits - unit.CreditPoints;
        let newCost = this.state.totalCost - unit.Cost;

        this.setState({
            totalCredits: newCred,
            totalCost: newCost
        });
    }

    cancelAddingToCourse(unit) {
        this.setState({
            unitToAdd: undefined
        });
    }

    /**
     * Turns off add unit UI, also updated running course totals
     */
    doneAddingToCourse(unit) {
        let newCred = this.state.totalCredits + unit.CreditPoints;
        let newCost = this.state.totalCost + unit.Cost;

        this.setState({
            totalCredits: newCred,
            totalCost: newCost,
            unitToAdd: undefined
        });
    }

    /**
     * On occasion, such as loading from local storage, a child component may need to update the totals without the parent being aware
     * this function is passed down, and it is the child components responsibity to call this function in these situations.
     */
    handleChildUpdateTotals(totalCreditPoints, totalEstimatedCost) {
        this.setState({
            totalCredits: totalCreditPoints,
            totalCost: totalEstimatedCost
        });
    }

    /**
     * handles the updating of unit info button
     */
    handleUnitDetailClick(unitCode) {
        this.setState({focusedUnitCode: unitCode});
    }

    /**
     * Returns a container of grid of a single row, holding the course
     * structure.
     */
    render() {
        const { startYear, endYear } = this.props.location.query;
        const focused = !!this.state.focusedUnitCode;
        const unitDetailButton = <Button
                                    fluid
                                    disabled={!focused}
                                    primary>View {this.state.focusedUnitCode || "unit"} details</Button>;

        return (
            <div className="wrapper">
                <Sidebar as={Menu} animation="overlay" style={{width: 300}} direction="left" visible={this.props.searchVisible} vertical>
                    <UnitSearchContainer addToCourse={this.addToCourse} searchVisible={this.props.searchVisible} />
                </Sidebar>
                {this.state.customUnitCode &&
                    <CustomUnitModal
                        UnitCode={this.state.customUnitCode}
                        cancelAddingCustomUnitToCourse={this.cancelAddingCustomUnitToCourse.bind(this)}
                        addCustomUnitToCourse={this.addCustomUnitToCourse.bind(this)} />
                }

                <Container className="move no-print">
                    <br />
                    <Grid reversed="mobile" stackable className="no-print">
                        <Grid.Row>
                            <Grid.Column width="4">
                                <UnitDetailModalPopup unitCode={this.state.focusedUnitCode} trigger={unitDetailButton} />
                            </Grid.Column>
                            <Grid.Column width="4" >
                                <LoadCourseMap />
                            </Grid.Column>
                            <Grid.Column floated="right" width="8">
                                <CourseStatisticGroup currentCreditPoints={this.state.totalCredits} currentEstCost={this.state.totalCost} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>

                <Container className="main text">
                    <CourseStructure startYear={parseInt(startYear)}
                                     endYear={parseInt(endYear)}
                                     addToCourse={this.addToCourse}
                                     doneAddingToCourse={this.doneAddingToCourse}
                                     cancelAddingToCourse={this.cancelAddingToCourse}
                                     removeFromCourse={this.removeFromCourse}
                                     unitToAdd={this.state.unitToAdd}
                                     totalCreditPoints={this.state.totalCredits}
                                     totalCost={this.state.totalCost}
                                     handleChildUpdateTotals={this.handleChildUpdateTotals}
                                     onUnitClick={this.handleUnitDetailClick} />
                </Container>
                <div className="push" />
            </div>
        );
    }
}

Plan.propTypes = {
    location: PropTypes.shape({
        query: PropTypes.shape({
            /* When a student begins their course */
            startYear: PropTypes.string,
            /* When the student is expected to graduate */
            endYear: PropTypes.string
        }).isRequired
    }).isRequired
};

export default Plan;

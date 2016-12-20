import React, { Component, PropTypes } from "react";
import { Button, Container, Grid } from "semantic-ui-react";

import CustomUnitModal from "../modals/CustomUnitModal.jsx";
import UnitQuery from "../../utils/UnitQuery";
import CostCalc from "../../utils/CostCalc";
import CourseStructure from "../CourseStructure.jsx";
import CourseStatisticGroup from "../CourseStatisticGroup.jsx";
import UnitSearchContainer from "../../containers/UnitSearchContainer.jsx";
import UnitInfoContainer from "../../containers/UnitInfoContainer.jsx";

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
            customUnitCode: undefined
        };

        this.addToCourse = this.addToCourse.bind(this);
        this.doneAddingToCourse = this.doneAddingToCourse.bind(this);
        this.removeFromCourse = this.removeFromCourse.bind(this);
        this.handleChildUpdateTotals = this.handleChildUpdateTotals.bind(this);
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
            if(!custom) {
                UnitQuery.getExtendedUnitData(nUnitCode)
                    .then(response => {
                        let data = response.data;
                        data.Cost = CostCalc.calculateCost(data.SCABand, data.CreditPoints);

                        this.setState({
                            unitToAdd: data
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
     * Returns a container of grid of a single row, holding the course
     * structure.
     */
    render() {
        const { startYear, endYear } = this.props.location.query;

        return (
            <div>
                {this.state.customUnitCode &&
                    <CustomUnitModal UnitCode={this.state.customUnitCode} cancelAddingCustomUnitToCourse={this.cancelAddingCustomUnitToCourse.bind(this)} />
                }
                <Container className="move no-print">
                    <UnitInfoContainer
                        newUnit={this.state.unitToAdd} />

                    <Grid reversed="mobile" stackable className="no-print">
                        <Grid.Column width="6"><UnitSearchContainer addToCourse={this.addToCourse} /></Grid.Column>
                        <Grid.Column width="6"><CourseStatisticGroup currentCreditPoints={this.state.totalCredits} currentEstCost={this.state.totalCost} /></Grid.Column>
                        <Grid.Column width="4">
                        <a target="_blank" href="https://docs.google.com/a/monash.edu/forms/d/e/1FAIpQLScyXYUi_4-C7juCSrsvxqBuQCf1rKpoJLb7fVknxxApfrym2g/viewform">
                            <Button primary fluid>Give us feedback</Button>
                        </a>
                        </Grid.Column>

                    </Grid>
                </Container>

                <Container className="main text">
                    <CourseStructure startYear={parseInt(startYear)}
                                     endYear={parseInt(endYear)}
                                     addToCourse={this.addToCourse}
                                     doneAddingToCourse={this.doneAddingToCourse}
                                     removeFromCourse={this.removeFromCourse}
                                     unitToAdd={this.state.unitToAdd}
                                     totalCreditPoints={this.state.totalCredits}
                                     totalCost={this.state.totalCost}
                                     handleChildUpdateTotals={this.handleChildUpdateTotals} />
                </Container>
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

import React, { Component, PropTypes } from "react";
import { Button, Container, Grid } from "semantic-ui-react";

import UnitQuery from "../../utils/UnitQuery";
import CostCalc from "../../utils/CostCalc";
import CourseStructure from "../CourseStructure.jsx";
import CourseStatisticGroup from "../CourseStatisticGroup.jsx";
import UnitSearchContainer from "../../containers/UnitSearchContainer.jsx";
import UnitInfoContainer from "../../containers/UnitInfoContainer.jsx";
import UnitDetailModal from "../modals/UnitDetailModal.jsx";

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
            focusedUnitCode: ""
        };

        this.addToCourse = this.addToCourse.bind(this);
        this.doneAddingToCourse = this.doneAddingToCourse.bind(this);
        this.removeFromCourse = this.removeFromCourse.bind(this);
        this.handleChildUpdateTotals = this.handleChildUpdateTotals.bind(this);
        this.handleUnitDetailClick = this.handleUnitDetailClick.bind(this);
    }

    /**
     * Adds unit to course by specifying unit code. It does not add unit
     * immediately.
     *
     * @param {string} unitToAdd - The unit to be added.
     */
    addToCourse(nUnitCode) {
        if(!(nUnitCode === undefined)) {

            UnitQuery.getExtendedUnitData(nUnitCode)
                .then(function(response) {
                    let data = response.data;
                    data.Cost = CostCalc.calculateCost(data.SCABand, data.CreditPoints);

                    this.setState({
                        unitToAdd: data,
                        focusedUnitCode: data.UnitCode
                    });

                }.bind(this))
                .catch(function(error) {
                    console.error(error);
                });
        }
    }

    /**
     * Handles the removal of a unit and updates the totals
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
           totalCost: totalEstimatedCost,
        });
    }

    /**
     * handles the updating of unit info button
     */
    handleUnitDetailClick(unitCode){
        this.setState({focusedUnitCode: unitCode});
    }

    /**
     * Returns a container of grid of a single row, holding the course
     * structure.
     */
    render() {
        const { startYear, endYear } = this.props.location.query;
        console.log(this.state.focusedUnitCode)
        let unitDetailButton;
        if (this.state.focusedUnitCode) {
            unitDetailButton =  <Button fluid>{"View " + this.state.focusedUnitCode + " details"}</Button>
        } else {
            unitDetailButton = <Button disabled={true}>View unit details</Button>
        }


        return (
            <div className="wrapper">
                <Container className="move no-print">
                    <br />
                    <Grid reversed="mobile" stackable className="no-print">
                        <Grid.Row>
                            <Grid.Column width="3"><UnitSearchContainer onResult={this.addToCourse} /></Grid.Column>
                            <Grid.Column width="3">
                                <UnitDetailModal unitCode={this.state.focusedUnitCode} trigger={unitDetailButton} />
                            </Grid.Column>
                            <Grid.Column width="3" />
                            <Grid.Column width="3">
                                <a target="_blank" href="https://docs.google.com/a/monash.edu/forms/d/e/1FAIpQLScyXYUi_4-C7juCSrsvxqBuQCf1rKpoJLb7fVknxxApfrym2g/viewform">
                                    <Button primary fluid>Give us feedback</Button>
                                </a>
                            </Grid.Column>
                            <Grid.Column width="4">
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

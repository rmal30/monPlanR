import React, {Component} from "react";
import {Container, Grid} from "semantic-ui-react";

import CourseStructure from "../CourseStructure.jsx";
import UnitSearchContainer from "../../containers/UnitSearchContainer.jsx";
import UnitInfoContainer from "../../containers/UnitInfoContainer.jsx";

class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddToCourseUI: false,
            unitToAdd: null
        };
    }
    /**
     * Adds unit to course by specifying unit code.
     *
     * @param {string} unitCode - The unit to be added.
     */
    addToCourse(unitCode) {
        this.setState({
            showAddToCourseUI: true,
            unitToAdd: unitCode
        });
    }

    /**
     * Turns off add unit UI.
     */
    doneAddingToCourse() {
        this.setState({
            showAddToCourseUI: false,
            unitToAdd: undefined
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
                <UnitInfoContainer addToCourse={this.addToCourse.bind(this)}
                                   showAddToCourseUI={this.state.showAddToCourseUI}
                                   doneAddingToCourse={this.doneAddingToCourse.bind(this)} />
                <Container className="main text">
                    <Grid>
                        <Grid.Row>
                            <CourseStructure startYear={parseInt(startYear)}
                                             endYear={parseInt(endYear)}
                                             showAddToCourseUI={this.state.showAddToCourseUI}
                                             doneAddingToCourse={this.doneAddingToCourse.bind(this)}
                                             unitToAdd={this.state.unitToAdd} />
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>

        );
    }
}

export default Plan;

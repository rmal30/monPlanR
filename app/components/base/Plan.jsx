import React, {Component} from "react";
import {Container, Grid} from "semantic-ui-react";

import CourseStructure from "../CourseStructure.jsx";
import UnitSearchContainer from "../../containers/UnitSearchContainer.jsx"
import UnitInfoContainer from "../../containers/UnitInfoContainer.jsx"

class Plan extends Component {
    /**
     * Returns a container of grid of a single row, holding the course
     * structure.
     */
    render() {
        const { startYear, endYear } = this.props.location.query;

        return (
            <div>
                <UnitInfoContainer />
                <Container className="main text">
                    <Grid>
                        <Grid.Row>
                            <CourseStructure startYear={parseInt(startYear)} endYear={parseInt(endYear)} />
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>

        );
    }
}

export default Plan;

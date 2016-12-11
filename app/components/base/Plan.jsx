import React, {Component} from "react";
import {Container, Grid} from "semantic-ui-react";

import CourseStructure from "../CourseStructure.jsx";

class Plan extends Component {
    /**
     * Returns a container of grid of a single row, holding the course
     * structure.
     */
    render() {
        const { startYear, endYear } = this.props.location.query;

        return (
            <Container className="main text">
                <Grid>
                    <Grid.Row>
                        <CourseStructure startYear={startYear} endYear={endYear} />
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default Plan;

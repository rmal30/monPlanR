import React, {Component} from "react";
import {Container, Grid} from "semantic-ui-react";

import CourseStructure from "../CourseStructure.jsx";

class Plan extends Component {
    render() {
        return (
            <Container className="main text">
                <Grid>
                    <Grid.Row>
                        <CourseStructure />
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default Plan;

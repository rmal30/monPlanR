import React from "react";
import { Button, Container } from "semantic-ui-react";

import { Link } from "react-router";

/**
 * Displays disclaimer message to users.
 */
const Disclaimer = () => (
    <Container style={{margin: "5em 0"}}>
        <h1>Disclaimer</h1>
        <p>monPlan is a tool designed to help students to design courses with ease. Our features are designed to assist you in planning your course, including recommending units based off past
          SETU results. Since it is only a tool, we recommend you to see your faculty’s course advisor.</p>
        <p>Our fundamental goal is to allow all Monash University students to add any units in any teaching period, for any year. Period.
          We place trust in you as a student to plan your own course, and for some quick guidance, we will inform you if there is anything that might be wrong with your course plan.</p>
        <p>Our promise is that we will never restrict you in adding your units to your course, and it is up to you and the course advisors to assist you with your plan.</p>
        <Link to="/"><Button color="blue">Go back to home</Button></Link>
    </Container>
);

export default Disclaimer;

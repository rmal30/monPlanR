import React, { PropTypes } from "react";
import { Grid, Segment } from "semantic-ui-react";

/**
 * A simple component for letting the user know that they are adding a unit
 */
const AddingUnitIndicator = ({ unitCode }) => {
    
    return (
        <Segment color="green">
            <Grid stackable>
                <Grid.Column width={12}>
                    <h3>{`Adding unit ${unitCode}`}</h3>
                    <h5>Place the unit somewhere in your course below</h5>
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default AddingUnitIndicator;

AddingUnitIndicator.propTypes = {
    unitCode: PropTypes.string
};
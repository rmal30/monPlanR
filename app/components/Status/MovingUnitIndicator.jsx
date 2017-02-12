import React, { PropTypes } from "react";
import { Grid, Segment } from "semantic-ui-react";

/**
 * A simple component for letting the user know that they are moving a unit
 */
const MovingUnitIndicator = ({ unitCode }) => {
    
    return (
        <Segment color="blue">
            <Grid stackable>
                <Grid.Column width={12}>
                    <h3>{`Moving unit ${unitCode}`}</h3>
                    <h5>Drop the unit in an empty cell, or on another unit to swap the units</h5>
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default MovingUnitIndicator;

MovingUnitIndicator.propTypes = {
    unitCode: PropTypes.string
};
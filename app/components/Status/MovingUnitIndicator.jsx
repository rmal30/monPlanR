import React, { PropTypes } from "react";
import { Grid, Icon, Segment, Button } from "semantic-ui-react";

/**
 * A simple component for letting the user know that they are moving a unit
 */
const MovingUnitIndicator = ({ unitCode }) => {

    return (
        <Segment color="blue" className="moving">
            <Grid stackable>
                <Grid.Column width={12}>
                    <h3><Icon name="move" />Moving {unitCode || "unit"}</h3>
                    <h5>Drop the unit in an empty cell, or on another unit to swap the units</h5>
                    <Button className="btnlightcancel">Cancel Moving Unit</Button>
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default MovingUnitIndicator;

MovingUnitIndicator.propTypes = {
    unitCode: PropTypes.string
};

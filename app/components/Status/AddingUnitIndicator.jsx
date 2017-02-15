import React, { PropTypes } from "react";
import { Grid, Icon, Segment, Button } from "semantic-ui-react";
import CourseStatisticGroupContainer from "../../containers/Course/CourseStatisticGroupContainer";

/**
 * A simple component for letting the user know that they are adding a unit
 */
const AddingUnitIndicator = ({ unitCode, onCancelAddingUnit }) => {

    return (
        <Segment color="green" className="adding">
            <Grid stackable>
                <Grid.Column width={10}>
                    <h3><Icon name="add" />Adding {unitCode || "unit"}</h3>
                    <h5>Place the unit somewhere in your course below</h5>
                    <Button className="btnlightcancel" onClick={onCancelAddingUnit}>Cancel Adding Unit</Button>
                </Grid.Column>
                <Grid.Column width={6}>
                    <CourseStatisticGroupContainer />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default AddingUnitIndicator;

AddingUnitIndicator.propTypes = {
    unitCode: PropTypes.string,
    onCancelAddingUnit: PropTypes.func
};

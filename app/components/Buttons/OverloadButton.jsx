import React, { PropTypes } from "react";
import { Button, Icon } from "semantic-ui-react";

/**
 *
 */
const OverloadButton = (props) => {
    const { isDisabled, increaseStudyLoad } = props;
    return (
        <Button
            icon
            className="no-print" 
            disabled={isDisabled}
            onClick={increaseStudyLoad}
            color="green"
            floated="right">
            <Icon name='plus' /> Overload
        </Button>
    );
};

export default OverloadButton;

OverloadButton.propTypes = {
    isDisabled: PropTypes.bool,
    increaseStudyLoad: PropTypes.func
};

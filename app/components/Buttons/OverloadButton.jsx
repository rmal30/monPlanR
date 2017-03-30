import React, { PropTypes } from "react";
import { Button } from "semantic-ui-react";

/**
 *
 */
const OverloadButton = (props) => {
    const { isDisabled, increaseStudyLoad, mobile } = props;
    return (
        <Button
            secondary
            icon="plus"
            fluid={mobile}
            className="no-print"
            disabled={isDisabled}
            onClick={increaseStudyLoad}
            labelPosition={mobile ? "left" : undefined}
            floated={mobile ? undefined : "right"}
            content={mobile ? "Add overload column" : "Overload"}
        />
    );
};

export default OverloadButton;

OverloadButton.propTypes = {
    isDisabled: PropTypes.bool,
    increaseStudyLoad: PropTypes.func,
    mobile: PropTypes.bool
};

import React, { PropTypes } from "react";
import { Button } from "semantic-ui-react";

/**
 * 
 */
const UnderloadButton = (props) => {
    const { isDisabled, decreaseStudyLoad, mobile } = props;
    return (
        <Button 
            icon="minus" 
            labelPosition={mobile ? "left" : undefined} 
            className="no-print" 
            disabled={isDisabled} 
            onClick={decreaseStudyLoad} 
            color="red" 
            floated={!mobile ? "right" : undefined} 
            fluid={mobile} 
            content={mobile ? "Remove overload column" : ""} />
    );
};

export default UnderloadButton;

UnderloadButton.propTypes = {
    isDisabled: PropTypes.bool,
    decreaseStudyLoad: PropTypes.func,
    mobile: PropTypes.bool
};
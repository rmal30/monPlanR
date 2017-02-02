import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as CourseActions from "../../actions/CourseActions";
import UnderloadButton from "../../components/Buttons/UnderloadButton.jsx";

/**
 * 
 */
const UnderloadButtonContainer = (props) => {
    return (
        <UnderloadButton {...props} />
    );
};
/**
 * 
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(CourseActions, dispatch);
};

/**
 * 
 */
const mapStateToProps = (state) => {
    const { teachingPeriods, numberOfUnits } = state.CourseStructure;
    let shouldBeDisabled = teachingPeriods.length === 0 || numberOfUnits === 4;
    
    return {
        isDisabled: shouldBeDisabled
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnderloadButtonContainer);

UnderloadButtonContainer.propTypes = {
    mobile: PropTypes.bool
};
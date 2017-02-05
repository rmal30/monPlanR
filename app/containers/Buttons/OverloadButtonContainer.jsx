import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as CourseActions from "../../actions/CourseActions";
import OverloadButton from "../../components/Buttons/OverloadButton.jsx";


/**
 * Need as simple wrapper for this because we pass in mobile externally, the rest is grabbed from 
 * redux store
 */
const OverloadButtonContainer = (props) => {
    return <OverloadButton {...props} />;
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
    let shouldBeDisabled = (numberOfUnits === 6 || teachingPeriods.length === 0);
    
    return {
        isDisabled: shouldBeDisabled
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OverloadButtonContainer);

OverloadButtonContainer.propTypes = {
    mobile: PropTypes.bool
};
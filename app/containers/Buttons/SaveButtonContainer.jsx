import React, { PropTypes } from "react";
import SaveButton from "../../components/Course/SaveButton.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as dataFetchActions from "../../actions/DataFetchActions";

/**
 * Handles the data for the SaveButton component, this allows the component to be 'self-contained'
 * via the container interface, making usage of the component easy
 */
const SaveButtonContainer = (props) => {

    const {
        teachingPeriods, 
        numberOfUnits, 
        creditPoints, 
        cost, 
        startYear, 
        courseSnapshotUploading,
        courseSnapshotUploadError,
        courseSnapshotUploadData,
        courseSnapshotUploadSucessful
        } = props;


    /**
     * Save course to database uses the redux function to handle everything
     */
    const uploadCourseToDatabase = () => {
        props.uploadCourseSnap(teachingPeriods, numberOfUnits, creditPoints, cost, startYear);
    };


    return (
        <SaveButton
            uploaded={courseSnapshotUploadSucessful} 
            isUploading={courseSnapshotUploading}
            uploadingError={courseSnapshotUploadError}
            uploadCourseToDatabase={uploadCourseToDatabase}
            uploadedCourseID={courseSnapshotUploadData}/>
    );
};

/**
 * Perhpas a little dodgy but we feed not only the courseSnpashot tracking variables from 
 * redux as props, but also the teaching period data that is used in the upload course snap function
 */
const mapStateToProps = (state) => {
    return {
        teachingPeriods: state.CourseStructure.teachingPeriods,
        numberOfUnits: state.CourseStructure.numberOfUnits,
        creditPoints: state.Counter.creditPoints,
        courseSnapshotUploading: state.CourseStructure.courseSnapshotUploading,
        courseSnapshotUploadError: state.CourseStructure.courseSnapshotUploadError,
        cost: state.Counter.cost,
        courseSnapshotUploadData: state.CourseStructure.courseSnapshotUploadData,
        courseSnapshotUploadSucessful: state.CourseStructure.courseSnapshotUploadSucessful
    };
};

/**
 * grabs the dataFetchActions from redux so it can use uploadCoursesnap function
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(dataFetchActions, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(SaveButtonContainer);

SaveButtonContainer.propTypes = {
    teachingPeriods: PropTypes.array,
    numberOfUnits: PropTypes.number,
    creditPoints: PropTypes.number,
    startYear: PropTypes.number,
    courseSnapshotUploading: PropTypes.bool,
    courseSnapshotUploadError: PropTypes.bool,
    uploadCourseSnap: PropTypes.func,
    cost: PropTypes.number,
    courseSnapshotUploadData: PropTypes.string,
    courseSnapshotUploadSucessful: PropTypes.bool
    
};
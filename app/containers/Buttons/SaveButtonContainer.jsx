import React, { PropTypes } from "react";
import SaveButton from "../../components/Course/SaveButton.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as dataFetchActions from "../../actions/DataFetchActions";


const SaveButtonContainer = (props) => {

    const {
        teachingPeriods, 
        numberOfUnits, 
        creditPoints, 
        cost, 
        startYear, 
        courseSnapshotUploading,
        courseSnapshotUploadError,
        courseSnapShotUploadData
        } = props;

    const uploadCourseToDatabase = () => {
        props.uploadCourseSnap(teachingPeriods, numberOfUnits, creditPoints, cost, startYear);
    };


    return (
        <SaveButton 
            isUploading={courseSnapshotUploading}
            uploadingError={courseSnapshotUploadError}
            uploadCourseToDatabase={uploadCourseToDatabase}
            uploadedCourseID={courseSnapShotUploadData}/>
    );
};

const mapStateToProps = (state) => {
    return {
        teachingPeriods: state.CourseStructure.teachingPeriods,
        numberOfUnits: state.CourseStructure.numberOfUnits,
        creditPoints: state.Counter.creditPoints,
        courseSnapshotUploading: state.CourseStructure.courseSnapshotUploading,
        courseSnapshotUploadError: state.CourseStructure.courseSnapshotUploadError,
        cost: state.Counter.cost,
        courseSnapShotUploadData: state.CourseStructure.courseSnapShotUploadData
    };
};

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
    courseSnapShotUploadData: PropTypes.object
    
};
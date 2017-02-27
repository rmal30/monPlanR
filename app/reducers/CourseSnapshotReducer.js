const defaultState = {
    courseSnapshotLoading: false,           // Indicates whether the course snapshot is loading from the API
    courseSnapshotLoadError: false,         // Indicates whether there was an issue loading from the API
    courseSnapshotData: null,               // Eventually becomes an object with the courseSnapshot returned from the API

    courseSnapshotUploading: false,         // Indicates whether a course snapshot is uploading to the database
    courseSnapshotUploadError: false,       // Indicates whether there was an issue uploading the data
    courseSnapshotUploadSucessful: false,   // A boolean representing whether the upload was successful
    courseSnapshotUploadData: null          // The data returned by the API on a successful post to database, e.g. the unique 
                                            // URL id is returned so the user can visit again
};

/**
 * @author JXNS
 * The course snapshot reducer handles the slice of state around loading snaps from and uploading snaps to the database
 * The actions involved are fairly straightforward and follow the ASYNC_ACTION_(PENDING/FULFILLED/REJECTED) pattern
 * for both uploading and loading
 */
const CourseSnapshotReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "UPLOAD_COURSE_SNAPSHOT_PENDING":
            return {
                ...state,
                courseSnapshotUploading: true,
                courseSnapshotUploadError: false,
                courseSnapshotUploadSucessful: false
            };

        case "UPDATE_COURSE_INFO":
            return {
                ...state,
                courseInfo: action.courseInfo
            };

        case "UPLOAD_COURSE_SNAPSHOT_FULFILLED":
            return {
                ...state,
                courseSnapshotUploading: false,
                courseSnapshotUploadData: action.payload.data,
                courseSnapshotUploadSucessful: true

            };

        case "UPLOAD_COURSE_SNAPSHOT_REJECTED":
            return {
                ...state,
                courseSnapshotUploading: false,
                courseSnapshotUploadError: true,
                courseSnapshotUploadData: null
            };

        case "FETCH_COURSE_SNAPSHOT_PENDING":
            return {
                ...state,
                courseSnapshotLoading: true,
                courseSnapshotLoadError: false,
            };

        case "FETCH_COURSE_SNAPSHOT_FULFILLED":
            return {
                ...state,
                courseSnapshotLoading: false,
                courseSnapshotData: action.payload.data
            };

        case "FETCH_COURSE_SNAPSHOT_REJECTED":
            return {
                ...state,
                courseSnapshotLoading: false,
                courseSnapshotLoadError: true,
                courseSnapshotData: null
            };
        
        default: 
            return state;
    }
};

export default CourseSnapshotReducer;
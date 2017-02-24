const defaultState = {
    courseSnapshotLoading: false,
    courseSnapshotLoadError: false,
    courseSnapshotData: null,

    courseSnapshotUploading: false,
    courseSnapshotUploadError: false,
    courseSnapshotUploadData: null,
    courseSnapshotUploadSucessful: false,
};

const CourseSnapshot = (state = defaultState, action) => {
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

export default CourseSnapshot;
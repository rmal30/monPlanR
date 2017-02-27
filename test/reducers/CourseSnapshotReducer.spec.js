import CourseSnapshotReducer from "../../app/reducers/CourseSnapshotReducer";
import { describe, it } from "mocha";

describe("REDUCER: CourseSnapshot", () => {
    describe("ACTION: UPLOAD_COURSE_SNAPSHOT_PENDING", () => {
        it("Should handle the initiation of a course snapshot upload correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotUploading: false,
                courseSnapshotUploadError: true,
                courseSnapshotUploadData: null,
                courseSnapshotUploadSucessful: true
            };

            const action = {
                type: "UPLOAD_COURSE_SNAPSHOT_PENDING",
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotUploading: true,
                courseSnapshotUploadError: false,
                courseSnapshotUploadData: null,
                courseSnapshotUploadSucessful: false
            };

            test(CourseSnapshotReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: UPLOAD_COURSE_SNAPSHOT_FULFILLED", () => {
        it("Should handle the successful upload of a course snapshot correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotUploading: true,
                courseSnapshotUploadError: false,
                courseSnapshotUploadData: null,
                courseSnapshotUploadSucessful: false
            };

            const action = {
                type: "UPLOAD_COURSE_SNAPSHOT_FULFILLED",
                payload: {data: "upload string"}
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotUploading: false,
                courseSnapshotUploadError: false,
                courseSnapshotUploadData: "upload string",
                courseSnapshotUploadSucessful: true
            };

            test(CourseSnapshotReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: UPLOAD_COURSE_SNAPSHOT_REJECTED", () => {
        it("Should do handle the rejected upload of a course snapshot correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotUploading: true,
                courseSnapshotUploadError: false,
                courseSnapshotUploadData: null,
                courseSnapshotUploadSucessful: false
            };

            const action = {
                type: "UPLOAD_COURSE_SNAPSHOT_REJECTED",
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotUploading: false,
                courseSnapshotUploadError: true,
                courseSnapshotUploadData: null,
                courseSnapshotUploadSucessful: false
            };

            test(CourseSnapshotReducer, stateBefore, action, stateAfter);
        });
    });


    describe("ACTION: FETCH_COURSE_SNAPSHOT_PENDING", () => {
        it("Should begin fetching a course snapshot correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotLoading: false,
                courseSnapshotLoadError: true,
                courseSnapshotData: null,
            };

            const action = {
                type: "FETCH_COURSE_SNAPSHOT_PENDING",
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotLoading: true,
                courseSnapshotLoadError: false,
                courseSnapshotData: null,
            };

            test(CourseSnapshotReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_COURSE_SNAPSHOT_FULFILLED", () => {
        it("Should handle a successful course snapshot fetch correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotLoading: true,
                courseSnapshotLoadError: false,
                courseSnapshotData: null,
            };

            const action = {
                type: "FETCH_COURSE_SNAPSHOT_FULFILLED",
                payload: {data: "Snap data"}
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotLoading: false,
                courseSnapshotLoadError: false,
                courseSnapshotData: "Snap data",
            };

            test(CourseSnapshotReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_COURSE_SNAPSHOT_REJECTED", () => {
        it("Should handle a rejected course snapshot fetch correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotLoading: true,
                courseSnapshotLoadError: false,
                courseSnapshotData: null,
            };

            const action = {
                type: "FETCH_COURSE_SNAPSHOT_REJECTED",
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotLoading: false,
                courseSnapshotLoadError: true,
                courseSnapshotData: null,
            };

            test(CourseSnapshotReducer, stateBefore, action, stateAfter);
        });
    });
});
    
import CourseSearchReducer from "../../app/reducers/CourseSearchReducer";
import { describe, it } from "mocha";

describe("REDUCER: CourseSearch", () => {
    describe("ACTION: FETCH_COURSES_PENDING", () => {
        it("Should begin fetching the basic courses list correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                basicCourses: [],
                courseSearchIsLoading: false,
                courseSearchError: true //start with true to test if pending switches error state correctly
            };

            const action = {
                type: "FETCH_COURSES_PENDING",
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                basicCourses: [],
                courseSearchIsLoading: true,
                courseSearchError: false
            };

            test(CourseSearchReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_COURSES_FULFILLED", () => {
        it("Should begin fetching the basic courses list correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                basicCourses: [],
                courseSearchIsLoading: true,
                courseSearchError: false //start with true to test if pending switches error state correctly
            };

            const action = {
                type: "FETCH_COURSES_FULFILLED",
                payload: ["Hello", "Darkness", "My", "Old", "Friend"]
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                basicCourses: ["Hello", "Darkness", "My", "Old", "Friend"],
                courseSearchIsLoading: false,
                courseSearchError: false
            };

            test(CourseSearchReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_COURSES_REJECTED", () => {
        it("Should begin fetching the basic courses list correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                basicCourses: ["Hello", "Darkness", "My", "Old", "Friend"],
                courseSearchIsLoading: true,
                courseSearchError: false //start with true to test if pending switches error state correctly
            };

            const action = {
                type: "FETCH_COURSES_REJECTED",
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                basicCourses: [],
                courseSearchIsLoading: false,
                courseSearchError: true
            };

            test(CourseSearchReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_AOS_PENDING", () => {
        it("Should begin fetching the basic courses list correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                areasOfStudy: [],
                aosSearchIsLoading: false,
                aosSearchError: true //start with true to test if pending switches error state correctly
            };

            const action = {
                type: "FETCH_AOS_PENDING",
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                areasOfStudy: [],
                aosSearchIsLoading: true,
                aosSearchError: false
            };

            test(CourseSearchReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_AOS_FULFILLED", () => {
        it("Should begin fetching the basic courses list correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                areasOfStudy: [],
                aosSearchIsLoading: true,
                aosSearchError: false //start with true to test if pending switches error state correctly
            };

            const action = {
                type: "FETCH_AOS_FULFILLED",
                payload: ["Hello", "Darkness", "My", "Old", "Friend"]
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                areasOfStudy: ["Hello", "Darkness", "My", "Old", "Friend"],
                aosSearchIsLoading: false,
                aosSearchError: false
            };

            test(CourseSearchReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_AOS_REJECTED", () => {
        it("Should begin fetching the basic courses list correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                areasOfStudy: ["Hello", "Darkness", "My", "Old", "Friend"],
                aosSearchIsLoading: true,
                aosSearchError: false //start with true to test if pending switches error state correctly
            };

            const action = {
                type: "FETCH_AOS_REJECTED",
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                areasOfStudy: [],
                aosSearchIsLoading: false,
                aosSearchError: true
            };

            test(CourseSearchReducer, stateBefore, action, stateAfter);
        });
    });
});
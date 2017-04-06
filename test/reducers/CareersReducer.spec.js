import CareersReducer from "../../app/reducers/CareersReducer";
import { describe, it } from "mocha";

describe("REDUCER: Careers", () => {
    describe("ACTION: FETCH_CAREERS_PENDING", () => {
        it("Should correctly begin fetching the careers array", () => {
            const stateBefore = {
                careers: [],
                careersAreLoading: false,
                careersLoadError: true      // test that reset works
            };

            const action = {
                type: "FETCH_CAREERS_PENDING"
            };

            const stateAfter = {
                careers: [],
                careersAreLoading: true,
                careersLoadError: false
            };

            test(CareersReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_CAREERS_FULFILLED", () => {
        it("Should correctly handle a successful fetch of a career", () => {
            const stateBefore = {
                careers: [],
                careersAreLoading: true,
                careersLoadError: false      // test that reset works
            };

            const action = {
                type: "FETCH_CAREERS_FULFILLED",
                payload: [{careerOb1: "hello"}, {careerOb2: "world!"}]
            };

            const stateAfter = {
                careers: [{careerOb1: "hello"}, {careerOb2: "world!"}],
                careersAreLoading: false,
                careersLoadError: false
            };

            test(CareersReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_CAREERS_REJECTED", () => {
        it("Should correctly handle an unsuccessful fetch of a career", () => {
            const stateBefore = {
                careers: [{careerOb1: "hello"}, {careerOb2: "world!"}], // test reset works
                careersAreLoading: true,
                careersLoadError: false 
            };

            const action = {
                type: "FETCH_CAREERS_REJECTED"
            };

            const stateAfter = {
                careers: [],
                careersAreLoading: false,
                careersLoadError: true
            };

            test(CareersReducer, stateBefore, action, stateAfter);
        });
    });
});
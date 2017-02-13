import expect from "expect";
import { describe, it } from "mocha";
import * as actions from "../../app/actions/UIActions";

describe("ACTION-CREATOR: UIActions", () => {
    describe("AC: showInsertTeachingPeriodUI", () => {
        it("Should create an action to show the insert teaching period UI", () => {
            const expectedAction = {
                type: "SHOW_INSERT_TEACHING_PERIOD_UI",
                tpCode: "testTPCode"
            };

            expect(actions.showInsertTeachingPeriodUI("testTPCode")).toEqual(expectedAction);
        });
    });

    describe("AC: hideInsertTeachingPeriodUI", () => {
        it("Should create an action to hide the insert teaching period UI", () => {
            const expectedAction = {
                type: "HIDE_INSERT_TEACHING_PERIOD_UI"
            };

            expect(actions.hideInsertTeachingPeriodUI()).toEqual(expectedAction);
        });
    });

    describe("AC: showAddingUnitUI", () => {
        it("Should create an action to show the add unit UI", () => {
            const expectedAction = {
                type: "SHOW_ADD_UNIT_UI"
            };

            expect(actions.showAddingUnitUI()).toEqual(expectedAction);
        });
    });

    describe("AC: hideAddingUnitUI", () => {
        it("Should create an action to hide the add unit UI", () => {
            const expectedAction = {
                type: "HIDE_ADD_UNIT_UI"
            };

            expect(actions.hideAddingUnitUI()).toEqual(expectedAction);
        });
    });

    describe("AC: showMoveUnitUI", () => {
        it("Should create an action to show the move unit UI", () => {
            const expectedAction = {
                type: "SHOW_MOVE_UNIT_UI"
            };

            expect(actions.showMoveUnitUI()).toEqual(expectedAction);
        });
    });

    describe("AC: hideMoveUnitUI", () => {
        it("Should create an action to hide move unit UI", () => {
            const expectedAction = {
                type: "HIDE_MOVE_UNIT_UI"
            };

            expect(actions.hideMoveUnitUI()).toEqual(expectedAction);
        });
    });

    describe("AC: showConfirmDeleteTeachingPeriodUI", () => {
        it("Should create an action to show confirm delete teaching period UI", () => {
            const expectedAction = {
                type: "SHOW_CONFIRM_DELETE_TEACHING_PERIOD_MODAL"
            };

            expect(actions.showConfirmDeleteTeachingPeriodUI()).toEqual(expectedAction);
        });
    });

    describe("AC: hideConfirmDeleteTeachingPeriodUI", () => {
        it("Should create an action to hide confirm delete teaching period UI", () => {
            const expectedAction = {
                type: "HIDE_CONFIRM_DELETE_TEACHING_PERIOD_MODAL"
            };

            expect(actions.hideConfirmDeleteTeachingPeriodUI()).toEqual(expectedAction);
        });
    });

    describe("AC: showConfirmDecreaseStudyLoadUI", () => {
        it("Should create an action to show confirm decrease study load UI", () => {
            const expectedAction = {
                type: "SHOW_CONFIRM_DECREASE_STUDY_LOAD_MODAL"
            };

            expect(actions.showConfirmDecreaseStudyLoadUI()).toEqual(expectedAction);
        });
    });

    describe("AC: hideConfirmDecreaseStudyLoadUI", () => {
        it("Should create an action to hide confirm decrease study load UI", () => {
            const expectedAction = {
                type: "HIDE_CONFIRM_DECREASE_STUDY_LOAD_MODAL"
            };

            expect(actions.hideConfirmDecreaseStudyLoadUI()).toEqual(expectedAction);
        });
    });

    describe("AC: showCustomUnitUI", () => {
        it("Should create an action to show custum unit UI", () => {
            const expectedAction = {
                type: "SHOW_CUSTOM_UNIT_MODAL",
                unitCode: "TEST1001"
            };

            expect(actions.showCustomUnitUI("TEST1001")).toEqual(expectedAction);
        });
    });

    describe("AC: hideCustomUnitUI", () => {
        it("Should create an action to hide custom unit UI", () => {
            const expectedAction = {
                type: "HIDE_CUSTOM_UNIT_MODAL"
            };

            expect(actions.hideCustomUnitUI()).toEqual(expectedAction);
        });
    });

    describe("AC: showSidebar", () => {
        it("Should create an action to show sidebar", () => {
            const expectedAction = {
                type: "SHOW_SIDEBAR"
            };

            expect(actions.showSidebar()).toEqual(expectedAction);
        });
    });

    describe("AC: hideSidebar", () => {
        it("Should create an action to hide sidebar", () => {
            const expectedAction = {
                type: "HIDE_SIDEBAR"
            };

            expect(actions.hideSidebar()).toEqual(expectedAction);
        });
    });

    describe("AC: setCourseReadOnly", () => {
        it("Should create an action to set the course to read only", () => {
            const expectedAction = {
                type: "SET_COURSE_READ_ONLY"
            };

            expect(actions.setCourseReadOnly()).toEqual(expectedAction);
        });
    });

    describe("AC: setCourseReadAndWrite", () => {
        it("Should create an action to set the course to read and write", () => {
            const expectedAction = {
                type: "SET_COURSE_READ_AND_WRITE"
            };

            expect(actions.setCourseReadAndWrite()).toEqual(expectedAction);
        });
    });
});
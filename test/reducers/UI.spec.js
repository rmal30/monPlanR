import expect from "expect";
import deepFreeze from "deep-freeze";
import UI from "../../app/reducers/UI";
import { describe, it } from "mocha";


describe("REDUCER: UI", () => {
    describe("ACTION: SHOW_INSERT_TEACHING_PERIOD_UI", () => {
        it("Should correctly toggle the insert teaching period UI boolean", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false
            };

            const action = {
                type: "SHOW_INSERT_TEACHING_PERIOD_UI"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: true,
                showMovingUnitUI: false,
                showAddingUnitUI: false
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: HIDE_INSERT_TEACHING_PERIOD_UI", () => {
        it("Should correctly toggle the insert teaching period UI boolean", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: true,
                showMovingUnitUI: false,
                showAddingUnitUI: false
            };

            const action = {
                type: "HIDE_INSERT_TEACHING_PERIOD_UI"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: SHOW_ADD_UNIT_UI", () => {
        it("Should correctly toggle the add unit UI boolean", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false
            };

            const action = {
                type: "SHOW_ADD_UNIT_UI"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: true
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: HIDE_ADD_UNIT_UI", () => {
        it("Should correctly toggle the add unit UI boolean", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: true
            };

            const action = {
                type: "HIDE_ADD_UNIT_UI"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: SHOW_MOVE_UNIT_UI", () => {
        it("Should correctly toggle the move unit UI boolean", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false
            };

            const action = {
                type: "SHOW_MOVE_UNIT_UI"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: true,
                showAddingUnitUI: false
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: HIDE_MOVE_UNIT_UI", () => {
        it("Should correctly toggle the move unit UI boolean", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: true,
                showAddingUnitUI: false
            };

            const action = {
                type: "HIDE_MOVE_UNIT_UI"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });


    describe("ACTION: SET_COURSE_READ_ONLY", () => {
        it("Should set the course to read only correctly", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                readOnly: false
            };

            const action = {
                type: "SET_COURSE_READ_ONLY"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                readOnly: true
                
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });
        

    describe("ACTION: SET_COURSE_READ_AND_WRITE", () => {
        it("Should set the course to allow edits correctly", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                readOnly: true
            };

            const action = {
                type: "SET_COURSE_READ_AND_WRITE"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                readOnly: false
                
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: SHOW_CONFIRM_DELETE_TEACHING_PERIOD_MODAL", () => {
        it("Should correctly toggle the confirm delete teaching period modal UI to show", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingConfirmDeleteTeachingPeriodModal: false
            };

            const action = {
                type: "SHOW_CONFIRM_DELETE_TEACHING_PERIOD_MODAL"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingConfirmDeleteTeachingPeriodModal: true
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: HIDE_CONFIRM_DELETE_TEACHING_PERIOD_MODAL", () => {
        it("Should correctly toggle the confirm delete teaching period modal UI to hide", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingConfirmDeleteTeachingPeriodModal: true
            };

            const action = {
                type: "HIDE_CONFIRM_DELETE_TEACHING_PERIOD_MODAL"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingConfirmDeleteTeachingPeriodModal: false
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: SHOW_CONFIRM_DECREASE_STUDY_LOAD_MODAL", () => {
        it("Should correctly toggle the confirm decrease study load modal UI to show", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingConfirmDecreaseStudyLoadModal: false
            };

            const action = {
                type: "SHOW_CONFIRM_DECREASE_STUDY_LOAD_MODAL"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingConfirmDecreaseStudyLoadModal: true
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: HIDE_CONFIRM_DECREASE_STUDY_LOAD_MODAL", () => {
        it("Should correctly toggle the confirm decrease study load modal UI to hide", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingConfirmDecreaseStudyLoadModal: true
            };

            const action = {
                type: "HIDE_CONFIRM_DECREASE_STUDY_LOAD_MODAL"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingConfirmDecreaseStudyLoadModal: false
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: SHOW_SIDEBAR", () => {
        it("Should correctly show the sidebar when called", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingSidebar: false
            };

            const action = {
                type: "SHOW_SIDEBAR"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingSidebar: true
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: HIDE_SIDEBAR", () => {
        it("Should correctly hide the sidebar when called", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingSidebar: true
            };

            const action = {
                type: "HIDE_SIDEBAR"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingSidebar: false
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: ADDING_UNIT", () => {
        it("Should correctly hide the sidebar when a unit is being added", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingSidebar: true
            };

            const action = {
                type: "ADDING_UNIT"
            };

            const stateAfter = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingSidebar: false
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                UI(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });
});

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

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: SHOW_CUSTOM_UNIT_MODAL", () => {
        it("Should set show flag for custom unit modal to be true", () => {
            const stateBefore = {
                showingCustomUnitModal: false,
                customUnitCode: undefined,
                customTpIndex: undefined,
                customUnitIndex: undefined
            };

            const action = {
                type: "SHOW_CUSTOM_UNIT_MODAL"
            };

            const stateAfter = {
                showingCustomUnitModal: true,
                customUnitCode: undefined,
                customTpIndex: undefined,
                customUnitIndex: undefined
            };

            test(UI, stateBefore, action, stateAfter);
        });

        it("Should set unit code if it exists on top of setting show flag for custom unit modal to be true", () => {
            const stateBefore = {
                showingCustomUnitModal: false,
                customUnitCode: undefined,
                customTpIndex: undefined,
                customUnitIndex: undefined
            };

            const action = {
                type: "SHOW_CUSTOM_UNIT_MODAL",
                unitCode: "ABC1234"
            };

            const stateAfter = {
                showingCustomUnitModal: true,
                customUnitCode: "ABC1234",
                customTpIndex: undefined,
                customUnitIndex: undefined
            };

            test(UI, stateBefore, action, stateAfter);
        });

        it("Should set unit code and position if it exists on top of setting show flag for custom unit modal to be true", () => {
            const stateBefore = {
                showingCustomUnitModal: false,
                customUnitCode: undefined,
                customTpIndex: undefined,
                customUnitIndex: undefined
            };

            const action = {
                type: "SHOW_CUSTOM_UNIT_MODAL",
                unitCode: "ABC1234",
                tpIndex: 0,
                unitIndex: 2
            };

            const stateAfter = {
                showingCustomUnitModal: true,
                customUnitCode: "ABC1234",
                customTpIndex: 0,
                customUnitIndex: 2
            };

            test(UI, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: HIDE_CUSTOM_UNIT_MODAL", () => {
        it("Should set show flag for custom unit modal to be false", () => {
            const stateBefore = {
                showingCustomUnitModal: true
            };

            const action = {
                type: "HIDE_CUSTOM_UNIT_MODAL"
            };

            const stateAfter = {
                showingCustomUnitModal: false
            };

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
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

            test(UI, stateBefore, action, stateAfter);
        });
    });

    describe("DEFAULT", () => {
        it("Should not change state if it does not recognise the action", () => {
            const stateBefore = {
                showingInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false,
                showingSidebar: true
            };

            const action = {
                type: "THIS_IS_A_LONG_NAME_FOR_AN_ACTION",
                value: 42
            };

            test(UI, stateBefore, action, stateBefore);
        });
    });
});

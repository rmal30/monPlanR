import expect from "expect";
import deepFreeze from "deep-freeze";
import UI from "../../app/reducers/UI";
import { describe, it } from "mocha";


describe("REDUCER: UI", () => {
    describe("ACTION: SHOW_INSERT_TEACHING_PERIOD_UI", () => {
        it("Should correctly toggle the insert teaching period UI boolean", () => {
            const stateBefore = {
                showInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false
            };

            const action = {
                type: "SHOW_INSERT_TEACHING_PERIOD_UI"
            };

            const stateAfter = {
                showInsertTeachingPeriodUI: true,
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
                showInsertTeachingPeriodUI: true,
                showMovingUnitUI: false,
                showAddingUnitUI: false
            };

            const action = {
                type: "HIDE_INSERT_TEACHING_PERIOD_UI"
            };

            const stateAfter = {
                showInsertTeachingPeriodUI: false,
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
                showInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false
            };

            const action = {
                type: "SHOW_ADD_UNIT_UI"
            };

            const stateAfter = {
                showInsertTeachingPeriodUI: false,
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
                showInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: true
            };

            const action = {
                type: "HIDE_ADD_UNIT_UI"
            };

            const stateAfter = {
                showInsertTeachingPeriodUI: false,
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
                showInsertTeachingPeriodUI: false,
                showMovingUnitUI: false,
                showAddingUnitUI: false
            };

            const action = {
                type: "SHOW_MOVE_UNIT_UI"
            };

            const stateAfter = {
                showInsertTeachingPeriodUI: false,
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
                showInsertTeachingPeriodUI: false,
                showMovingUnitUI: true,
                showAddingUnitUI: false
            };

            const action = {
                type: "HIDE_MOVE_UNIT_UI"
            };

            const stateAfter = {
                showInsertTeachingPeriodUI: false,
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
});

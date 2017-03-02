import expect from "expect";
import { describe, it } from "mocha";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
//import nock from "nock";

import * as actions from "../../app/actions/CourseActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe("ACTION-CREATOR: CourseActions", () => {
    describe("AC: insertTeachingPeriod", () => {
        it("Should create an action to insert a teaching period", () => {
            const expectedActions = [
                {
                    type: "INSERT_TEACHING_PERIOD",
                    index: 1,
                    year: 2016,
                    code: "tpCode"
                },
                {
                    type: "VALIDATE_COURSE"
                },
                {
                    type: "MODIFIED_COURSE_PLAN"
                },
                {
                    type: "GET_NEXT_SEMESTER_STRING"
                }
            ];
            const store = mockStore({teachingPeriods: []});

            store.dispatch(actions.insertTeachingPeriod(1, 2016, "tpCode"));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe("AC: removeTeachingPeriod", () => {
        it("Should create an action to remove a teaching period", () => {
            const expectedActions = [
                {
                    type: "REMOVE_TEACHING_PERIOD",
                    index: 1,
                    units: ["unit1", "unit2", "unit3", null],
                },
                {
                    type: "VALIDATE_COURSE"
                },
                {
                    type: "MODIFIED_COURSE_PLAN"
                },
                {
                    type: "GET_NEXT_SEMESTER_STRING"
                }
            ];
            const store = mockStore({teachingPeriods: []});

            store.dispatch(actions.removeTeachingPeriod(1, ["unit1", "unit2", "unit3", null]));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    /*
    NOTE: Proper testing of this requires copying the data for teaching periods to check the
    nextSemester function is working correctly. Will need to come back to this

    describe("AC: addTeachingPeriod", () => {
        it("Should create an action to add a teaching period", () => {
            const expectedActions = [
                {
                    type: "APPEND_TEACHING_PERIOD",
                    year: 2016,
                    code: "S1-02"
                },
                {
                    type: "GET_NEXT_SEMESTER_STRING"
                }
            ];
            const store = mockStore({teachingPeriods: []});

            store.dispatch(actions.removeTeachingPeriod(1, ["unit1", "unit2", "unit3", null]));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    */

    describe("AC: increaseStudyLoad", () => {
        it("Should create an action to increase the study load", () => {
            const expectedAction = {
                type: "INCREASE_STUDY_LOAD",
            };

            expect(actions.increaseStudyLoad()).toEqual(expectedAction);
        });
    });

    describe("AC: decreaseStudyLoad", () => {
        it("Should create an action to increase the study load with units affected", () => {
            const mockTeachingPeriods = [
                { year: 2018, code: "S1-01", units: [null, null, null, null, {unitName: "unit1", creditPoints: 6}] },
                { year: 2018, code: "S2-01", units: [null, null, null, null, null] },
                { year: 2019, code: "S1-01", units: [null, null, null, null, {unitName: "unit2", creditPoints: 6}] },
                { year: 2019, code: "S2-01", units: [null, null, null, null, null] }
            ];

            const expectedActions = [
                {type: "PREP_FOR_DELETION", unitCoords: [[0,4], [2,4]]},
                {type: "DECREASE_STUDY_LOAD", units: [{unitName: "unit1", creditPoints: 6}, {unitName: "unit2", creditPoints: 6}]}
            ];

            const store = mockStore({teachingPeriods: []});
            store.dispatch(actions.decreaseStudyLoad(mockTeachingPeriods, 4));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it("Should create an action to increase the study load with no units affected", () => {
            const mockTeachingPeriods = [
                { year: 2018, code: "S1-01", units: [null, null, null, "unit1", null] },
                { year: 2018, code: "S2-01", units: [null, null, null, null, null] },
                { year: 2019, code: "S1-01", units: [null, null, null, "unit2", null] },
                { year: 2019, code: "S2-01", units: [null, null, null, null, null] }
            ];

            const expectedActions = [
                {type: "PREP_FOR_DELETION", unitCoords: []},
                {type: "DECREASE_STUDY_LOAD", units: []}
            ];

            const store = mockStore({teachingPeriods: []});
            store.dispatch(actions.decreaseStudyLoad(mockTeachingPeriods, 4));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe("AC: addUnit", () => {
        it("Should correctly create the actions required for the addition of a unit that is not a custom unit being dragged", () => {

            const mockUnit = {
                customUnitDragging: false,
                cost: 200,
                creditPoints: 6,
                unitCode: "TEST1001"
            };

            const expectedActions = [
                {type: "ADD_UNIT", tpIndex: 1, unitIndex: 1, unit: mockUnit, cost: 200, creditPoints: 6},
                {type: "CLEAR_HIGHLIGHTING_INVALID_UNIT_SLOTS"},
                {type: "VALIDATE_COURSE"},
                {type: "MODIFIED_COURSE_PLAN"}
            ];

            const store = mockStore({});

            store.dispatch(actions.addUnit(1, 1, mockUnit));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it("Should correctly create the actions required for the addition of a unit that is a custom unit being dragged", () => {

            const mockUnit = {
                customUnitDragging: true,
                cost: 200,
                creditPoints: 6,
                unitCode: "TEST1001"
            };

            const expectedActions = [{
                type: "SHOW_CUSTOM_UNIT_MODAL",
                unitCode: "TEST1001",
                tpIndex: 1,
                unitIndex: 1
            }];

            const store = mockStore({});
            store.dispatch(actions.addUnit(1, 1, mockUnit));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe("AC: removeUnit", () => {
        it("Should correctly create the actions required for removal of a unit", () => {

            const expectedActions = [
                {type: "REMOVE_UNIT", tpIndex: 1, unitIndex: 1, cost: 200, creditPoints: 6},
                {type: "VALIDATE_COURSE"},
                {type: "MODIFIED_COURSE_PLAN"}
            ];

            const store = mockStore({});

            store.dispatch(actions.removeUnit(1, 1, 6, 200));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe("AC: clearCourse", () => {
        it("Should create the actions for clearing the course", () => {
            const expectedActions = [
                {type: "CLEAR_COURSE"},
                {type: "GET_NEXT_SEMESTER_STRING"},
                {type: "VALIDATE_COURSE"}
            ];
            const store = mockStore({teachingPeriods: []});

            store.dispatch(actions.clearCourse());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe("AC: generateCourse", () => {
        it("Should create the action for generating the course", () => {
            const expectedAction = {
                type: "GENERATE_COURSE",
                startYear: 2016,
                endYear: 2019
            };

            expect(actions.generateCourse(2016, 2019)).toEqual(expectedAction);
        });
    });

    describe("AC: submitYearForm", () => {
        it("Should correctly create the actions required for submission of a year form", () => {

            const expectedActions = [
                {type: "SUBMIT_YEAR_FORM", startYear: 2016, endYear: 2019},
                {type: "GENERATE_COURSE", startYear: 2016, endYear: 2019},
                {type: "GET_NEXT_SEMESTER_STRING"}
            ];

            const store = mockStore({});

            store.dispatch(actions.submitYearForm(2016, 2019));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe("AC: changeStartYear", () => {
        it("Should correctly create actions required to change the start year", () => {
            const expectedActions = [
                {type: "CHANGE_START_YEAR", year: 2020},
                {type: "GET_NEXT_SEMESTER_STRING"}
            ];

            const store = mockStore({});

            store.dispatch(actions.changeStartYear(2020));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe("AC: getNextSemesterString", () => {
        it("Should create the action for generating the course", () => {
            const expectedAction = {
                type: "GET_NEXT_SEMESTER_STRING"
            };

            expect(actions.getNextSemesterString()).toEqual(expectedAction);
        });
    });

    /*
    Load course from local storage test should go here eventually
    */

    describe("AC: getAffectedUnitsInColumn", () => {
        it("Should create the action for getting affected units in an overload column", () => {
            const expectedAction = {
                type: "GET_AFFECTED_UNITS_IN_OVERLOAD_COLUMN",
                index: 4
            };

            expect(actions.getAffectedUnitsInColumn(4)).toEqual(expectedAction);
        });
    });

    describe("AC: attemptToDeleteTeachingPeriod", () => {
        it("Should correctly create the actions required for deletion of a teaching period with units affected", () => {
            const mockUnits = [{unitCode: "TEST101", unitName: "unit1"}, null, {unitCode: "TEST102", unitName: "unit2"}, null, null];
            const expectedActions = [
                {type: "SHOW_CONFIRM_DELETE_TEACHING_PERIOD_MODAL"},
                {type: "UPDATE_AFFECTED_UNITS", affectedUnits: ["TEST101 - unit1", "TEST102 - unit2"]},
                {type: "UPDATE_INDEX_OF_TP_TO_REMOVE", index: 1}
            ];

            const store = mockStore({});

            store.dispatch(actions.attemptToDeleteTeachingPeriod(1, mockUnits));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it("Should correctly create the actions required for deletion of a teaching period with no units affected", () => {
            const mockUnits = [null, null, null, null, null];
            const expectedActions = [
                {type: "REMOVE_TEACHING_PERIOD", index: 1, units: [null, null, null, null, null]},
                {
                    type: "VALIDATE_COURSE"
                },
                {
                    type: "MODIFIED_COURSE_PLAN"
                },
                {type: "GET_NEXT_SEMESTER_STRING"}
            ];

            const store = mockStore({});

            store.dispatch(actions.attemptToDeleteTeachingPeriod(1, mockUnits));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe("AC: attemptToDecreaseStudyLoad", () => {
        it("Should correctly create the actions required for decrease of a study load with units affected", () => {
            const mockTeachingPeriods = [
                {units: [null, null, {unitCode: "TEST10A", unitName: "unitA"}, null, {unitCode: "TEST101", unitName: "unit1", creditPoints: 6}]},
                {units: [null, null, {unitCode: "TEST10B", unitName: "unitB"}, null, null]},
                {units: [null, null, {unitCode: "TEST10C", unitName: "unitC"}, null, {unitCode: "TEST102", unitName: "unit2", creditPoints: 6}]},
                {units: [null, null, {unitCode: "TEST10D", unitName: "unitD"}, null, null]},

            ];
            const expectedActions = [
                {type: "SHOW_CONFIRM_DECREASE_STUDY_LOAD_MODAL"},
                {type: "UPDATE_AFFECTED_UNITS", affectedUnits: ["TEST101 - unit1", "TEST102 - unit2"]}
            ];

            const store = mockStore({});

            store.dispatch(actions.attemptToDecreaseStudyLoad(mockTeachingPeriods, 4));
            expect(store.getActions()).toEqual(expectedActions);
        });

        it("Should correctly create the actions required for decrease of a study load with no units affected", () => {
            const mockTeachingPeriods = [
                {units: [null, null, {unitCode: "TEST10A", unitName: "unitA"}, null, null]},
                {units: [null, null, {unitCode: "TEST10B", unitName: "unitB"}, null, null]},
                {units: [null, null, {unitCode: "TEST10C", unitName: "unitC"}, null, null]},
                {units: [null, null, {unitCode: "TEST10D", unitName: "unitD"}, null, null]},

            ];
            
            const expectedActions = [
                {type: "PREP_FOR_DELETION", unitCoords: []},
                {type: "DECREASE_STUDY_LOAD", units: []},
            ];

            const store = mockStore({});

            store.dispatch(actions.attemptToDecreaseStudyLoad(mockTeachingPeriods, 4));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe("AC: getAffectedUnitsInRow", () => {
        it("Should create the action for getting affected units in an teaching period row", () => {
            const expectedAction = {
                type: "GET_AFFECTED_UNITS_IN_TEACHING_PERIOD_ROW",
                index: 4
            };

            expect(actions.getAffectedUnitsInRow(4)).toEqual(expectedAction);
        });
    });

    /*
    saveCourseToLocalStorage test goes here... not sure how to mock it yet
    */

    /*
    movingUnit test goes here...
    */

    /*
    cancelMovingUnit test goes here...
    */

    /*
    moveUnit test goes here...
    */

    /*
    swapUnit test goes here...
    */

    describe("AC: validateCourse", () => {
        it("Should create the action for validating the course", () => {
            const expectedAction = {
                type: "VALIDATE_COURSE"
            };

            expect(actions.validateCourse()).toEqual(expectedAction);
        });
    });

    describe("AC: highlightInvalidUnitSlots", () => {
        it("Should create the action for highlighting the invalid unit slots", () => {
            const expectedAction = {
                type: "HIGHLIGHT_INVALID_UNIT_SLOTS",
                tempUnit: "UnitTest",
                ignoreCoordinate: false
            };

            expect(actions.highlightInvalidUnitSlots("UnitTest", false)).toEqual(expectedAction);
        });
    });

    describe("AC: clearHighlightingInvalidUnitSlots", () => {
        it("Should create the action for clearing the highlighting for invalid unit slots", () => {
            const expectedAction = {
                type: "CLEAR_HIGHLIGHTING_INVALID_UNIT_SLOTS"
            };

            expect(actions.clearHighlightingInvalidUnitSlots()).toEqual(expectedAction);
        });
    });


});

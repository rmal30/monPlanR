import expect from "expect";
import deepFreeze from "deep-freeze";
import Course from "../app/reducers/Course";
import { describe, it } from "mocha";


describe("REDUCER: CourseStructure", () => {
    
    describe("ACTION: INSERT_TEACHING_PERIOD", () => {
        it("Should insert a teaching period with the given info correctly into middle of array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] }, 
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };

            const action = {
                type: "INSERT_TEACHING_PERIOD",
                year: 2018,
                code: "S2-01",
                index: 1
            };

            const stateAfter = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] }, 
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
            
        });
        
        it("Should insert a teaching period with the given info correctly into start of array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] }, 
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };

            const action = {
                type: "INSERT_TEACHING_PERIOD",
                year: 2016,
                code: "S2-01",
                index: 0
            };

            const stateAfter = {
                teachingPeriods: [
                    { year: 2016, code: "S2-01", units: [null, null, null, null] },
                    { year: 2017, code: "S2-01", units: [null, null, null, null] }, 
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
            
        });
    });

    describe("ACTION: REMOVE_TEACHING_PERIOD", () => {
        it("Should remove a teaching period at the given index", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };
            const action = {
                type: "REMOVE_TEACHING_PERIOD",
                index: 1
            };
            const stateAfter = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
        it("Should remove a teaching period at the start of the array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };
            const action = {
                type: "REMOVE_TEACHING_PERIOD",
                index: 0
            };
            const stateAfter = {
                teachingPeriods: [
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: ADD_TEACHING_PERIOD", () => {
        it("Should add the given teaching period to the end of the array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2018, code: "S2-01", units: [null, null, null, null] }, 
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };
            const action = {
                type: "ADD_TEACHING_PERIOD",
                year: 2017,
                code: "S2-01",
            };
            const stateAfter = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] }, 
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: INCREASE_STUDY_LOAD", () => {
        it("Should increase the study load if the study load is less than 4", () => {
            const stateBefore = {
                teachingPeriods: [{ year: 2018, code: "S2-01", units: [null, null, null, null] }], 
                numberOfUnits: 4
            };
            const action = {
                type: "INCREASE_STUDY_LOAD"
            };
            const stateAfter = {
                teachingPeriods: [{ year: 2018, code: "S2-01", units: [null, null, null, null, null] }], 
                numberOfUnits: 5
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });

        it("Should not increase the study load if the study load is 6 or greater", () => {
            const stateBefore = {
                teachingPeriods: [{ year: 2018, code: "S2-01", units: [null, null, null, null, null, null] }], 
                numberOfUnits: 6
            };
            const action = {
                type: "INCREASE_STUDY_LOAD"
            };
            const stateAfter = {
                teachingPeriods: [{ year: 2018, code: "S2-01", units: [null, null, null, null, null, null] }], 
                numberOfUnits: 6
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: DECREASE_STUDY_LOAD", () => {
        it("Should decrease the study load if the study load is greater than 4", () => {
            const stateBefore = {
                teachingPeriods: [{ year: 2018, code: "S2-01", units: [null, null, null, null, null] }], 
                numberOfUnits: 5
            };
            const action = {
                type: "DECREASE_STUDY_LOAD"
            };
            const stateAfter = {
                teachingPeriods: [{ year: 2018, code: "S2-01", units: [null, null, null, null] }], 
                numberOfUnits: 4
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });

        it("Should not decrease the study load if the study load is 4 or less", () => {
            const stateBefore = {
                teachingPeriods: [{ year: 2018, code: "S2-01", units: [null, null, null, null] }], 
                numberOfUnits: 4
            };
            const action = {
                type: "DECREASE_STUDY_LOAD"
            };
            const stateAfter = {
                teachingPeriods: [{ year: 2018, code: "S2-01", units: [null, null, null, null] }], 
                numberOfUnits: 4
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: CLEAR_COURSE", () => {
        it("Should remove all teaching periods and set the amount of units to 4", () => {
            const stateBefore = {
                teachingPeriods: [{ year: 2018, code: "S2-01", units: [null, null, null, null, null] }], 
                numberOfUnits: 5
            };
            
            const action = {
                type: "CLEAR_COURSE"
            };

            const stateAfter = {
                teachingPeriods: [],
                numberOfUnits: 4
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: ADD_UNIT", () => {
        it("Should add a unit correctly to the start of an array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };
            
            const action = {
                type: "ADD_UNIT",
                tpIndex: 0,
                unitIndex: 0,
                unit: {unitCode: "XXX0001", unitName: "Test Unit"}
            };

            const stateAfter = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [{unitCode: "XXX0001", unitName: "Test Unit"}, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });

        it("Should add a unit correctly to the middle of an array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };
            
            const action = {
                type: "ADD_UNIT",
                tpIndex: 1,
                unitIndex: 1,
                unit: {unitCode: "XXX0001", unitName: "Test Unit"}
            };

            const stateAfter = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, {unitCode: "XXX0001", unitName: "Test Unit"}, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });

        it("Should add a unit correctly to the end of an array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };
            
            const action = {
                type: "ADD_UNIT",
                tpIndex: 2,
                unitIndex: 3,
                unit: {unitCode: "XXX0001", unitName: "Test Unit"}
            };

            const stateAfter = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, {unitCode: "XXX0001", unitName: "Test Unit"}] }
                ], 
                numberOfUnits: 4
            };

            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: REMOVE_UNIT", () => {
        it("Should remove a unit correctly frpm the start of an array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [{unitCode: "XXX0001", unitName: "Test Unit"}, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };
            
            const action = {
                type: "REMOVE_UNIT",
                tpIndex: 0,
                unitIndex: 0
            };

            const stateAfter = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });

        it("Should remove a unit correctly from the middle of an array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, {unitCode: "XXX0001", unitName: "Test Unit"}, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };
            
            const action = {
                type: "REMOVE_UNIT",
                tpIndex: 1,
                unitIndex: 1
            };

            const stateAfter = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });

        it("Should remove a unit correctly from the end of an array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, {unitCode: "XXX0001", unitName: "Test Unit"}] }
                ], 
                numberOfUnits: 4
            };
            
            const action = {
                type: "REMOVE_UNIT",
                tpIndex: 2,
                unitIndex: 3
            };

            const stateAfter = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ], 
                numberOfUnits: 4
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: FETCH_COURSE_INFO_PENDING", () =>{
        it("Should correctly show that the course info is loading", () => {
            const stateBefore = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: false,
                data: null
            };

            const action = {
                type: "FETCH_COURSE_INFO_PENDING"
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: true,
                data: null
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: FETCH_COURSE_INFO_FULFILLED", () => {
        it("Should correctly return the payload and show that it is no longer loading", () => {
            const stateBefore = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: true,
                data: null
            };

            const action = {
                type: "FETCH_COURSE_INFO_FULFILLED",
                payload: "Fake Course Data"
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: false,
                data: "Fake Course Data"
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: FETCH_COURSE_INFO_REJECTED", () => {
        it("Should correctly show that the course info fetch failed and show that it is no longer loading", () => {
            const stateBefore = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: true,
                data: null
            };

            const action = {
                type: "FETCH_COURSE_INFO_REJECTED"
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: true,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: false,
                data: null
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: FETCH_COURSE_TEMPLATE_PENDING", () => {
        it("Should correctly show that the course template is loading", () => {
            const stateBefore = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: false,
                data: null
            };

            const action = {
                type: "FETCH_COURSE_TEMPLATE_PENDING"
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: true,
                data: null
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: FETCH_COURSE_TEMPLATE_FULFILLED", () => {
        it("Should correctly return the payload and show that it is no longer loading", () => {
            const stateBefore = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: true,
                data: null
            };

            const action = {
                type: "FETCH_COURSE_TEMPLATE_FULFILLED",
                payload: "Fake Course Template"
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: false,
                data: "Fake Course Template"
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: FETCH_COURSE_TEMPLATE_REJECTED", () => {
        it("Should correctly show that the course template fetch failed and show that it is no longer loading", () => {
            const stateBefore = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: true,
                data: null
            };

            const action = {
                type: "FETCH_COURSE_TEMPLATE_REJECTED"
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: true,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: false,
                data: null
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: FETCH_UNIT_INFO_PENDING", () => {
        it("Should correctly show that the unit info is loading", () => {
            const stateBefore = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: false,
                data: null
            };

            const action = {
                type: "FETCH_UNIT_INFO_PENDING"
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: true,
                courseLoading: false,
                data: null
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: FETCH_UNIT_INFO_FULFILLED", () => {
        it("Should correctly return the payload and show that it is no longer loading", () => {
            const stateBefore = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: true,
                courseLoading: false,
                data: null
            };  

            const action = {
                type: "FETCH_UNIT_INFO_FULFILLED",
                payload: "Fake Unit Info"
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: false,
                data: "Fake Unit Info"
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: FETCH_UNIT_INFO_REJECTED", () => {
        it("Should correctly show that the unit info fetch failed and show that it is no longer loading", () => {
            const stateBefore = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: true,
                courseLoading: false,
                data: null
            };

            const action = {
                type: "FETCH_UNIT_INFO_REJECTED"
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: true,
                unitLoading: false,
                courseLoading: false,
                data: null
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                Course(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });
});

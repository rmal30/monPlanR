import expect from "expect";
import deepFreeze from "deep-freeze";
import CourseStructure from "../app/reducers/CourseStructure";
import { describe, it } from "mocha";


describe("REDUCER: CourseStructure", () => {
    
    describe("ACTION: INSERT_TEACHING_PERIOD", () => {
        it("Should insert a teaching period with the given info correctly into middle of array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [] }, 
                    { year: 2019, code: "S2-01", units: [] }
                ], 
                units: 4
            };

            const action = {
                type: "INSERT_TEACHING_PERIOD",
                year: 2018,
                code: "S2-01",
                index: 1
            };

            const stateAfter = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [] },
                    { year: 2018, code: "S2-01", units: [] }, 
                    { year: 2019, code: "S2-01", units: [] }
                ], 
                units: 4
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                CourseStructure(stateBefore, action)
            ).toEqual(stateAfter);
            
        });
        
        it("Should insert a teaching period with the given info correctly into start of array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [] }, 
                    { year: 2019, code: "S2-01", units: [] }
                ], 
                units: 4
            };

            const action = {
                type: "INSERT_TEACHING_PERIOD",
                year: 2016,
                code: "S2-01",
                index: 0
            };

            const stateAfter = {
                teachingPeriods: [
                    { year: 2016, code: "S2-01", units: [] },
                    { year: 2017, code: "S2-01", units: [] }, 
                    { year: 2019, code: "S2-01", units: [] }
                ], 
                units: 4
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                CourseStructure(stateBefore, action)
            ).toEqual(stateAfter);
            
        });

        describe("ACTION: REMOVE_TEACHING_PERIOD", () => {
            it("Should remove a teaching period at the given index", () => {
                const stateBefore = {
                    teachingPeriods: [
                        { year: 2017, code: "S2-01", units: [] },
                        { year: 2018, code: "S2-01", units: [] },
                        { year: 2019, code: "S2-01", units: [] }
                    ], 
                    units: 4
                };

                const action = {
                    type: "REMOVE_TEACHING_PERIOD",
                    index: 1
                };

                const stateAfter = {
                    teachingPeriods: [
                        { year: 2017, code: "S2-01", units: [] },
                        { year: 2019, code: "S2-01", units: [] }
                    ], 
                    units: 4
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    CourseStructure(stateBefore, action)
                ).toEqual(stateAfter);
            });
            it("Should remove a teaching period at the start of the array", () => {
                const stateBefore = {
                    teachingPeriods: [
                        { year: 2017, code: "S2-01", units: [] },
                        { year: 2018, code: "S2-01", units: [] },
                        { year: 2019, code: "S2-01", units: [] }
                    ], 
                    units: 4
                };

                const action = {
                    type: "REMOVE_TEACHING_PERIOD",
                    index: 0
                };

                const stateAfter = {
                    teachingPeriods: [
                        { year: 2018, code: "S2-01", units: [] },
                        { year: 2019, code: "S2-01", units: [] }
                    ], 
                    units: 4
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    CourseStructure(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("ACTION: ADD_TEACHING_PERIOD", () => {
            it("Should add the given teaching period to the end of the array", () => {
                const stateBefore = {
                    teachingPeriods: [
                        { year: 2018, code: "S2-01", units: [] }, 
                        { year: 2019, code: "S2-01", units: [] }
                    ], 
                    units: 4
                };

                const action = {
                    type: "ADD_TEACHING_PERIOD",
                    year: 2017,
                    code: "S2-01",
                };

                const stateAfter = {
                    teachingPeriods: [
                        { year: 2017, code: "S2-01", units: [] },
                        { year: 2018, code: "S2-01", units: [] }, 
                        { year: 2019, code: "S2-01", units: [] }
                    ], 
                    units: 4
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    CourseStructure(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });
    });
});
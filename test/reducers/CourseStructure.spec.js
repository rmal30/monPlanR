import expect from "expect";
import deepFreeze from "deep-freeze";
import CourseStructure from "../../app/reducers/CourseStructure";
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: APPEND_TEACHING_PERIOD", () => {
        it("Should add the given teaching period to the end of the array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                numberOfUnits: 4
            };
            const action = {
                type: "APPEND_TEACHING_PERIOD",
                year: 2020,
                code: "S2-01",
            };
            const stateAfter = {
                teachingPeriods: [
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] },
                    { year: 2020, code: "S2-01", units: [null, null, null, null] }
                ],
                numberOfUnits: 4
            };
            deepFreeze(stateBefore);
            deepFreeze(action);
            expect(
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: GENERATE_COURSE", () => {
        it("Should generate a course structure with valid start and end years", () => {
            const stateBefore = {
                teachingPeriods: [],
                numberOfUnits: 4
            };

            const action = {
                type: "GENERATE_COURSE",
                startYear: 2014,
                endYear: 2016
            };

            const stateAfter = {
                teachingPeriods: [
                    { year: 2014, code: "S1-01", units: [null, null, null, null]},
                    { year: 2014, code: "S2-01", units: [null, null, null, null]},
                    { year: 2015, code: "S1-01", units: [null, null, null, null]},
                    { year: 2015, code: "S2-01", units: [null, null, null, null]},
                    { year: 2016, code: "S1-01", units: [null, null, null, null]},
                    { year: 2016, code: "S2-01", units: [null, null, null, null]}
                ],
                numberOfUnits: 4
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                CourseStructure(stateBefore, action)
            ).toEqual(stateAfter);
        });

        it("Should return an empty course structure with invalid start and end years.", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2014, code: "S1-01", units: [null, null, null, null]},
                    { year: 2014, code: "S2-01", units: [null, null, null, null]},
                    { year: 2015, code: "S1-01", units: [null, null, null, null]},
                    { year: 2015, code: "S2-01", units: [null, null, null, null]},
                    { year: 2016, code: "S1-01", units: [null, null, null, null]},
                    { year: 2016, code: "S2-01", units: [null, null, null, null]}
                ],
                numberOfUnits: 4
            };

            const action = {
                type: "GENERATE_COURSE",
                startYear: 2017,
                endYear: 2013
            };

            const stateAfter = {
                teachingPeriods: [],
                numberOfUnits: 4
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                CourseStructure(stateBefore, action)
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
                courseInfo: null
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
                courseInfo: null
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                CourseStructure(stateBefore, action)
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
                focusedCourse: null,
                courseInfo: null
            };

            const action = {
                type: "FETCH_COURSE_INFO_FULFILLED",
                payload: {data: {
                    courseName: "Test Course",
                    mangFac: "Test Faculty",
                    creditPoints: 100,
                    courseDescrip: "Test Description",
                    courseDuration: "Test Duration",
                    modeLoc: "Test mode and location",
                    courseAward: "Test awards",
                    abrevTitle: "Test abreviated title"
                }},
                courseCode: "COURSE101"
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: false,
                courseInfo: {
                    courseName: "Test Course",
                    faculty: "Test Faculty",
                    creditPoints: 100,
                    courseDescription: "Test Description",
                    durationStr: "Test Duration",
                    modeAndLocation: "Test mode and location",
                    awards: "Test awards",
                    abrTitle: "Test abreviated title"
                },
                focusedCourse: "COURSE101"
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                CourseStructure(stateBefore, action)
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
                courseInfo: null
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
                courseInfo: null
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                CourseStructure(stateBefore, action)
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
                unitInfo: null,
                focusedUnitCode: null
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
                unitInfo: null,
                focusedUnitCode: null
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                CourseStructure(stateBefore, action)
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
                unitInfo: null,
                focusedUnitCode: null
            };  

            const action = {
                type: "FETCH_UNIT_INFO_FULFILLED",
                payload: {data: "Fake Unit Info"},
                unitCode: "FAKE1001"
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: false,
                unitInfo: "Fake Unit Info",
                focusedUnitCode: "FAKE1001"
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                CourseStructure(stateBefore, action)
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
                unitInfo: null,
                focusedUnitCode: "FAKE1001"
            };

            const action = {
                type: "FETCH_UNIT_INFO_REJECTED",
                payload: "Error Msg"
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: true,
                unitLoading: false,
                courseLoading: false,
                unitInfo: null,
                focusedUnitCode: "FAKE1001"
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                CourseStructure(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: SUBMIT_COURSE_FORM", () => {
        it("Should accurately set the start year and the focused course on submission", () => {
            const stateBefore = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: true,
                courseLoading: false,
                unitInfo: null,
                focusedUnitCode: "FAKE1001",
                focusedCourse: null,
                startYear: 2016,
                endYear: 2020
            };

            const action = {
                type: "SUBMIT_COURSE_FORM",
                startYear: 2020,
                courseCode: "TEST1001"
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: true,
                courseLoading: false,
                unitInfo: null,
                focusedUnitCode: "FAKE1001",
                focusedCourse: "TEST1001",
                startYear: 2020,
                endYear: 2020
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                CourseStructure(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

    describe("ACTION: SUBMIT_YEAR_FORM", () => {
        it("Should accurately set the start year and end year on submission", () => {
            const stateBefore = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: true,
                courseLoading: false,
                unitInfo: null,
                focusedUnitCode: "FAKE1001",
                focusedCourse: null,
                startYear: 2016,
                endYear: 2020
            };

            const action = {
                type: "SUBMIT_YEAR_FORM",
                startYear: 2020,
                endYear: 2025
            };

            const stateAfter = {
                teachingPeriods: [], 
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: true,
                courseLoading: false,
                unitInfo: null,
                focusedUnitCode: "FAKE1001",
                focusedCourse: null,
                startYear: 2020,
                endYear: 2025
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(
                CourseStructure(stateBefore, action)
            ).toEqual(stateAfter);
        });
    });

});

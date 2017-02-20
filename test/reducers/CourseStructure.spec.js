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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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
                courseInfo: {
                    courseName: "",
                    faculty: "",
                    creditPoints: 0,
                    courseDescription: "",
                    durationStr: "",
                    modeAndLocation: "",
                    awards: "",
                    abrTitle: ""
                },
                teachingPeriods: [],
                numberOfUnits: 4
            };

            test(CourseStructure, stateBefore, action, stateAfter);
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
                numberOfUnits: 4,
                unitToAdd: "FIT1002",
                hidingPlaceholders: []
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
                numberOfUnits: 4,
                unitToAdd: undefined,
                hidingPlaceholders: []
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should add a unit correctly to the middle of an array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                numberOfUnits: 4,
                unitToAdd: "FIT1002",
                hidingPlaceholders: []
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
                numberOfUnits: 4,
                unitToAdd: undefined,
                hidingPlaceholders: []
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should add a unit correctly to the end of an array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                numberOfUnits: 4,
                unitToAdd: "FIT1002",
                hidingPlaceholders: []
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
                numberOfUnits: 4,
                unitToAdd: undefined,
                hidingPlaceholders: []
            };

            test(CourseStructure, stateBefore, action, stateAfter);
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
                numberOfUnits: 4,
                hidingPlaceholders: []
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
                numberOfUnits: 4,
                hidingPlaceholders: []
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should remove a unit correctly from the middle of an array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, {unitCode: "XXX0001", unitName: "Test Unit"}, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                numberOfUnits: 4,
                hidingPlaceholders: []
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
                numberOfUnits: 4,
                hidingPlaceholders: []
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should remove a unit correctly from the end of an array", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, {unitCode: "XXX0001", unitName: "Test Unit"}] }
                ],
                numberOfUnits: 4,
                hidingPlaceholders: []
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
                numberOfUnits: 4,
                hidingPlaceholders: []
            };

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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
                courseInfoLoading: false,
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
                courseInfoLoading: true,
                courseInfo: null
            };

            test(CourseStructure, stateBefore, action, stateAfter);
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
                courseInfoLoading: true,
                focusedCourse: null,
                courseInfo: null
            };

            const action = {
                type: "FETCH_COURSE_INFO_FULFILLED",
                payload: {data: {
                    "propertyMap": {
                        courseCode: "Test Code",
                        courseName: "Test Course",
                        mangFac: "Test Faculty",
                        creditPoints: 100,
                        courseDescrip: {
                            "value": "Test Description"
                        },
                        courseDuration: "Test Duration",
                        modeLoc: {
                            "value": "Test mode and location"
                        },
                        courseAward: "Test awards",
                        abrevTitle: "Test abreviated title"
                    }
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
                courseInfoLoading: false,
                courseInfo: {
                    courseCode: "Test Code",
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

            test(CourseStructure, stateBefore, action, stateAfter);
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
                courseInfoLoading: true,
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
                courseInfoLoading: false,
                courseInfo: null
            };

            test(CourseStructure, stateBefore, action, stateAfter);
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
                courseTemplateData: null
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
                courseTemplateData: null
            };

            test(CourseStructure, stateBefore, action, stateAfter);
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
                courseTemplateData: null
            };

            const action = {
                type: "FETCH_COURSE_TEMPLATE_FULFILLED",
                payload: {
                    data: {
                        propertyMap: "Fake Course Template"
                    }
                }
            };

            const stateAfter = {
                teachingPeriods: [],
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: false,
                unitLoading: false,
                courseLoading: false,
                courseTemplateData: "Fake Course Template"
            };

            test(CourseStructure, stateBefore, action, stateAfter);
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
                courseTemplateData: null
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
                courseTemplateData: null
            };

            test(CourseStructure, stateBefore, action, stateAfter);
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
                unitInfo: {
                    preqs: "",
                    creditPoints: 0,
                    rules: [],
                    locationAndTime: "",
                    enjoyScore: 0,
                    learnScore: 0,
                    learnResponse: 0,
                    proh: "",
                    scaBand: 0,
                    unitName: "",
                    enjoyResponse: 0,
                    faculty: "",
                    unitCode: "",
                    eftsl: 0,
                    descriptions: ""
                },
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
                unitInfo: {
                    preqs: "",
                    creditPoints: 0,
                    rules: [],
                    locationAndTime: "",
                    enjoyScore: 0,
                    learnScore: 0,
                    learnResponse: 0,
                    proh: "",
                    scaBand: 0,
                    unitName: "",
                    enjoyResponse: 0,
                    faculty: "",
                    unitCode: "",
                    eftsl: 0,
                    descriptions: ""
                },
                focusedUnitCode: null
            };

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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
                payload: {
                    response: {
                        status: 404
                    }
                }
            };

            const stateAfter = {
                teachingPeriods: [],
                numberOfUnits: 4,
                courseTemplateLoadError: false,
                courseInfoLoadError: false,
                unitLoadError: {
                    response: {
                        status: 404
                    }
                },
                unitLoading: false,
                courseLoading: false,
                unitInfo: null,
                focusedUnitCode: "FAKE1001"
            };

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });


    describe("ACTION: FETCH_TEACHING_PERIODS_PENDING", () => {
        it("Should correctly handle  of teaching periods data", () => {
            const stateBefore = {
                teachingPeriodData: null,
                teachingPeriodsDataLoading: false,
                teachingPeriodsDataError: false
            };

            const action = {
                type: "FETCH_TEACHING_PERIODS_PENDING"
            };

            const stateAfter = {
                teachingPeriodData: null,
                teachingPeriodsDataLoading: true,
                teachingPeriodsDataError: false
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_TEACHING_PERIODS_FULFILLED", () => {
        it("Should correctly handle  of teaching periods data", () => {
            const stateBefore = {
                teachingPeriodData: null,
                teachingPeriodsDataLoading: true,
                teachingPeriodsDataError: false
            };

            const action = {
                type: "FETCH_TEACHING_PERIODS_FULFILLED",
                payload: "Teaching period strings"
            };

            const stateAfter = {
                teachingPeriodData: "Teaching period strings",
                teachingPeriodsDataLoading: false,
                teachingPeriodsDataError: false
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_TEACHING_PERIODS_REJECTED", () => {
        it("Should correctly handle  of teaching periods data", () => {
            const stateBefore = {
                teachingPeriodData: null,
                teachingPeriodsDataLoading: true,
                teachingPeriodsDataError: false
            };

            const action = {
                type: "FETCH_TEACHING_PERIODS_REJECTED"
            };

            const stateAfter = {
                teachingPeriodData: null,
                teachingPeriodsDataLoading: false,
                teachingPeriodsDataError: true
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: SHOW_INSERT_TEACHING_PERIOD_UI", () => {
        it("Should set the teaching period code to insert value correctly", () => {
            const stateBefore = {
                teachingPeriodCodeToInsert: null,
                testParam1: 1,
                testParam2: "test"
            };

            const action = {
                type: "SHOW_INSERT_TEACHING_PERIOD_UI",
                tpCode: "S1-02"
            };

            const stateAfter = {
                teachingPeriodCodeToInsert: "S1-02",
                testParam1: 1,
                testParam2: "test"
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: UPLOAD_COURSE_SNAPSHOT_PENDING", () => {
        it("Should handle the initiation of a course snapshot upload correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotUploading: false,
                courseSnapshotUploadError: true,
                courseSnapshotUploadData: null,
                courseSnapshotUploadSucessful: true
            };

            const action = {
                type: "UPLOAD_COURSE_SNAPSHOT_PENDING",
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotUploading: true,
                courseSnapshotUploadError: false,
                courseSnapshotUploadData: null,
                courseSnapshotUploadSucessful: false
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: UPLOAD_COURSE_SNAPSHOT_FULFILLED", () => {
        it("Should handle the successful upload of a course snapshot correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotUploading: true,
                courseSnapshotUploadError: false,
                courseSnapshotUploadData: null,
                courseSnapshotUploadSucessful: false
            };

            const action = {
                type: "UPLOAD_COURSE_SNAPSHOT_FULFILLED",
                payload: {data: "upload string"}
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotUploading: false,
                courseSnapshotUploadError: false,
                courseSnapshotUploadData: "upload string",
                courseSnapshotUploadSucessful: true
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: UPLOAD_COURSE_SNAPSHOT_REJECTED", () => {
        it("Should do handle the rejected upload of a course snapshot correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotUploading: true,
                courseSnapshotUploadError: false,
                courseSnapshotUploadData: null,
                courseSnapshotUploadSucessful: false
            };

            const action = {
                type: "UPLOAD_COURSE_SNAPSHOT_REJECTED",
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotUploading: false,
                courseSnapshotUploadError: true,
                courseSnapshotUploadData: null,
                courseSnapshotUploadSucessful: false
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });


    describe("ACTION: FETCH_COURSE_SNAPSHOT_PENDING", () => {
        it("Should begin fetching a course snapshot correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotLoading: false,
                courseSnapshotLoadError: true,
                courseSnapshotData: null,
            };

            const action = {
                type: "FETCH_COURSE_SNAPSHOT_PENDING",
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotLoading: true,
                courseSnapshotLoadError: false,
                courseSnapshotData: null,
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_COURSE_SNAPSHOT_FULFILLED", () => {
        it("Should handle a successful course snapshot fetch correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotLoading: true,
                courseSnapshotLoadError: false,
                courseSnapshotData: null,
            };

            const action = {
                type: "FETCH_COURSE_SNAPSHOT_FULFILLED",
                payload: {data: "Snap data"}
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotLoading: false,
                courseSnapshotLoadError: false,
                courseSnapshotData: "Snap data",
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_COURSE_SNAPSHOT_REJECTED", () => {
        it("Should handle a rejected course snapshot fetch correctly", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotLoading: true,
                courseSnapshotLoadError: false,
                courseSnapshotData: null,
            };

            const action = {
                type: "FETCH_COURSE_SNAPSHOT_REJECTED",
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                courseSnapshotLoading: false,
                courseSnapshotLoadError: true,
                courseSnapshotData: null,
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
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

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: UPDATE_AFFECTED_UNITS", () => {
        it("Should correctly update the affected units value to the given array", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                affectedUnits: []
            };

            const action = {
                type: "UPDATE_AFFECTED_UNITS",
                affectedUnits: ["TestUnit", "OtherTestUnit"]
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                affectedUnits: ["TestUnit", "OtherTestUnit"]
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: UPDATE_INDEX_OF_TP_TO_REMOVE", () => {
        it("Should correctly update the index of tp to remove value to the given value", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                indexOfTPtoRemove: 0

            };

            const action = {
                type: "UPDATE_INDEX_OF_TP_TO_REMOVE",
                index: 1
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                indexOfTPtoRemove: 1

            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: UPDATE_UNIT_TO_ADD", () => {
        it("Should correctly set the unit to add to the new unit", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitInfo: "TestUnit",
                unitToAdd: undefined
            };

            const action = {
                type: "UPDATE_UNIT_TO_ADD"
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitInfo: "TestUnit",
                unitToAdd: "TestUnit"

            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: UPDATE_UNIT_IS_BEING_DRAGGED", () => {
        it("Should correctly set a non-dragging unit being dragged", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitIsBeingDragged: false
            };

            const action = {
                type: "UPDATE_UNIT_IS_BEING_DRAGGED",
                isDragging: true
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitIsBeingDragged: true
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should correctly set a dragging unit to be not dragged", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitIsBeingDragged: true
            };

            const action = {
                type: "UPDATE_UNIT_IS_BEING_DRAGGED",
                isDragging: false
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitIsBeingDragged: false
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: MOVING_UNIT", () => {
        it("Should correctly begin moving a unit", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: undefined,
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 0
            };

            const action = {
                type: "MOVING_UNIT",
                unit: "TEST-UNIT",
                unitIndex: 3,
                tpIndex: 1
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: "TEST-UNIT",
                tpIndexOfUnitToBeMoved: 1,
                unitsIndexOfUnitToBeMoved: 3
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: MOVE_UNIT", () => {
        it("Should correctly handle moving a unit to a teaching period earlier than it", () => {
            //oldtp > newtp
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: "TestUnit",
                tpIndexOfUnitToBeMoved: 1,
                unitsIndexOfUnitToBeMoved: 2,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, "PlaceToMoveTo", null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, "TestUnit", null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                hidingPlaceholders: []
            };

            const action = {
                type: "MOVE_UNIT",
                newTPIndex: 0,
                newUnitIndex: 1

            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: undefined,
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 0,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, "TestUnit", null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                hidingPlaceholders: []
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should correctly handle moving a unit to a teaching period later than it", () => {
            //newtp > oldtp
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: "TestUnit",
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 1,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, "TestUnit", null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, "PlaceToMoveTo", null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                hidingPlaceholders: []
            };

            const action = {
                type: "MOVE_UNIT",
                newTPIndex: 1,
                newUnitIndex: 2
            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: undefined,
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 0,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, "TestUnit", null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                hidingPlaceholders: []
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should correctly handle moving a unit to the same teaching period but earlier position", () => {
            //newtp = oldtp && oldUnitPosition > newUnitPosition
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: "TestUnit",
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 1,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: ["PlaceToMoveTo", "TestUnit", null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                hidingPlaceholders: []
            };

            const action = {
                type: "MOVE_UNIT",
                newTPIndex: 0,
                newUnitIndex: 0

            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: undefined,
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 0,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: ["TestUnit", null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                hidingPlaceholders: []
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should correctly handle moving a unit to the same teaching period but later position", () => {
            //newtp = oldtp && newUnitPosition > oldUnitPosition
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: "TestUnit",
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 0,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: ["TestUnit", null, "PlaceToMoveTo", null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                hidingPlaceholders: []
            };

            const action = {
                type: "MOVE_UNIT",
                newTPIndex: 0,
                newUnitIndex: 2

            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: undefined,
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 0,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, "TestUnit", null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                hidingPlaceholders: []
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should correctly handle moving a unit to the same teaching period and exact same position", () => {
            //newtp = oldtp && newUnitPosition = oldUnitPosition
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: "TestUnit",
                tpIndexOfUnitToBeMoved: 1,
                unitsIndexOfUnitToBeMoved: 2,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, "TestUnit", null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                hidingPlaceholders: []
            };

            const action = {
                type: "MOVE_UNIT",
                newTPIndex: 1,
                newUnitIndex: 2

            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: undefined,
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 0,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, "TestUnit", null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ],
                hidingPlaceholders: []
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: CANCEL_MOVING_UNIT", () => {
        it("should cancel moving unit", () => {
            const stateBefore = {
                teachingPeriods: [
                    { year: 2015, code: "S1-01", units: [null, null, null, "TestUnit"]},
                    { year: 2015, code: "S2-01", units: [null, "TestUnit2", null, null]},
                    { year: 2016, code: "S1-01", units: ["TestUnit3", null, null, null]},
                    { year: 2016, code: "S2-01", units: [null, null, "TestUnit4", null]}
                ],
                unitToBeMoved: "TestUnit2",
                tpIndexOfUnitToBeMoved: 1,
                unitsIndexOfUnitToBeMoved: 2
            };

            const action = {
                type: "CANCEL_MOVING_UNIT"
            };

            const stateAfter = {
                teachingPeriods: [
                    { year: 2015, code: "S1-01", units: [null, null, null, "TestUnit"]},
                    { year: 2015, code: "S2-01", units: [null, "TestUnit2", null, null]},
                    { year: 2016, code: "S1-01", units: ["TestUnit3", null, null, null]},
                    { year: 2016, code: "S2-01", units: [null, null, "TestUnit4", null]}
                ],
                unitToBeMoved: undefined,
                tpIndexOfUnitToBeMoved: undefined,
                unitsIndexOfUnitToBeMoved: undefined
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: SWAP_UNIT", () => {
        it("Should correctly handle swaping a unit to a teaching period earlier than it", () => {
            //oldtp > newtp
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: "TestUnit",
                tpIndexOfUnitToBeMoved: 1,
                unitsIndexOfUnitToBeMoved: 2,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, "PlaceToMoveTo", null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, "TestUnit", null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ]
            };

            const action = {
                type: "SWAP_UNIT",
                newTPIndex: 0,
                newUnitIndex: 1,
                unitToSwap: "PlaceToMoveTo"

            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: undefined,
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 0,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, "TestUnit", null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, "PlaceToMoveTo", null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ]
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should correctly handle swaping a unit to a teaching period later than it", () => {
            //newtp > oldtp
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: "TestUnit",
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 1,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, "TestUnit", null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, "PlaceToMoveTo", null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ]
            };

            const action = {
                type: "SWAP_UNIT",
                newTPIndex: 1,
                newUnitIndex: 2,
                unitToSwap: "PlaceToMoveTo"

            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: undefined,
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 0,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, "PlaceToMoveTo", null , null] },
                    { year: 2018, code: "S2-01", units: [null, null, "TestUnit", null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ]
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should correctly handle swaping a unit to the same teaching period but earlier position", () => {
            //newtp = oldtp && oldUnitPosition > newUnitPosition
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: "TestUnit",
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 1,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: ["PlaceToMoveTo", "TestUnit", null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ]
            };

            const action = {
                type: "SWAP_UNIT",
                newTPIndex: 0,
                newUnitIndex: 0,
                unitToSwap: "PlaceToMoveTo"

            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: undefined,
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 0,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: ["TestUnit", "PlaceToMoveTo", null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ]
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should correctly handle swaping a unit to the same teaching period but later position", () => {
            //newtp = oldtp && newUnitPosition > oldUnitPosition
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: "TestUnit",
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 0,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: ["TestUnit", null, "PlaceToMoveTo", null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ]
            };

            const action = {
                type: "SWAP_UNIT",
                newTPIndex: 0,
                newUnitIndex: 2,
                unitToSwap: "PlaceToMoveTo"

            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: undefined,
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 0,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: ["PlaceToMoveTo", null, "TestUnit", null] },
                    { year: 2018, code: "S2-01", units: [null, null, null, null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ]
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should correctly handle swaping a unit to the same teaching period and exact same position", () => {
            //newtp = oldtp && newUnitPosition = oldUnitPosition
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: "TestUnit",
                tpIndexOfUnitToBeMoved: 1,
                unitsIndexOfUnitToBeMoved: 2,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, "TestUnit", null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ]
            };

            const action = {
                type: "SWAP_UNIT",
                newTPIndex: 1,
                newUnitIndex: 2,
                unitToSwap: "PlaceToMoveTo"

            };

            const stateAfter = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: undefined,
                tpIndexOfUnitToBeMoved: 0,
                unitsIndexOfUnitToBeMoved: 0,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, "TestUnit", null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ]
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: VALIDATE_COURSE", () => {
        it("should give no errors for an empty course plan.", () => {
            const stateBefore = {
                teachingPeriods: [],
                courseErrors: [{
                    message: "ABC1234 already exists in your course plan."
                }],
                courseInfo: {}
            };

            const action = {
                type: "VALIDATE_COURSE"
            };

            const stateAfter = {
                teachingPeriods: [],
                courseErrors: [],
                courseInfo: {}
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        describe("duplicates:", () => {
            it("Should not give duplicate unit errors if the first attempt is in the past, and the second attempt is not two or more years into the future.", () => {
                const stateBefore = {
                    teachingPeriods: [
                        {
                            code: "S1-01",
                            year: new Date().getFullYear() - 1,
                            units: [
                                null,
                                {
                                    unitCode: "ABCD1234"
                                },
                                null,
                                null
                            ]
                        },
                        {
                            code: "S1-01",
                            year: new Date().getFullYear() + 1,
                            units: [
                                null,
                                null,
                                null,
                                {
                                    unitCode: "ABCD1234"
                                }
                            ]
                        }
                    ],
                    courseErrors: [],
                    courseInfo: {}
                };

                const action = {
                    type: "VALIDATE_COURSE"
                };

                test(CourseStructure, stateBefore, action, stateBefore);
            });

            it("Should give a duplicate unit error if there are two same units in the same teaching period", () => {
                const stateBefore = {
                    teachingPeriods: [
                        {
                            code: "S1-01",
                            year: 2015,
                            units: [
                                null,
                                {
                                    unitCode: "ABCD1234"
                                },
                                null,
                                {
                                    unitCode: "ABCD1234"
                                }
                            ]
                        },
                        {
                            code: "S2-01",
                            year: 2015,
                            units: [
                                null,
                                null,
                                null,
                                {
                                    unitCode: "GJQ2039"
                                }
                            ]
                        }
                    ],
                    courseErrors: []
                };

                const action = {
                    type: "VALIDATE_COURSE"
                };

                const stateAfter = {
                    teachingPeriods: [
                        {
                            code: "S1-01",
                            year: 2015,
                            units: [
                                null,
                                {
                                    unitCode: "ABCD1234"
                                },
                                null,
                                {
                                    unitCode: "ABCD1234"
                                }
                            ]
                        },
                        {
                            code: "S2-01",
                            year: 2015,
                            units: [
                                null,
                                null,
                                null,
                                {
                                    unitCode: "GJQ2039"
                                }
                            ]
                        }
                    ],
                    courseErrors: [
                        {
                            message: "ABCD1234 already exists in the same teaching period. Please remove this unit.",
                            coordinates: [[0, 3]]
                        }
                    ]
                };

                test(CourseStructure, stateBefore, action, stateAfter);
            });

            it("Should give a duplicate error if a duplicate unit is placed in a teaching period two years from now", () => {
                const currentYear = new Date().getFullYear();

                const stateBefore = {
                    teachingPeriods: [
                        {
                            code: "S1-01",
                            year: currentYear,
                            units: [
                                {
                                    unitCode: "ABC1234"
                                },
                                null,
                                null,
                                null
                            ]
                        },
                        {
                            code: "S2-01",
                            year: currentYear,
                            units: [null, null, null, null]
                        },
                        {
                            code: "S1-01",
                            year: currentYear + 1,
                            units: [null, null, null, null]
                        },
                        {
                            code: "S2-01",
                            year: currentYear + 1,
                            units: [null, null, null, null]
                        },
                        {
                            code: "S1-01",
                            year: currentYear + 2,
                            units: [
                                null,
                                {
                                    unitCode: "ABC1234"
                                },
                                null,
                                null
                            ]
                        },
                        {
                            code: "S2-01",
                            year: currentYear + 2,
                            units: [null, null, null, null]
                        }
                    ],
                    courseErrors: []
                };

                const action = {
                    type: "VALIDATE_COURSE"
                };

                const stateAfter = {
                    teachingPeriods: [
                        {
                            code: "S1-01",
                            year: currentYear,
                            units: [
                                {
                                    unitCode: "ABC1234"
                                },
                                null,
                                null,
                                null
                            ]
                        },
                        {
                            code: "S2-01",
                            year: currentYear,
                            units: [null, null, null, null]
                        },
                        {
                            code: "S1-01",
                            year: currentYear + 1,
                            units: [null, null, null, null]
                        },
                        {
                            code: "S2-01",
                            year: currentYear + 1,
                            units: [null, null, null, null]
                        },
                        {
                            code: "S1-01",
                            year: currentYear + 2,
                            units: [
                                null,
                                {
                                    unitCode: "ABC1234"
                                },
                                null,
                                null
                            ]
                        },
                        {
                            code: "S2-01",
                            year: currentYear + 2,
                            units: [null, null, null, null]
                        }
                    ],
                    courseErrors: [
                        {
                            message: "ABC1234 already exists in your course plan. Please plan as if you will pass all units.",
                            coordinates: [[4, 1]]
                        }
                    ]
                };

                test(CourseStructure, stateBefore, action, stateAfter);
            });
        });

        describe("offerings:", () => {
            it("Should give a course error for a unit not being offered in the teaching period it is in", () => {
                const stateBefore = {
                    teachingPeriods: [
                        {
                            code: "S1-01",
                            year: 2017,
                            units: [
                                null,
                                null,
                                null,
                                null
                            ]
                        },
                        {
                            code: "S2-01",
                            year: 2017,
                            units: [
                                null,
                                null,
                                {
                                    unitCode: "ABC1234",
                                    unitName: "Example unit",
                                    locationAndTime: [
                                        {
                                            location: "Clayton",
                                            time: [
                                                "First semester 2017 (Day)"
                                            ]
                                        }
                                    ]
                                },
                                null
                            ]
                        }
                    ],
                    courseErrors: [],
                    courseInfo: {}
                };

                const action = {
                    type: "VALIDATE_COURSE"
                };

                const stateAfter = {
                    teachingPeriods: [
                        {
                            code: "S1-01",
                            year: 2017,
                            units: [
                                null,
                                null,
                                null,
                                null
                            ]
                        },
                        {
                            code: "S2-01",
                            year: 2017,
                            units: [
                                null,
                                null,
                                {
                                    unitCode: "ABC1234",
                                    unitName: "Example unit",
                                    locationAndTime: [
                                        {
                                            location: "Clayton",
                                            time: [
                                                "First semester 2017 (Day)"
                                            ]
                                        }
                                    ]
                                },
                                null
                            ]
                        }
                    ],
                    courseErrors: [
                        {
                            message: "ABC1234 is not offered in second semester, 2017.",
                            coordinates: [[1, 2]]
                        }
                    ],
                    courseInfo: {}
                };

                test(CourseStructure, stateBefore, action, stateAfter);
            });
        });

        describe("rules:", () => {
            it("Should give a course error for a missing prereq", () => {
                const stateBefore = {
                    teachingPeriods: [
                        {
                            code: "S1-01",
                            year: 2017,
                            units: [
                                null,
                                null,
                                null,
                                {
                                    unitCode: "ABC1234",
                                    unitName: "Example unit",
                                    rules: [
                                        {
                                            ruleSummary: "PREREQ-IW",
                                            ruleString: "Must have passed an (I/W) unit in {DEF2345, QLS2029}",
                                            endDate: ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    courseErrors: [],
                    courseInfo: {}
                };

                const action = {
                    type: "VALIDATE_COURSE"
                };

                const stateAfter = {
                    teachingPeriods: [
                        {
                            code: "S1-01",
                            year: 2017,
                            units: [
                                null,
                                null,
                                null,
                                {
                                    unitCode: "ABC1234",
                                    unitName: "Example unit",
                                    rules: [
                                        {
                                            ruleSummary: "PREREQ-IW",
                                            ruleString: "Must have passed an (I/W) unit in {DEF2345, QLS2029}",
                                            endDate: ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    courseErrors: [
                        {
                            message: "You must complete DEF2345 or QLS2029 before you can do ABC1234.",
                            coordinates: [[0, 3]]
                        }
                    ],
                    courseInfo: {}
                };

                test(CourseStructure, stateBefore, action, stateAfter);
            });

            it("Should give an error for credit points being lower than the minimum required for the unit", () => {
                const stateBefore = {
                    teachingPeriods: [
                        {
                            year: 2016,
                            code: "S2-01",
                            units: [
                                {
                                    unitCode: "TEST1011",
                                    creditPoints: 6
                                },
                                null,
                                null,
                                null,
                                null
                            ]
                        },
                        {
                            year: 2017,
                            code: "S1-01",
                            units: [null, null, null, null, null]
                        },
                        {
                            year: 2017,
                            code: "S2-01",
                            units: [
                                null,
                                {
                                    unitCode: "TEST3031",
                                    creditPoints: 6,
                                    rules: [
                                        {
                                            ruleSummary: "PREREQ",
                                            ruleString: "Must have passed 24 credit points"
                                        }
                                    ]
                                },
                                null,
                                null,
                                null
                            ]
                        },
                        {
                            year: 2018,
                            code: "S1-01",
                            units: [null, null, null, null, null]
                        }
                    ],
                    courseErrors: []
                };

                const action = {
                    type: "VALIDATE_COURSE"
                };

                const stateAfter = {
                    teachingPeriods: [
                        {
                            year: 2016,
                            code: "S2-01",
                            units: [
                                {
                                    unitCode: "TEST1011",
                                    creditPoints: 6
                                },
                                null,
                                null,
                                null,
                                null
                            ]
                        },
                        {
                            year: 2017,
                            code: "S1-01",
                            units: [null, null, null, null, null]
                        },
                        {
                            year: 2017,
                            code: "S2-01",
                            units: [
                                null,
                                {
                                    unitCode: "TEST3031",
                                    creditPoints: 6,
                                    rules: [
                                        {
                                            ruleSummary: "PREREQ",
                                            ruleString: "Must have passed 24 credit points"
                                        }
                                    ]
                                },
                                null,
                                null,
                                null
                            ]
                        },
                        {
                            year: 2018,
                            code: "S1-01",
                            units: [null, null, null, null, null]
                        }
                    ],
                    courseErrors: [
                        {
                            message: "You need 18 more credit points before doing TEST3031.",
                            coordinates: [[2, 1]]
                        }
                    ]
                };

                test(CourseStructure, stateBefore, action, stateAfter);
            });

            it("Should correctly handle prohibitions", () => {
                const stateBefore = {
                    teachingPeriods: [
                        {
                            year: 2013,
                            code: "S1-01",
                            units: [
                                null,
                                null,
                                null,
                                {
                                    unitCode: "ABC1234"
                                }
                            ]
                        },
                        {
                            year: 2013,
                            code: "S2-01",
                            units: [
                                null,
                                {
                                    unitCode: "BCD1234",
                                    rules: [
                                        {
                                            ruleSummary: "INCOMP",
                                            ruleString: "Incompatible with achievement in {ABC1234}"
                                        }
                                    ]
                                },
                                null,
                                null
                            ]
                        }
                    ],
                    courseErrors: [
                        {
                            message: "Please remove BCD1234, as completing ABC1234 prohibits you from doing this unit.",
                            coordinates: [[1, 1]]
                        }
                    ]
                };

                const action = {
                    type: "VALIDATE_COURSE"
                };

                test(CourseStructure, stateBefore, action, stateBefore);
            });

            it("Should correctly handle the Do branch of For COURSE_CODE syntax", () => {
                const stateBefore = {
                    teachingPeriods: [
                        {
                            year: 2014,
                            code: "S1-01",
                            units: [
                                {
                                    unitCode: "DEF2345",
                                    unitName: "Test unit",
                                    rules: [
                                        {
                                            ruleSummary: "COREQ-IW",
                                            ruleString: "For COURSE_CODE IN {S2029, S3019} Do Any passed co-req (I/W) unit in {ABC2022} Otherwise true",
                                            endDate: ""
                                        }
                                    ]
                                },
                                null,
                                null,
                                null
                            ]
                        }
                    ],
                    courseInfo: {
                        courseCode: "S2029"
                    },
                    courseErrors: []
                };

                const action = {
                    type: "VALIDATE_COURSE"
                };

                const stateAfter = {
                    teachingPeriods: [
                        {
                            year: 2014,
                            code: "S1-01",
                            units: [
                                {
                                    unitCode: "DEF2345",
                                    unitName: "Test unit",
                                    rules: [
                                        {
                                            ruleSummary: "COREQ-IW",
                                            ruleString: "For COURSE_CODE IN {S2029, S3019} Do Any passed co-req (I/W) unit in {ABC2022} Otherwise true",
                                            endDate: ""
                                        }
                                    ]
                                },
                                null,
                                null,
                                null
                            ]
                        }
                    ],
                    courseInfo: {
                        courseCode: "S2029"
                    },
                    courseErrors: [{
                        message: "You must complete ABC2022 before or whilst doing DEF2345.",
                        coordinates: [[0, 0]]
                    }]
                };

                test(CourseStructure, stateBefore, action, stateAfter);
            });

            it("Should correctly handle the Otherwise branch of For COURSE_CODE syntax", () => {
                const stateBefore = {
                    teachingPeriods: [
                        {
                            year: 2018,
                            code: "S1-01",
                            units: [null, null, null, null]
                        },
                        {
                            year: 2018,
                            code: "WS-01",
                            units: [
                                null,
                                null,
                                null,
                                {
                                    unitCode: "ABC1234",
                                    locationAndTime: [
                                        {
                                            location: "Clayton",
                                            time: ["Winter semester 2018 (Day)"]
                                        }
                                    ],
                                    rules: [
                                        {
                                            ruleSummary: "PREREQ-IW",
                                            ruleString: "For COURSE_CODE IN {Q2001, Q2003} Do true Otherwise Must have passed 1 (I/W) units in {TEST1001}",
                                            endDate: ""
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            year: 2018,
                            code: "S2-01",
                            units: [null, null, null, null]
                        }
                    ],
                    courseErrors: []
                };

                const action = {
                    type: "VALIDATE_COURSE"
                };

                const stateAfter = {
                    teachingPeriods: [
                        {
                            year: 2018,
                            code: "S1-01",
                            units: [null, null, null, null]
                        },
                        {
                            year: 2018,
                            code: "WS-01",
                            units: [
                                null,
                                null,
                                null,
                                {
                                    unitCode: "ABC1234",
                                    locationAndTime: [
                                        {
                                            location: "Clayton",
                                            time: ["Winter semester 2018 (Day)"]
                                        }
                                    ],
                                    rules: [
                                        {
                                            ruleSummary: "PREREQ-IW",
                                            ruleString: "For COURSE_CODE IN {Q2001, Q2003} Do true Otherwise Must have passed 1 (I/W) units in {TEST1001}",
                                            endDate: ""
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            year: 2018,
                            code: "S2-01",
                            units: [null, null, null, null]
                        }
                    ],
                    courseErrors: [
                        {
                            message: "You must complete TEST1001 before you can do ABC1234.",
                            coordinates: [[1, 3]]
                        }
                    ]
                };

                test(CourseStructure, stateBefore, action, stateAfter);
            });
        });
    });

    describe("ACTION: HIGHLIGHT_INVALID_UNIT_SLOTS", () => {
        it("Should leave invalidUnitSlotCoordinates empty if there are no invalid unit slots", () => {
            const stateBefore = {
                teachingPeriods: [
                    {
                        year: 2015,
                        code: "S1-01",
                        units: [null, null, null, null]
                    }
                ],
                invalidUnitSlotCoordinates: [],
                highlightingInvalidUnitSlots: false
            };

            const action = {
                type: "HIGHLIGHT_INVALID_UNIT_SLOTS",
                tempUnit: {
                    unitCode: "TEST1001",
                    unitName: "Test unit",
                    locationAndTime: [
                        {
                            location: "Caulfield",
                            time: ["First semester 2017 (Day)"]
                        }
                    ]
                }
            };

            const stateAfter = {
                teachingPeriods: [
                    {
                        year: 2015,
                        code: "S1-01",
                        units: [null, null, null, null]
                    }
                ],
                invalidUnitSlotCoordinates: [],
                highlightingInvalidUnitSlots: true
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });

        it("Should highlight teaching periods that contains the same unit", () => {
            const currentYear = new Date().getFullYear();
            const stateBefore = {
                teachingPeriods: [
                    {
                        year: currentYear - 2,
                        code: "FY-01",
                        units: [
                            null,
                            {
                                unitCode: "ABC1234"
                            },
                            null,
                            null
                        ]
                    },
                    {
                        year: currentYear - 1,
                        code: "FY-01",
                        units: [
                            null,
                            null,
                            {
                                unitCode: "DEF2345"
                            },
                            null
                        ]
                    }
                ],
                invalidUnitSlotCoordinates: [],
                highlightingInvalidUnitSlots: false
            };

            const action = {
                type: "HIGHLIGHT_INVALID_UNIT_SLOTS",
                tempUnit: {
                    unitCode: "ABC1234",
                    locationAndTime: [
                        {
                            location: "Parkville",
                            time: ["Full year 2018 (Day)"]
                        }
                    ]
                }
            };

            const stateAfter = {
                teachingPeriods: [
                    {
                        year: currentYear - 2,
                        code: "FY-01",
                        units: [
                            null,
                            {
                                unitCode: "ABC1234"
                            },
                            null,
                            null
                        ]
                    },
                    {
                        year: currentYear - 1,
                        code: "FY-01",
                        units: [
                            null,
                            null,
                            {
                                unitCode: "DEF2345"
                            },
                            null
                        ]
                    }
                ],
                invalidUnitSlotCoordinates: [[0, null]],
                highlightingInvalidUnitSlots: true
            };

            test(CourseStructure, stateBefore, action, stateAfter);
        });
    });

    describe("DEFAULT", () => {
        it("should not change the state if it receives an unknown action", () => {
            const stateBefore = {
                testParam1: 1,
                testParam2: "test",
                unitToBeMoved: "TestUnit",
                tpIndexOfUnitToBeMoved: 1,
                unitsIndexOfUnitToBeMoved: 2,
                teachingPeriods: [
                    { year: 2017, code: "S2-01", units: [null, null, null, null] },
                    { year: 2018, code: "S2-01", units: [null, null, "TestUnit", null] },
                    { year: 2019, code: "S2-01", units: [null, null, null, null] }
                ]
            };

            const action = {
                type: "THIS_IS_A_LONG_NAME_FOR_AN_ACTION",
                value: 42
            };

            test(CourseStructure, stateBefore, action, stateBefore);
        });
    });
});

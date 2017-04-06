import CareerReducer from "../../app/reducers/CareerReducer";
import { describe, it } from "mocha";

describe("REDUCER: Career", () => {
    describe("ACTION: FETCH_CAREER_PENDING", () => {
        it("Should correctly begin fetching a career", () => {
            const stateBefore = {
                career: {},
                careerIsLoading: false,
                careerLoadError: true,   // this should reset error so we start it as true to test
                relatedCourses: [],
                relatedCoursesAreLoading: false,
                relatedCoursesError: false
            };

            const action = {
                type: "FETCH_CAREER_PENDING"
            };

            const stateAfter = {
                career: {},
                careerIsLoading: true,
                careerLoadError: false,
                relatedCourses: [],
                relatedCoursesAreLoading: false,
                relatedCoursesError: false
            };

            test(CareerReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_CAREER_FULFILLED", () => {
        it("Should correctly handle a successful fetch of a career", () => {
            const stateBefore = {
                career: {},
                careerIsLoading: true,
                careerLoadError: false,
                relatedCourses: [],
                relatedCoursesAreLoading: false,
                relatedCoursesError: false
            };

            const action = {
                type: "FETCH_CAREER_FULFILLED",
                payload: {
                    title: "Unit tester",
                    description: "Someone who tests",
                    relatedCourses: ["A", "B", "C"]
                }
            };

            const stateAfter = {
                career: {
                    title: "Unit tester",
                    description: "Someone who tests",
                    relatedCourses: ["A", "B", "C"]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedCourses: [],
                relatedCoursesAreLoading: false,
                relatedCoursesError: false
            };

            test(CareerReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_CAREER_REJECTED", () => {
        it("Should correctly handle an unsuccessful fetch of a career", () => {
            const stateBefore = {
                career: {testVar: "some data the should be reset"},
                careerIsLoading: true,
                careerLoadError: false,
                relatedCourses: [],
                relatedCoursesAreLoading: false,
                relatedCoursesError: false
            };

            const action = {
                type: "FETCH_CAREER_REJECTED"
            };

            const stateAfter = {
                career: {},
                careerIsLoading: false,
                careerLoadError: true,
                relatedCourses: [],
                relatedCoursesAreLoading: false,
                relatedCoursesError: false
            };

            test(CareerReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_RELATED_COURSES_PENDING", () => {
        it("Should correctly begin fetching the related courses to a career", () => {
            const stateBefore = {
                career: {
                    id: "3",
                    title: "Criminologist",
                    description: "Why did they do it? Crimes can be puzzling to most...",
                    videoCode: "XGer682MdJE",
                    videoThumbnail: "",
                    promoPhoto: "",
                    relatedCourses: [
                        {
                            "code": "A2000",
                            "areaOfStudyCode": "CRIMINOL01"
                        }
                    ]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedCourses: [],
                relatedCourseKeys: [],
                relatedCoursesAreLoading: false,
                relatedCoursesError: true          // should reset here
            };

            const action = {
                type: "FETCH_RELATED_COURSES_PENDING",
                relatedCourseKeys: stateBefore.career.relatedCourses
            };

            const stateAfter = {
                career: {
                    id: "3",
                    title: "Criminologist",
                    description: "Why did they do it? Crimes can be puzzling to most...",
                    videoCode: "XGer682MdJE",
                    videoThumbnail: "",
                    promoPhoto: "",
                    relatedCourses: [
                        {
                            "code": "A2000",
                            "areaOfStudyCode": "CRIMINOL01"
                        }
                    ]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedCourses: [],
                relatedCourseKeys: [{
                    "code": "A2000",
                    "areaOfStudyCode": "CRIMINOL01"
                }],
                relatedCoursesAreLoading: true,
                relatedCoursesError: false
            };

            test(CareerReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_RELATED_COURSES_FULFILLED", () => {
        it("Should correctly handle the successful fetch of related courses to a career", () => {
            const stateBefore = {
                career: {
                    id: "3",
                    title: "Criminologist",
                    description: "Why did they do it? Crimes can be puzzling to most...",
                    videoCode: "XGer682MdJE",
                    videoThumbnail: "",
                    promoPhoto: "",
                    relatedCourses: [
                        {
                            "code": "A2000",
                            "areaOfStudyCode": "CRIMINOL01"
                        }
                    ]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedCourses: [],
                relatedCourseKeys: [
                    {
                        "code": "A2000",
                        "areaOfStudyCode": "CRIMINOL01"
                    }
                ],
                relatedCoursesAreLoading: true,
                relatedCoursesError: false          // should reset here
            };

            const action = {
                type: "FETCH_RELATED_COURSES_FULFILLED",
                payload: {
                    "A2000": {
                        code: "A2000",
                        title: "Bachelor of Arts",
                        description: "Arts at Monash is your comprehensive gateway to a wide range of fascinating and rewarding areas of study across the arts, humanities, and social sciences. Taking an innovative approach in tackling world issues and fostering a global perspective, you will develop the research skills, advanced discipline knowledge and self reliance to acquire information, assess evidence and convey complex ideas in speech and writing in order to answer complicated questions. And with the scope to choose from almost 40 different major and minor areas of study, including languages, social studies, communications, politics, human rights, and international relations, you will develop an informed, critical awareness of the fields you're most passionate about, laying the groundwork for a wealth of exciting careers.",
                        videoCode: "",
                        videoThumbnail: "",
                        promoPhoto: "",
                        areaOfStudies: {
                            "JOURNLSM01": {
                                "code": "JOURNLSM01",
                                "title": "Journalism",
                                "category": "MAJOR"
                            },
                            "HISTORY01": {
                                "code": "HISTORY01",
                                "title": "History",
                                "category": "MAJOR"
                            },
                            "CRIMINOL01": {
                                "code": "CRIMINOL01",
                                "title": "Criminology",
                                "category": "MAJOR"
                            },
                            "PSYCHOL01": {
                                "code": "PSYCHOL01",
                                "title": "Psychology",
                                "category": "MAJOR"
                            }
                        }
                    },
                    "S2000": {
                        code: "S2000",
                        title: "Bachelor of Science",
                        description: "If you want to make a difference, studying a science degree at Monash will give you the opportunity to learn from leading experts whose cutting-edge research is influencing the world's future. The choice, flexibility and depth across the huge range of science disciplines available at Monash means that you will graduate with a degree unique to you, tailored to your individual expertise, interests and career aspirations. The comprehensive range of majors, extended majors and minors on offer provides you with a broad education and allows you to explore varied interests before focusing in the one or two areas that most inspire you. However, if a particular field has always captivated you, you can choose it from the start.",
                        videoCode: "",
                        videoThumbnail: "",
                        promoPhoto: "",
                        areaOfStudies: {
                            "PSYCHOL01": {
                                "code": "PSYCHOL01",
                                "title": "Psychology",
                                "category": "MAJOR"
                            },
                            "MATHS01": {
                                "code": "MATHS01",
                                "title": "Mathematics",
                                "category": "MAJOR"
                            },
                            "MICROBIO01": {
                                "code": "MICROBIO01",
                                "title": "Microbiology",
                                "category": "MAJOR"
                            }
                        }
                    }
                }
            };

            const stateAfter = {
                career: {
                    id: "3",
                    title: "Criminologist",
                    description: "Why did they do it? Crimes can be puzzling to most...",
                    videoCode: "XGer682MdJE",
                    videoThumbnail: "",
                    promoPhoto: "",
                    relatedCourses: [
                        {
                            "code": "A2000",
                            "areaOfStudyCode": "CRIMINOL01"
                        }
                    ]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedCourses: [
                    {
                        code: "A2000",
                        title: "Bachelor of Arts",
                        description: "Arts at Monash is your comprehensive gateway to a wide range of fascinating and rewarding areas of study across the arts, humanities, and social sciences. Taking an innovative approach in tackling world issues and fostering a global perspective, you will develop the research skills, advanced discipline knowledge and self reliance to acquire information, assess evidence and convey complex ideas in speech and writing in order to answer complicated questions. And with the scope to choose from almost 40 different major and minor areas of study, including languages, social studies, communications, politics, human rights, and international relations, you will develop an informed, critical awareness of the fields you're most passionate about, laying the groundwork for a wealth of exciting careers.",
                        videoCode: "",
                        videoThumbnail: "",
                        promoPhoto: "",
                        areaOfStudy: {
                            "code": "CRIMINOL01",
                            "title": "Criminology",
                            "category": "MAJOR"
                        },
                        areaOfStudies: {
                            "JOURNLSM01": {
                                "code": "JOURNLSM01",
                                "title": "Journalism",
                                "category": "MAJOR"
                            },
                            "HISTORY01": {
                                "code": "HISTORY01",
                                "title": "History",
                                "category": "MAJOR"
                            },
                            "CRIMINOL01": {
                                "code": "CRIMINOL01",
                                "title": "Criminology",
                                "category": "MAJOR"
                            },
                            "PSYCHOL01": {
                                "code": "PSYCHOL01",
                                "title": "Psychology",
                                "category": "MAJOR"
                            }
                        }
                    }
                ],
                relatedCourseKeys: [
                    {
                        "code": "A2000",
                        "areaOfStudyCode": "CRIMINOL01"
                    }
                ],
                relatedCoursesAreLoading: false,
                relatedCoursesError: false
            };

            test(CareerReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_RELATED_COURSES_REJECTED", () => {
        it("Should correctly handle the unsuccessful fetch of the related degrees to a career", () => {
            const stateBefore = {
                career: {
                    id: "3",
                    title: "Criminologist",
                    description: "Why did they do it? Crimes can be puzzling to most...",
                    videoCode: "XGer682MdJE",
                    videoThumbnail: "",
                    promoPhoto: "",
                    relatedCourses: ["A2000-0-2"]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedCourses: [{these: "values should be gone when error hits"}],
                relatedCoursesAreLoading: true,
                relatedCoursesError: false
            };

            const action = {
                type: "FETCH_RELATED_COURSES_REJECTED"
            };

            const stateAfter = {
                career: {
                    id: "3",
                    title: "Criminologist",
                    description: "Why did they do it? Crimes can be puzzling to most...",
                    videoCode: "XGer682MdJE",
                    videoThumbnail: "",
                    promoPhoto: "",
                    relatedCourses: ["A2000-0-2"]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedCourses: [],
                relatedCoursesAreLoading: false,
                relatedCoursesError: true
            };

            test(CareerReducer, stateBefore, action, stateAfter);
        });
    });
});

import CareerReducer from "../../app/reducers/CareerReducer";
import { describe, it } from "mocha";

describe("REDUCER: Career", () => {
    describe("ACTION: FETCH_CAREER_PENDING", () => {
        it("Should correctly begin fetching a career", () => {
            const stateBefore = {
                career: {},
                careerIsLoading: false,
                careerLoadError: true,   // this should reset error so we start it as true to test
                relatedDegrees: [],
                relatedDegreesAreLoading: false,
                relatedDegreesError: false
            };

            const action = {
                type: "FETCH_CAREER_PENDING"
            };

            const stateAfter = {
                career: {},
                careerIsLoading: true,
                careerLoadError: false,
                relatedDegrees: [],
                relatedDegreesAreLoading: false,
                relatedDegreesError: false
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
                relatedDegrees: [],
                relatedDegreesAreLoading: false,
                relatedDegreesError: false
            };

            const action = {
                type: "FETCH_CAREER_FULFILLED",
                payload: {
                    title: "Unit tester",
                    description: "Someone who tests",
                    relatedDegrees: ["A", "B", "C"]
                }
            };

            const stateAfter = {
                career: {
                    title: "Unit tester",
                    description: "Someone who tests",
                    relatedDegrees: ["A", "B", "C"]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedDegrees: [],
                relatedDegreesAreLoading: false,
                relatedDegreesError: false
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
                relatedDegrees: [],
                relatedDegreesAreLoading: false,
                relatedDegreesError: false
            };

            const action = {
                type: "FETCH_CAREER_REJECTED"
            };

            const stateAfter = {
                career: {},
                careerIsLoading: false,
                careerLoadError: true,
                relatedDegrees: [],
                relatedDegreesAreLoading: false,
                relatedDegreesError: false
            };

            test(CareerReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_RELATED_DEGREES_PENDING", () => {
        it("Should correctly begin fetching the related degrees to a career", () => {
            const stateBefore = {
                career: {
                    id: "3",
                    title: "Criminologist",
                    description: "Why did they do it? Crimes can be puzzling to most...",
                    videoCode: "XGer682MdJE",
                    videoThumbnail: "",
                    promoPhoto: "",
                    relatedDegrees: ["A2000-0-2"]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedDegrees: [],
                relatedDegreesAreLoading: false, 
                relatedDegreesError: true          // should reset here
            };

            const action = {
                type: "FETCH_RELATED_DEGREES_PENDING"
            };

            const stateAfter = {
                career: {
                    id: "3",
                    title: "Criminologist",
                    description: "Why did they do it? Crimes can be puzzling to most...",
                    videoCode: "XGer682MdJE",
                    videoThumbnail: "",
                    promoPhoto: "",
                    relatedDegrees: ["A2000-0-2"]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedDegrees: [],
                relatedDegreesAreLoading: true,
                relatedDegreesError: false
            };

            test(CareerReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_RELATED_DEGREES_FULFILLED", () => {
        it("Should correctly handle the successful fetch of related degrees to a career", () => {
            const stateBefore = {
                career: {
                    id: "3",
                    title: "Criminologist",
                    description: "Why did they do it? Crimes can be puzzling to most...",
                    videoCode: "XGer682MdJE",
                    videoThumbnail: "",
                    promoPhoto: "",
                    relatedDegrees: ["A2000-0-2"]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedDegrees: [],
                relatedDegreesAreLoading: true, 
                relatedDegreesError: false          // should reset here
            };

            const action = {
                type: "FETCH_RELATED_DEGREES_FULFILLED",
                payload: [
                    { 
                        code: "A2000",
                        title: "Bachelor of Arts",
                        description: "Arts at Monash is your comprehensive gateway to a wide range of fascinating and rewarding areas of study across the arts, humanities, and social sciences. Taking an innovative approach in tackling world issues and fostering a global perspective, you will develop the research skills, advanced discipline knowledge and self reliance to acquire information, assess evidence and convey complex ideas in speech and writing in order to answer complicated questions. And with the scope to choose from almost 40 different major and minor areas of study, including languages, social studies, communications, politics, human rights, and international relations, you will develop an informed, critical awareness of the fields you're most passionate about, laying the groundwork for a wealth of exciting careers.",
                        videoCode: "",
                        videoThumbnail: "",
                        promoPhoto: "",
                        specialisations: [],
                        majors: "History"  
                    }, 
                    {
                        code: "A2000",
                        title: "Bachelor of Arts",
                        description: "Arts at Monash is your comprehensive gateway to a wide range of fascinating and rewarding areas of study across the arts, humanities, and social sciences. Taking an innovative approach in tackling world issues and fostering a global perspective, you will develop the research skills, advanced discipline knowledge and self reliance to acquire information, assess evidence and convey complex ideas in speech and writing in order to answer complicated questions. And with the scope to choose from almost 40 different major and minor areas of study, including languages, social studies, communications, politics, human rights, and international relations, you will develop an informed, critical awareness of the fields you're most passionate about, laying the groundwork for a wealth of exciting careers.",
                        videoCode: "",
                        videoThumbnail: "",
                        promoPhoto: "",
                        specialisations: [],
                        majors: "Journalism"
                    }
                ]
            };

            const stateAfter = {
                career: {
                    id: "3",
                    title: "Criminologist",
                    description: "Why did they do it? Crimes can be puzzling to most...",
                    videoCode: "XGer682MdJE",
                    videoThumbnail: "",
                    promoPhoto: "",
                    relatedDegrees: ["A2000-0-2"]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedDegrees: [
                    { 
                        code: "A2000",
                        title: "Bachelor of Arts",
                        description: "Arts at Monash is your comprehensive gateway to a wide range of fascinating and rewarding areas of study across the arts, humanities, and social sciences. Taking an innovative approach in tackling world issues and fostering a global perspective, you will develop the research skills, advanced discipline knowledge and self reliance to acquire information, assess evidence and convey complex ideas in speech and writing in order to answer complicated questions. And with the scope to choose from almost 40 different major and minor areas of study, including languages, social studies, communications, politics, human rights, and international relations, you will develop an informed, critical awareness of the fields you're most passionate about, laying the groundwork for a wealth of exciting careers.",
                        videoCode: "",
                        videoThumbnail: "",
                        promoPhoto: "",
                        specialisations: [],
                        majors: "History"  
                    }, 
                    {
                        code: "A2000",
                        title: "Bachelor of Arts",
                        description: "Arts at Monash is your comprehensive gateway to a wide range of fascinating and rewarding areas of study across the arts, humanities, and social sciences. Taking an innovative approach in tackling world issues and fostering a global perspective, you will develop the research skills, advanced discipline knowledge and self reliance to acquire information, assess evidence and convey complex ideas in speech and writing in order to answer complicated questions. And with the scope to choose from almost 40 different major and minor areas of study, including languages, social studies, communications, politics, human rights, and international relations, you will develop an informed, critical awareness of the fields you're most passionate about, laying the groundwork for a wealth of exciting careers.",
                        videoCode: "",
                        videoThumbnail: "",
                        promoPhoto: "",
                        specialisations: [],
                        majors: "Journalism"
                    }
                ],
                relatedDegreesAreLoading: false,
                relatedDegreesError: false
            };

            test(CareerReducer, stateBefore, action, stateAfter);
        });
    });

    describe("ACTION: FETCH_RELATED_DEGREES_REJECTED", () => {
        it("Should correctly handle the unsuccessful fetch of the related degrees to a career", () => {
            const stateBefore = {
                career: {
                    id: "3",
                    title: "Criminologist",
                    description: "Why did they do it? Crimes can be puzzling to most...",
                    videoCode: "XGer682MdJE",
                    videoThumbnail: "",
                    promoPhoto: "",
                    relatedDegrees: ["A2000-0-2"]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedDegrees: [{these: "values should be gone when error hits"}],
                relatedDegreesAreLoading: true, 
                relatedDegreesError: false
            };

            const action = {
                type: "FETCH_RELATED_DEGREES_REJECTED"
            };

            const stateAfter = {
                career: {
                    id: "3",
                    title: "Criminologist",
                    description: "Why did they do it? Crimes can be puzzling to most...",
                    videoCode: "XGer682MdJE",
                    videoThumbnail: "",
                    promoPhoto: "",
                    relatedDegrees: ["A2000-0-2"]
                },
                careerIsLoading: false,
                careerLoadError: false,
                relatedDegrees: [],
                relatedDegreesAreLoading: false,
                relatedDegreesError: true
            };

            test(CareerReducer, stateBefore, action, stateAfter);
        });
    });
});
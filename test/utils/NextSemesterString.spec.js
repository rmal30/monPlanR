import { nextSemester, getSemesterString } from "../../app/utils/NextSemesterString";

describe("UTILS: NextSemesterString", () => {
    const sortedTeachingPeriodData = [
        {
            "name": "Summer semester B",
            "code": "SSB-01",
            "startDate": "01/01/2017",
            "endDate": "17/02/2017"
        },
        {
            "name": "Full-year teaching period",
            "code": "FY-01",
            "startDate": "27/02/2017",
            "endDate": "20/10/2017"
        },
        {
            "name": "Semester 1",
            "code": "S1-01",
            "startDate": "27/02/2017",
            "endDate": "26/05/2017"
        },
        {
            "name": "Winter semester",
            "code": "WS-01",
            "startDate": "19/06/2017",
            "endDate": "14/07/2017"
        },
        {
            "name": "Semester 2",
            "code": "S2-01",
            "startDate": "24/07/2017",
            "endDate": "20/10/2017"
        },
        {
            "name": "Summer semester A",
            "code": "SSA-02",
            "startDate": "01/11/2017",
            "endDate": "16/02/2018"
        }
    ];

    describe("nextSemester", () => {
        it("Should default to semester one of start year if teachingPeriods and teachingPeriodData are both empty.", () => {
            expect(
                nextSemester([], 2011, [])
            ).to.deep.equal({
                index: 0,
                year: 2011,
                code: "S1-01",
                teachingPeriodData: []
            });
        });

        it("Should default to semester one of start year if teachingPeriods is empty and teachingPeriodData is populated.", () => {
            expect(
                nextSemester([], 2029, sortedTeachingPeriodData)
            ).to.deep.equal({
                index: 0,
                year: 2029,
                code: "S1-01",
                teachingPeriodData: sortedTeachingPeriodData
            });
        });

        it("Should return semester two if the last teaching period is in semester one, with the same year", () => {
            expect(
                nextSemester([
                    {
                        year: 2025,
                        code: "S1-01"
                    },
                    {
                        year: 2025,
                        code: "S2-01"
                    },
                    {
                        year: 2026,
                        code: "S1-01"
                    },
                    {
                        year: 2026,
                        code: "S2-01"
                    },
                    {
                        year: 2027,
                        code: "S1-01"
                    }
                ], 2023, sortedTeachingPeriodData)
            ).to.deep.equal({
                index: 5,
                year: 2027,
                code: "S2-01",
                teachingPeriodData: sortedTeachingPeriodData
            });
        });

        it("Should return semester one next year if the last teaching period is in semester two", () => {
            expect(
                nextSemester([
                    {
                        year: 2015,
                        code: "FY-01"
                    },
                    {
                        year: 2017,
                        code: "S2-01"
                    }
                ], 2015, sortedTeachingPeriodData)
            ).to.deep.equal({
                index: 2,
                year: 2018,
                code: "S1-01",
                teachingPeriodData: sortedTeachingPeriodData
            });
        });
    });

    describe("getSemesterString", () => {
        it("Should render a semester string", () => {
            expect(getSemesterString({
                year: 2019,
                code: "S2-01",
                teachingPeriodData: sortedTeachingPeriodData
            })).to.equal("Semester 2, 2019");
        });

        it("Should revert back to semester codes if teachingPeriodData is not available", () => {
            expect(getSemesterString({
                year: 2015,
                code: "S1-01"
            })).to.equal("S1-01, 2015");
        });
    });
});

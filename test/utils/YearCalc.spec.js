import YearCalc from "../../app/utils/YearCalc";

describe("UTILS: YearCalc", () => {
    it("Should contain the same year as it was specified", () => {
        expect(YearCalc.getStartYearVals(2016).find(year => year.value === 2016)).to.be.ok;
        expect(YearCalc.getEndYearVals(2017).find(year => year.value === 2017)).to.be.ok;
    });

    it("Should contain a year that is ten years from now", () => {
        expect(YearCalc.getStartYearVals(2019).find(year => year.value === 2029)).to.be.ok;
        expect(YearCalc.getStartYearVals(2012).find(year => year.value === 2002)).to.be.ok;
        expect(YearCalc.getEndYearVals(2018).find(year => year.value === 2028)).to.be.ok;
    });

    it("Should not contain any past year when computing end years", () => {
        expect(YearCalc.getEndYearVals(2018).find(year => year.value === 2017)).to.be.not.ok;
        expect(YearCalc.getEndYearVals(2018).find(year => year.value === 2008)).to.be.not.ok;
    });

    it("Should have starting years go in decreasing order from one year ahead to the minimum", () => {
        expect(YearCalc.getStartYearVals(2019).slice(0, 12)).to.deep.equal([
            {
                text: "2020",
                value: 2020
            },
            {
                text: "2019",
                value: 2019
            },
            {
                text: "2018",
                value: 2018
            },
            {
                text: "2017",
                value: 2017
            },
            {
                text: "2016",
                value: 2016
            },
            {
                text: "2015",
                value: 2015
            },
            {
                text: "2014",
                value: 2014
            },
            {
                text: "2013",
                value: 2013
            },
            {
                text: "2012",
                value: 2012
            },
            {
                text: "2011",
                value: 2011
            },
            {
                text: "2010",
                value: 2010
            },
            {
                text: "2009",
                value: 2009
            }
        ]);
    });
});

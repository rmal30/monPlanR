import CostCalc from "../../app/utils/CostCalc";

describe("UTILS: CostCalc", () => {
    it("Should return a non-negative number", () => {
        expect(CostCalc.calculateCost(0, 0)).to.be.gte(0);
        expect(CostCalc.calculateCost(2, 6)).to.be.gte(0);
    });

    it("Should multiply SCA band cost with credit points", () => {
        const scaBand = 3;
        const creditPoints = 6;
        const scaBandCost = CostCalc.calculateCost(scaBand, 1);

        expect(CostCalc.calculateCost(scaBand, creditPoints)).to.equal(scaBandCost * creditPoints);
    });
});

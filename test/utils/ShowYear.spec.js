import ShowYear from "../../app/utils/ShowYear";

describe("UTILS: ShowYear", () => {
    it("Should return the right year based off current month", () => {
        if(new Date().getMonth()+1 >= 11){
            expect(ShowYear()).to.equal(new Date().getFullYear()+1);
        } else {
            expect(ShowYear()).to.equal(new Date().getFullYear());
        }
    });
});

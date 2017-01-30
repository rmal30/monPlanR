/**
 * Used in selection dropdown menu from the home page, where students select
 * their start and end years.
 */
export default class YearCalc {
    /**
     * Returns a list of start years ranging a decade on each side from the
     * initial value.
     *
     * @param {string} initialVal - The initial year.
     */
    static getStartYearVals(initialVal) {
        const min = parseInt(initialVal, 10) - 10;
        const max = parseInt(initialVal, 10) + 10;
        const validStartYears = [];

        for(let i = max - 9; i >= min; i--) {
            validStartYears.push(
                { text: i.toString(), value: i}
            );
        }

        for(let i = max - 8; i <= max; i++) {
            validStartYears.push(
                { text: i.toString(), value: i}
            );
        }

        return validStartYears;

    }

    /**
     * Returns a list of end years ranging from start year to one decade in
     * the future.
     *
     * @param {string} startYear - The year student commences their studies.
     */
    static getEndYearVals(startYear) {
        const min = parseInt(startYear, 10);
        const max = parseInt(startYear, 10) + 10;
        const validEndYears = [];

        for(let j = min; j <= max; j++){
            validEndYears.push(
                { text: j.toString(), value: j}
            );
        }

        return validEndYears;
    }
}

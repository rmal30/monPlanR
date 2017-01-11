import axios from "axios";

/**
 * A list of helper methods for unit queries.
 */
export default class UnitQuery {

    /**
     * Retrieves a list of units locally specifying only unit names and codes.
     */
    static getUnitCodeAndUnitNames() {
        let qURL = `${MONPLAN_REMOTE_URL}/basic/units`;
        return axios.get(qURL);
    }

    /**
     * Retrieves information about a single unit remotely.

     * @param {string} UnitCode - The unit code to retrieve more information about.
     */
    static getExtendedUnitData(UnitCode) {
        let qURL = `${MONPLAN_REMOTE_URL}/units/${UnitCode}`;
        return axios.get(qURL);
    }

    /**
     * Retrieves the basic course list from the API, this returns {courseCode, courseName, courseType}
     */
    static getCourses() {
        let qURL = `${MONPLAN_REMOTE_URL}/basic/courses`;
        return axios.get(qURL);
    }

    /**
     * given a courseCode, retrieves the course template data from the API
     * @param {string} courseCode - the courseCode corresponding to the course to search
     */
    static getCourseData(courseCode) {
        let qURL = `${MONPLAN_REMOTE_URL}/courses/${courseCode}`;
        return axios.get(qURL);
    }

    /**
     * Given a unit code, grabs the rating for that unit
     * @param {string} unitCode - the unitCode corresponding to the unit for ratings
     */
    static getUnitRatings(unitCode) {
        let qURL = `${MONPLAN_REMOTE_URL}/unitRatings/${unitCode}`;
        return axios.get(qURL);
    }

}

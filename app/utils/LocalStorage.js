/**
 * A series of helper functions related to local storage.
 *
 * @author Saurabh Joshi
 */
export default class LocalStorage {
    /**
     * Checks if there is anything saved to local storage, and if so, whether
     * or not teaching periods list is empty. This is used for checking if
     * a user has anything saved to their browser. If true, it will return
     * the saved version number if a version property exists.
     *
     * @author Saurabh Joshi
     * @return {string|boolean} savedVersionNumber/courseStructureDoesExist
     */
    static doesCourseStructureExist() {
        const stringifedJSON = localStorage.getItem("courseStructure");
        if(stringifedJSON === null) {
            return false;
        }

        const { teachingPeriods, numberOfUnits, version } = JSON.parse(stringifedJSON);

        return Array.isArray(teachingPeriods) && teachingPeriods.length > 0 && numberOfUnits && (version || true);
    }
}

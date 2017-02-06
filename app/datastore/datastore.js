var datastore = require("@google-cloud/datastore");
var datastoreClient = datastore({
    projectId: "monplan-dev",
    keyFileName: "/path/to/keyfile"
});
/**

 * A list of helper methods for unit queries.
 */
export default class datastoreQuery {

    /**
     * Retrieves a list of units locally specifying only unit names and codes.
     */
    static getUnitInfo() {
        datastoreClient;
    }

}

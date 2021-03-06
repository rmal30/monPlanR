/**
 * setup.js is a helper file that iniitalises the unit testing environment by
 * importing Mocha and Chai's expect function, and injects it into the global
 * object. It also injects jsdom to simulate the browser environment so that
 * Enzyme mount can be used for testing complex React components.
 *
 * @author Saurabh Joshi, JXNS
 */

import { describe, it } from "mocha";

import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import sinonChai from "sinon-chai";
import expectSimple from "expect";

import deepFreeze from "deep-freeze";

import { jsdom } from "jsdom";
import createMockRaf from "mock-raf";

import fs from "fs";
import peg from "pegjs";

const exposedProperties = ["window", "navigator", "document"];

/* Setup jsdom for Enzyme mount rendering */
global.document = jsdom("");
global.documentRef = document;
global.window = document.defaultView;
global.navigator = {
    userAgent: "node.js"
};

// Setup mocks for requestAnimationFrame and cancelAnimationFrame, as jsdom does not provide it.
const mockRaf = createMockRaf();
global.mockRaf = mockRaf;
window.requestAnimationFrame = mockRaf.raf;
window.cancelAnimationFrame = mockRaf.cancel;

// Set canUseDOM flag to the truthy value of jsdom document. If this is false, React may throw an InvariantError.
require("fbjs/lib/ExecutionEnvironment").canUseDOM = !!document;

/* Stop semantic-ui-react from complaining that it cannot enable debug. */
global.window.localStorage = {
    debug: null
};
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === "undefined") {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

/* Populate helper chai methods for enzyme and sinon testing. */
chai.use(chaiEnzyme());
chai.use(sinonChai);

/* Inject mocha and Chai's expect into the global environment */
global.describe = describe;
global.it = it;
global.expect = chai.expect;
global.MONPLAN_REMOTE_URL2 = "https://monplan-api-dev.appspot.com";
global.MONPLAN_REMOTE_URL = "https://api2.monplan.tech";


/**
 * The test function that will run for each Redux reducer action.
 *
 * @param {function} reducer - A redux reducer
 * @param {object} stateBefore - The state before the action is performed.
 * @param {object} action - The action to perform.
 * @param {object} stateAfter - The expected state after the action is
 * performed.
 */
global.test = (reducer, stateBefore, action, stateAfter) => {
    deepFreeze(stateBefore);
    deepFreeze(action);
    expectSimple(
        reducer(stateBefore, action)
    ).toEqual(stateAfter);
};

/**
 * This is needed in order for Node to understand how to handle .pegjs files,
 * which is used in parsing rules such as prereqs.
 *
 * Note: require.extensions is deprecated and should be replaced with something better
 */
require.extensions[".pegjs"] = function(module, filename) {
    const source = fs.readFileSync(filename, "utf8");
    const pegOptions = {
        output: "source"
    };

    const output = `module.exports = ${peg.generate(source, pegOptions)};`;
    return module._compile(output, filename);
};

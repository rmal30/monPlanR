import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import sinonChai from "sinon-chai";
import { describe, it } from "mocha";
import { jsdom } from "jsdom";

const exposedProperties = ["window", "navigator", "document"];

global.document = jsdom("");
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === "undefined") {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: "node.js"
};

chai.use(chaiEnzyme());
chai.use(sinonChai);

global.describe = describe;
global.it = it;
global.expect = chai.expect;
global.documentRef = document;

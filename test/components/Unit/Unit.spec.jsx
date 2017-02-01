import { expect } from "chai";
import { describe, it } from "mocha";
import React from "react";
import { shallow } from "enzyme";

import jsdom from "jsdom";
const doc = jsdom.jsdom("<!DOCTYPE html><html><body></body></html>");
global.document = doc;
global.window = doc.defaultView;

import { Unit } from "../../../app/components/Unit/Unit.jsx";

describe("COMPONENT: Unit", () => {
    it("should render a unit code", () => {
        const unitCode = "ABC1234";
        /**
         * Used to safely remove React DnD calls.
         */
        const identity = ele => ele;

        const wrapper = shallow(
            <Unit
                code={unitCode}
                connectDragSource={identity}
                connectDropTarget={identity} />
        );

        expect(wrapper.find("td")).to.have.length(1);
    });
});

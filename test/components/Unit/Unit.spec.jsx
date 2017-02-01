import { expect } from "chai";
import { describe, it } from "mocha";
import React from "react";
import { mount } from "enzyme";

import { Unit } from "../../../app/components/Unit/Unit.jsx";

describe("COMPONENT: Unit", () => {
    it("should only render a unit code and a unit name", () => {
        const unitCode = "ABC1234";
        const unitName = "Example unit";
        /**
         * Used to safely remove React DnD calls.
         */
        const identity = ele => {
            return ele;
        };

        const wrapper = mount(
            <Unit
                code={unitCode}
                name={unitName}
                connectDragSource={identity}
                connectDropTarget={identity} />
        );

        expect(wrapper.find(".header").text().trim()).to.equal(unitCode);
        expect(wrapper.find(".message").text().replace(unitCode, "").trim()).to.equal(unitName);
    });
});

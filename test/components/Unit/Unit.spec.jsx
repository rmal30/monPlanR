import React from "react";
import { mount } from "enzyme";

import { Unit } from "../../../app/components/Unit/Unit.jsx";

describe("COMPONENT: Unit", () => {
    /**
     * Used to safely remove React DnD calls.
     */
    const identity = ele => {
        return ele;
    };

    it("should only render a unit code and a unit name", () => {
        const unitCode = "ABC1234";
        const unitName = "Example unit";

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

    it("should render a close button only when mouse is over the unit", () => {
        const wrapper = mount(
            <Unit
                code={"ABC1234"}
                name={"Example unit"}
                connectDragSource={identity}
                connectDropTarget={identity} />
        );

        wrapper.simulate("mouseout");
        wrapper.simulate("mouseleave");
        expect(wrapper.find(".buttons")).to.have.length(1);
        expect(wrapper.find(".buttons")).to.have.style("visibility", "hidden");
        wrapper.simulate("mouseover");
        wrapper.simulate("mouseenter");
        expect(wrapper.find(".buttons")).to.have.length(1);
        expect(wrapper.find(".buttons")).to.have.style("visibility", "visible");
        wrapper.simulate("mouseout");
        wrapper.simulate("mouseleave");
        expect(wrapper.find(".buttons")).to.have.length(1);
        expect(wrapper.find(".buttons")).to.have.style("visibility", "hidden");
    });
});

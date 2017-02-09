import React from "react";
import { mount } from "enzyme";

import { UnitMessage } from "../../../app/components/Unit/UnitMessage.jsx";

describe("COMPONENT: UnitMessage", () => {
    it("should only render a unit code and a unit name", () => {
        const unitCode = "ABC1234";
        const unitName = "Example unit";

        const wrapper = mount(
            <UnitMessage
                code={unitCode}
                name={unitName} />
        );

        expect(wrapper.find(".header").text().trim()).to.equal(unitCode);
        expect(wrapper.find(".message").text().replace(unitCode, "").trim()).to.equal(unitName);
    });

    it("should render a close button only when mouse is over the unit", () => {
        const wrapper = mount(
            <UnitMessage
                code="ABC1234"
                name="Example unit"
                hovering={false} />
        );

        expect(wrapper.find(".buttons")).to.have.length(1);
        expect(wrapper.find(".buttons")).to.have.style("visibility", "hidden");

        wrapper.setProps({
            hovering: true
        });

        expect(wrapper.find(".buttons")).to.have.length(1);
        expect(wrapper.find(".buttons")).to.have.style("visibility", "visible");

        wrapper.setProps({
            hovering: false
        });

        expect(wrapper.find(".buttons")).to.have.length(1);
        expect(wrapper.find(".buttons")).to.have.style("visibility", "hidden");
    });
});

import React from "react";
import { mount, shallow } from "enzyme";
import sinon from "sinon";

import InsertTeachingPeriodButton from "../../../app/components/TeachingPeriod/InsertTeachingPeriodButton.jsx";

describe("COMPONENT: InsertTeachingPeriodButton", () => {
    /**
     * Identity function which doesn't do anything
     */
    const identity = ele => ele;

    describe("#addSemester()", () => {
        it("should be called exactly once when main button has been clicked", () => {
            const addSemester = sinon.spy();
            const wrapper = shallow(
                <InsertTeachingPeriodButton
                    insert={identity}
                    addSemester={addSemester} />
            );
            wrapper.find("Button").simulate("click");
            expect(addSemester).to.have.been.calledOnce;
        });
    });

    describe("#insert()", () => {
        it("should be called as many times as the number of insert teaching periods options upon click", () => {
            const insert = sinon.spy();
            const wrapper = mount(
                <InsertTeachingPeriodButton
                    insert={insert}
                    addSemester={identity} />
            );

            const dropdownItems = wrapper.find(".item");
            dropdownItems.forEach(node => node.simulate("click"));
            expect(insert).to.have.callCount(dropdownItems.length);
        });
    });
});

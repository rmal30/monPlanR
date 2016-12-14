import React from "react";
import {expect} from "chai";
import {shallow, mount, render} from "enzyme";

import CourseStructure from "../app/components/CourseStructure.jsx";
import {Button, Container, Message, Table} from "semantic-ui-react";

describe("CourseStructure", function() {
    it("should have a Container and a Table", function() {
        const wrapper = shallow(<CourseStructure />);
        expect(wrapper.containsMatchingElement(Container)).to.be.true;
        expect(wrapper.containsMatchingElement(Table)).to.be.true;
    });

    it("should have an add teaching period button", function() {
        const wrapper = shallow(<CourseStructure />);
        expect(wrapper.containsMatchingElement(Button.Group)).to.be.true;
        expect(wrapper.find(Button.Group)).to.have.length(1);
        expect(wrapper.find(Button.Group).find(Button)).to.have.length(1);
        /* Test does not fail
        expect(wrapper.containsMatchingElement(Message)).to.equal.true;
        wrapper.find(Button.Group).find(Button).simulate("click");
        expect(wrapper.containsMatchingElement(Message)).to.equal.true;
        */
    });
});

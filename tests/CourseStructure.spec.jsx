const path = require("path");
import React from "react";
import {expect} from "chai";
import {shallow, mount, render} from "enzyme";

import CourseStructure from "../app/components/CourseStructure.jsx";
import {Container} from "semantic-ui-react";

describe("CourseStructure", function() {
    it("should have a Container", function() {
        const wrapper = shallow(<CourseStructure />);
        expect(wrapper.containsMatchingElement(Container)).to.be.true;
    });
});

import { expect } from "chai";
import { describe, it } from "mocha";
import React from "react";
import { mount } from "enzyme";

import SetuRating from "../../../app/components/Unit/SetuRating.jsx";

describe("COMPONENT: SetuRating", () => {
    it("should render two ratings", () => {
        expect(mount(<SetuRating />).find(".rating")).to.have.length(2);
    });

    it("should render a book if learning ratings is >=2.5", () => {
        expect(mount(<SetuRating starRating={4.13} />).find(".book")).to.have.length(1);
        expect(mount(<SetuRating starRating={2.50} />).find(".book")).to.have.length(1);
    });

    it("should render a remove circle if learning ratings is <2.5", () => {
        expect(mount(<SetuRating starRating={1.51} />).find(".remove.circle")).to.have.length(1);
        expect(mount(<SetuRating starRating={2.49} />).find(".remove.circle")).to.have.length(1);
    });

    it("should render a thumbs up if enjoyment ratings is >=2.5", () => {
        expect(mount(<SetuRating heartRating={4.13} />).find(".thumbs.up")).to.have.length(1);
        expect(mount(<SetuRating heartRating={2.50} />).find(".thumbs.up")).to.have.length(1);
    });

    it("should render a thumbs down if enjoyment ratings is <2.5", () => {
        expect(mount(<SetuRating heartRating={1.51} />).find(".thumbs.down")).to.have.length(1);
        expect(mount(<SetuRating heartRating={2.49} />).find(".thumbs.down")).to.have.length(1);
    });
});

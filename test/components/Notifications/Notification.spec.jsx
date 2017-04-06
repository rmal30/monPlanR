import React from "react";
import { mount } from "enzyme";

import Notification from "../../../app/components/Notifications/Notification.jsx";

describe("COMPONENT: Notification", () => {
    it("Should render a notification title and a message", () => {
        const wrapper = mount(
            <Notification
                title="This is a test"
                message="Some message goes over here"
                 />
        );

        expect(
            wrapper.find(".header").text().trim()
        ).to.equal("This is a test");

        expect(
            wrapper.text().replace("This is a test", "").trim()
        ).to.equal("Some message goes over here");
    });

    it("Should have a default level to be info if it is not specified", () => {
        expect(
            mount(
                <Notification />
             ).find(".info.message")
        ).to.have.length(1);
    });

    it("Should follow a specified level", () => {
        expect(
            mount(
                <Notification level="info" />
             ).find(".info.message")
        ).to.have.length(1);

        expect(
            mount(
                <Notification level="warning" />
             ).find(".warning.message")
        ).to.have.length(1);

        expect(
            mount(
                <Notification level="error" />
             ).find(".negative.message")
        ).to.have.length(1);

        expect(
            mount(
                <Notification level="success" />
             ).find(".positive.message")
        ).to.have.length(1);
    });
});

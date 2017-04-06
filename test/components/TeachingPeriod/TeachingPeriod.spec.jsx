
/**
 * For some reason, the component complains that there is no store, as
 * the presentational component part of TeachingPeriod holds a container
 * component called ConfirmDeleteTeachingPeriod. Even adding a Provider
 *
 */

/*
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { shallow, mount } from "enzyme";

import { TeachingPeriod } from "../../../app/components/TeachingPeriod/TeachingPeriod.jsx";

describe("COMPONENT: TeachingPeriod", () => {
    it("should have <tr> as its root element", () => {
        const wrapper = shallow(
            <Provider store={createStore(state => state)}>
                <TeachingPeriod
                    index={2}
                    units={[]}
                    year={2010}
                    code={"S1-01"}
                     />
             </Provider>
        );

        expect(wrapper.html()).to.have.length(1);
    });

    it("should correctly render ", () => {
        const wrapper = shallow(
            <TeachingPeriod
                index={8}
                year={2015}
                code={"S2-01"}
                units={[]}
                 />
        );

        expect(wrapper.find("td").first().text()).to.equal("S2-01, 2015");
    });

    it("should have ConfirmDeleteTeachingPeriod", () => {
        const wrapper = shallow(
            <TeachingPeriod
                index={12}
                year={2022}
                code={"FY-01"}
                units={[]}
                 />
        );

        expect(wrapper.find("ConfirmDeleteTeachingPeriod")).to.have.length(1);
    });
});

*/

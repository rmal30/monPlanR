import React, { Component } from "react";
import { mount } from "enzyme";
import sinon from "sinon";
import TestBackend from "react-dnd-test-backend";
import { DragDropContext } from "react-dnd";

import UnitMessageDragSource, { UnitMessage } from "../../../app/components/Unit/UnitMessage.jsx";

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent) {
    return DragDropContext(TestBackend)(
        class TestContextContainer extends Component {
            /**
             * Render the component with all props pass down into it.
             */
            render() {
                return <DecoratedComponent {...this.props} />;
            }
        }
    );
}

describe("COMPONENT: UnitMessage", () => {
    describe("#presentational", () => {
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

    describe("#events", () => {
        let eventFunc;

        beforeEach(() => {
            eventFunc = sinon.spy();
        });

        it("Should call willAddUnit if unit is a newUnit and it has been clicked", () => {
            const wrapper = mount(
                <UnitMessage
                    newUnit
                    code="ABC1234"
                    name="Example unit"
                    willAddUnit={eventFunc}
                    hovering={false} />
            );

            wrapper.find(".message").simulate("click");
            expect(eventFunc).to.have.been.calledOnce;
        });

        it("Should call handleUnitMouseOver when mouse is over the unit", () => {
            const wrapper = mount(
                <UnitMessage
                    code="ABC1234"
                    name="Example unit"
                    handleUnitMouseOver={eventFunc}
                    hovering={false} />
            );

            wrapper.find(".message").simulate("mouseOver");
            expect(eventFunc).to.have.been.calledOnce;
        });

        it("Should call handleUnitMouseMove when mouse moves over the unit", () => {
            const wrapper = mount(
                <UnitMessage
                    code="ABC1234"
                    name="Example unit"
                    handleUnitMouseMove={eventFunc}
                    hovering={false} />
            );

            wrapper.find(".message").simulate("mouseMove");
            expect(eventFunc).to.have.been.calledOnce;
        });

        it("Should call handleUnitMouseOut when mouse is over the unit", () => {
            const wrapper = mount(
                <UnitMessage
                    code="ABC1234"
                    name="Example unit"
                    handleUnitMouseOut={eventFunc}
                    hovering={false} />
            );

            wrapper.find(".message").simulate("mouseOut");
            expect(eventFunc).to.have.been.calledOnce;
        });
    });

    describe("#DnD", () => {
        let backend, sourceId, movingUnitSpy, cancelMovingUnitSpy, testingBeginDrag, testingEndDrag;
        beforeEach(() => {
            /**
             * Tests the moving functionality of UnitMessage.
             */
            function movingUnit(unit, unitIndex, tpIndex) {
                if(!testingBeginDrag) {
                    return;
                }

                expect(unit).to.be.an("object");
                expect(unit.UnitCode).to.equal("ABC1234");
                expect(unit.UnitName).to.equal("Example unit");
                expect(unitIndex).to.equal(1);
                expect(tpIndex).to.equal(2);
            }

            movingUnitSpy = sinon.spy(movingUnit);

            /**
             * Tests the cancel moving functionality of UnitMessage.
             */
            function cancelMovingUnit(unitIndex, tpIndex) {
                if(!testingEndDrag) {
                    return;
                }

                expect(unitIndex).to.equal(1);
                expect(tpIndex).to.equal(2);
            }

            cancelMovingUnitSpy = sinon.spy(cancelMovingUnit);

            const UnitMessageDragSourceContainer = wrapInTestContext(UnitMessageDragSource);
            const wrapper = mount(
                <UnitMessageDragSourceContainer
                    draggable
                    movingUnit={movingUnitSpy}
                    cancelMovingUnit={cancelMovingUnitSpy}
                    index={1}
                    teachingPeriodIndex={2}
                    unit={{
                        UnitCode: "ABC1234",
                        UnitName: "Example unit"
                    }}
                    UnitCode="ABC1234"
                    name="Example unit" />
            );

            // Obtain a reference to the backend
            backend = wrapper.get(0).getManager().getBackend();

            // Find the drag source ID and use it to simulate the dragging operation
            sourceId = wrapper.find(UnitMessageDragSource).get(0).getHandlerId();
        });

        it("Should correctly call movingUnit when it is being dragged", () => {
            testingBeginDrag = true;
            testingEndDrag = false;

            backend.simulateBeginDrag([sourceId]);
            expect(movingUnitSpy).to.have.been.calledOnce;
        });

        it("Should correctylc call cancelMovingUnit ", () => {
            testingBeginDrag = false;
            testingEndDrag = true;

            backend.simulateBeginDrag([sourceId]);
            backend.simulateEndDrag(sourceId);
            expect(cancelMovingUnitSpy).to.have.been.calledOnce;
        });
    });
});

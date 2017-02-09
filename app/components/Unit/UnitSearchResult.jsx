import React, { Component, PropTypes } from "react";

import UnitMessage from "./UnitMessage.jsx";

/**
 * Returns the way in which we want a search result to be rendered
 * @author JXNS
 *
 * @param {string} UnitCode - The unit code associated with a result.
 * @param {string} UnitName - The unit name associated with a result.
 * @param {string} Faculty - The faculty associated with a result.
 * @param {bool} custom - Whether or not the unit is a custom unit.
 * @param {number} id - Index of search result.
 * @param {func} addUnit - Function that adds a unit to the course structure.
 * @param {object} unitToAdd - The unit to be added to the course.
 * @param {func} willAddUnit - Function that triggers add unit UI upon call.
 */
class UnitSearchResult extends Component {
    /**
    * State should only hold additional unit information.
    * CourseStructure component stores only the unit code to reduce space
    * usage.
    *
    * TODO: Find some way to make Unit stateless again.
    */
    constructor(props) {
        super(props);
        this.state = {
            hovering: false,
            /* Should be true iff user is hovering on the buttons */
            overInput: false
        };
    }

    /**
     * Updates state to indicate that the user is hovering on the unit.
     */
    handleMouseEnter() {
        if(!this.state.hovering) {
            this.setState({
                hovering: true,
                overInput: false
            });
        }
    }

    /**
     * Updates state to indicate that the user is hovering on the unit.
     */
    handleMouseMove() {
        if(!this.state.hovering) {
            this.setState({
                hovering: true
            });
        }
    }

    /**
     * Updates state to indicate that the user is no longer hovering on the
     * unit.
     */
    handleMouseLeave() {
        if(this.state.hovering) {
            this.setState({
                hovering: false,
                overInput: false
            });
        }
    }

    /**
     * Renders a UnitMessage component, which is draggable
     */
    render() {
        const { UnitCode, UnitName, Faculty, custom, id, unitToAdd, willAddUnit } = this.props;
        return (
            <UnitMessage
                newUnit
                basic
                draggable={!this.state.overInput}
                showDetailButton
                hovering={this.state.hovering}

                willAddUnit={this.props.willAddUnit}

                handleUnitMouseEnter={this.handleMouseEnter.bind(this)}
                handleUnitMouseMove={this.handleMouseMove.bind(this)}
                handleUnitMouseLeave={this.handleMouseLeave.bind(this)}
                handleButtonMouseEnter={() => this.setState({ overInput: true })}
                handleButtonMouseLeave={() => this.setState({ overInput: false })}

                code={UnitCode}
                name={UnitName}
                faculty={Faculty}
                onUnitClick={willAddUnit}
                custom={custom}
                unitToAdd={unitToAdd}
                index={id} />
        );
    }
}

UnitSearchResult.propTypes = {
    UnitCode: PropTypes.string.isRequired,
    UnitName: PropTypes.string.isRequired,
    Faculty: PropTypes.string,
    unitToAdd: PropTypes.object,
    willAddUnit: PropTypes.func,
    custom: PropTypes.bool,
    id: PropTypes.number.isRequired
};

export default UnitSearchResult;

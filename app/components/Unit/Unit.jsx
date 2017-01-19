import React, { PropTypes } from "react";
import { Button, Message, Header, Icon } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import { DragSource, DropTarget } from "react-dnd";
import { flow } from "lodash";

import UnitDetailModal from "./UnitDetailModal.jsx";

/**
* Implements the drag source contract.
*/
const unitSource = {
    beginDrag(props) {
        if(props.newUnit) {
            props.willAddUnit(props.code, props.custom, true);
        } else {
            props.willMoveUnit(props.index);
        }

        return {};
    },

    endDrag(props) {
        if(!props.newUnit) {
            props.cancelMoving();
        }
    }
};

/**
* Used for drop in react-dnd
*/
const unitTarget = {
    drop(props) {
        if(props.free) {
            if(props.addUnit && props.unitToAdd) {
                props.addUnit(props.index, props.unitToAdd);
            } else if(props.showMoveUnitUI) {
                props.moveUnit(props.index);
            }
        } else if(props.showMoveUnitUI) {
            props.swapUnit(props.index);
        } else if(props.placeholder && props.addUnit && props.unitToAdd) {
            props.addUnit(props.index, props.unitToAdd);
        }

        return {};
    }
};

/**
* Specifies the props to inject into your component.
*/
function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

/**
* Mapping functions to props (for react-dnd)
*/
function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

/**
* Unit component
*
* @class
* @extends React.Component
*/
class Unit extends React.Component {
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
            moving: false
        };
    }
    /**
    * Shows unit details in a modal.
    */
    handleDetail() {

    }

    /**
     * Updates state to indicate that the user is hovering on the unit.
     */
    handleMouseEnter() {
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
    handleMouseMove() {
        if(!this.state.hovering) {
            this.setState({
                hovering: true
            });
        }
    }

    /**
     *
     */
    handleMouseLeave() {
        if(this.state.hovering) {
            this.setState({
                hovering: false
            });
        }
    }

    /**
     * The handle click function is called whenever use clicks a table cell, if the cell is empty (not free),
     * then the unit detail button will be updated via the onUnitClick function
     */
    handleClick() {
        if(!this.props.free && this.props.onUnitClick) {
            this.props.onUnitClick(this.props.code, this.props.custom);
        }
        if((this.props.free || this.props.placeholder) && this.state.hovering && this.props.unitToAdd) {
            this.props.addUnit(this.props.index, this.props.unitToAdd);
        }
    }

    /**
     * Opens up a detailed unit view when a user double clicks a unit.
     */
    handleDoubleClick() {
        if(!this.props.free && typeof this.props.viewUnitDetails === "function") {
            this.props.viewUnitDetails(this.props.code, this.props.custom);
        }
    }

    /**
     *
     */
    handleMove() {
        if(!this.props.free) {
            this.setState({ moving: true });
        }
    }

    /**
     * If a unit is being moved, then start the move UI.
     */
    componentDidUpdate() {
        if(this.state.moving) {
            this.props.willMoveUnit(this.props.index);
        }
    }

    /**
    * Removes unit from the course structure.
    */
    handleDelete() {
        if(this.props.free) {
            return;
        }

        this.props.deleteUnit(this.props.index);
    }

    /**
     * Renders a table cell with a Message inside of it, which displays the
     * unit code and name, as well as showing the color to represent the
     * faculty of the unit.
     */
    render() {
        const facultyColors = {
            "Art, Design and Architecture": "pink",
            "Arts": "red",
            "Business and Economics": "teal",
            "Education": "violet",
            "Engineering": "orange",
            "Information Technology": "purple",
            "Law": "brown",
            "Medicine, Nursing and Health Sciences": "blue",
            "Pharmacy and Pharmaceutical Sciences": "olive",
            "Science": "green",
            "All": "yellow"
        };

        let facultyColor = undefined;

        if(!this.props.free && typeof this.props.faculty === "string") {
            facultyColor = facultyColors[this.props.faculty.replace("Faculty of ", "")];
        }

        const { connectDragSource, connectDropTarget, isOver }  = this.props;

        if(this.state.moving) {
            return null;
        }

        /**
         * Creates unit message
         */
        const unitMessage = mobile => (
            <Message
                color={facultyColor}
                className={"unit" + (!this.props.viewOnly ? " draggable" : "")}
                size="mini">
                <Message.Header>
                    {this.props.code}
                    {!this.props.viewOnly &&
                        <Button.Group className="no-print right floated" size="mini" compact style={{visibility: (this.state.hovering || mobile) && !this.props.showMoveUnitUI && !this.props.basic ? "visible" : "hidden" }}>
                            <Button basic className="removalButton" onClick={this.handleDelete.bind(this)} color="red" icon="close" />
                        </Button.Group>
                    }
                </Message.Header>
                {(!this.state.hovering || !this.showMoveUnitUI) &&
                    `${this.props.name}`
                }
            </Message>
        );

        const unit = (
            <MediaQuery maxDeviceWidth={767}>
                {mobile =>
                    this.props.noDetail ? unitMessage(mobile) : (
                        <UnitDetailModal
                            unitCode={this.props.code}
                            trigger={unitMessage(mobile)} />
                    )
                }
            </MediaQuery>
        );

        const unitPlaceholder = (
            <Message
                className="unit"
                size="mini"
                style={{background: "transparent", borderStyle: "dashed", borderColor: "#ccc", boxShadow: "none"}}>
                <Message.Header>{this.props.code}</Message.Header>
                {this.props.name}
            </Message>
        );

        return (
            <MediaQuery maxDeviceWidth={767}>
                {mobile => {
                    return (
                        connectDropTarget(
                        <td
                            style={{ backgroundColor: (this.props.isError || (this.props.errors && this.props.errors.length > 0)) ? "#ffe7e7" : "white"}}
                            className={(isOver || this.state.hovering && (this.props.free || this.props.placeholder) && this.props.unitToAdd !== undefined) && !mobile ? "active" : ""}
                            onMouseEnter={this.handleMouseEnter.bind(this)}
                            onMouseMove={this.handleMouseMove.bind(this)}
                            onMouseLeave={this.handleMouseLeave.bind(this)}
                            onClick={this.handleClick.bind(this)}
                            >
                            {(this.props.free || this.props.isDragging) && (!mobile || mobile && (this.props.unitToAdd !== undefined || this.props.showMoveUnitUI)) &&
                                <div style={{minHeight: 90, border: mobile ? "1px dashed grey": ""}}>
                                    {mobile && this.props.unitToAdd !== undefined &&
                                        <Header as="h4" icon textAlign="center" style={{marginTop: "0.5em"}}>
                                            <Icon name="plus" color="green" />
                                            Add {this.props.unitToAdd.UnitCode}
                                        </Header>
                                    }
                                </div>
                            }
                            {!this.props.free && !this.props.viewOnly && !this.props.isDragging &&
                                (this.props.placeholder ? unitPlaceholder : connectDragSource(<div>{unit}</div>))
                            }
                            {!this.props.free && this.props.viewOnly &&
                                (this.props.placeholder ? unitPlaceholder : <div>{unit}</div>)
                            }
                        </td>)
                    );
                }}
            </MediaQuery>
        );
    }
}

Unit.propTypes = {
    /* Used for indicating whether unit is free or not */
    free: PropTypes.bool,
    basic: PropTypes.bool,

    index: PropTypes.number,
    code: PropTypes.string,
    name: PropTypes.string,
    faculty: PropTypes.string,
    placeholder: PropTypes.bool,

    unitToAdd: PropTypes.shape({
        UnitName: PropTypes.string,
        UnitCode: PropTypes.string,
        Faculty: PropTypes.string
    }),

    addUnit: PropTypes.func,
    moveUnit: PropTypes.func,
    willMoveUnit: PropTypes.func,
    showMoveUnitUI: PropTypes.bool,
    swapUnit: PropTypes.func,
    deleteUnit: PropTypes.func,
    firstFreeUnit: PropTypes.bool,
    onUnitClick: PropTypes.func,
    viewUnitDetails: PropTypes.func,

    /* Whether or not it is a custom unit */
    custom: PropTypes.bool,

    /* Used for drag functionality */
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,

    /* Validation */
    isError: PropTypes.bool,
    errors: PropTypes.array,

    viewOnly: PropTypes.bool,

    /* Do not add unit detail modal that triggers upon click */
    noDetail: PropTypes.bool
};

// https://github.com/gaearon/react-dnd/issues/157

export default flow(
    DragSource("unit", unitSource, collectSource),
    DropTarget("unit", unitTarget, collectTarget)
)(Unit);

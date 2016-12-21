import React, { PropTypes } from "react";
import { Button, Message, Icon, Popup } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import { DragSource, DropTarget } from "react-dnd";
import { flow } from "lodash";

/**
* Implements the drag source contract.
*/
const unitSource = {
    beginDrag(props) {
        props.willMoveUnit(props.index);
        return {};
    }
};

/**
* Used for drop in react-dnd
*/
const unitTarget = {
    drop(props) {
        if(props.free) {
            props.moveUnit(props.index);
        } else {
            props.swapUnit(props.index);
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
     * 
     */
    handleMouseEnter() {
        if(!this.state.hovering) {
            this.setState({
                hovering: true
            });
        }
    }

    /**
     * 
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
        if(!this.props.free) {
            this.props.onUnitClick(this.props.code);
        }
        if(this.props.free && this.state.hovering && this.props.unitToAdd) {
            this.props.addUnit(this.props.index, this.props.unitToAdd); 
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
     * 
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
     * 
     */
    render() {
        const facultyColors = {
            "Art, Design and Architecture": "black",
            "Arts": "red",
            "Business and Economics": "teal",
            "Education": "violet",
            "Engineering": "orange",
            "Information Technology": "purple",
            "Law": "grey",
            "Medicine, Nursing and Health Sciences": "blue",
            "Pharmacy and Pharmaceutical Sciences": "olive",
            "Science": "green"
        };

        let facultyColor = undefined;

        if(!this.props.free && typeof this.props.faculty === "string") {
            facultyColor = facultyColors[this.props.faculty.replace("Faculty of ", "")];
        }

        const { connectDragSource, connectDropTarget, isOver }  = this.props;

        if(this.state.moving) {
            return null;
        }

        return (
            <MediaQuery maxDeviceWidth={767}>
                {mobile => {
                    return (
                        connectDropTarget(
                        <td
                            className={(isOver || this.state.hovering && this.props.free && this.props.unitToAdd !== undefined) && !mobile ? "active" : ""}
                            onMouseEnter={this.handleMouseEnter.bind(this)}
                            onMouseMove={this.handleMouseMove.bind(this)}
                            onMouseLeave={this.handleMouseLeave.bind(this)}
                            onClick={this.handleClick.bind(this)}
                            >
                            {this.props.free && this.props.unitToAdd !== undefined && mobile && this.props.firstFreeUnit &&
                                <Button color="green"><Icon name="plus" />Add {this.props.unitToAdd.code}</Button>
                            }
                            {!this.props.free &&
                                connectDragSource(
                                <div>
                                    <Message
                                        color={facultyColor}
                                        className={this.state.hovering ? "grab" : ""}
                                        style={this.state.hovering ? {boxShadow: "0px 0px 0px 1px rgba(34, 36, 38, 0.22) inset, 0px 2px 4px 0px rgba(34, 36, 38, 0.12), 0px 2px 10px 0px rgba(34, 36, 38, 0.15)"} : {}}
                                        size="mini">
                                        <Message.Header>
                                            {this.props.code}
                                            <Button.Group className="no-print right floated" size="mini" compact style={{visibility: (this.state.hovering || mobile) && !this.props.showMoveUnitUI && !this.props.basic ? "visible" : "hidden" }}>
                                                {false && <Button disabled={true} basic onClick={this.handleDetail.bind(this)} color="blue" icon="info" />}
                                                <Popup
                                                    trigger={<Button basic onClick={this.handleDelete.bind(this)} color="red" icon="close" />}
                                                    content='Remove unit'
                                                    size='mini'
                                                    positioning='bottom center'
                                                    />
                                            </Button.Group>
                                        </Message.Header>
                                        {(!this.state.hovering || !this.showMoveUnitUI) &&
                                            `${this.props.name}`
                                        }
                                    </Message>
                                </div>
                                )
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

    unitToAdd: PropTypes.shape({
        name: PropTypes.string,
        code: PropTypes.string,
        faculty: PropTypes.string
    }),

    addUnit: PropTypes.func,
    moveUnit: PropTypes.func,
    willMoveUnit: PropTypes.func,
    showMoveUnitUI: PropTypes.bool,
    swapUnit: PropTypes.func,
    deleteUnit: PropTypes.func,
    firstFreeUnit: PropTypes.bool,
    onUnitClick: PropTypes.func,

    /* Used for drag functionality */
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired
};

// https://github.com/gaearon/react-dnd/issues/157

export default flow(
    DragSource("unit", unitSource, collectSource),
    DropTarget("unit", unitTarget, collectTarget)
)(Unit);

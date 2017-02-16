import React, { PropTypes } from "react";
import { Message, Header, Icon } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import { DropTarget } from "react-dnd";

import UnitMessage from "./UnitMessage.jsx";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as dataFetchActions from "../../actions/DataFetchActions";
import * as courseActions from "../../actions/CourseActions";
import * as UIActions from "../../actions/UIActions";


/**
 * Set up any functions from the action creators you want to pass in
 */
const mapDispatchToProps = dispatch => {
    const actionBundle = {...dataFetchActions, ...courseActions, ...UIActions};
    return bindActionCreators(actionBundle, dispatch);
};

/**
 * The unit cells need to be aware of the current unit to add
 */
const mapStateToProps = state => {
    return {
        unitToAdd: state.CourseStructure.unitToAdd,
        highlightingInvalidUnitSlots: state.CourseStructure.highlightingInvalidUnitSlots,
        viewOnly: state.UI.readOnly,
        showingAddingUnitUI: state.UI.showingAddingUnitUI,
        showingMovingUnitUI: state.UI.showingMovingUnitUI
    };
};

/**
* Used for drop in react-dnd
*/
const unitTarget = {
    drop(props) {
        if(props.free || props.placeholder) {
            if(props.showingAddingUnitUI) {
                props.addUnit(props.teachingPeriodIndex, props.index, props.unitToAdd);
            } else if(props.showingMovingUnitUI) {
                props.moveUnit(props.index, props.teachingPeriodIndex);
            }
        } else if(props.showingMovingUnitUI) {
            props.swapUnit(props.index, props.teachingPeriodIndex, props.unit);
        }

        return {};
    }
};

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
* Unit component. Class is exported for unit testing.
*
* @class
* @extends React.Component
*/
export class Unit extends React.Component {
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
            tableCellHover: false,
            overInput: false
        };
    }

    /**
     * Used when the user hovers on a table cell whilst adding a unit.
     */
    handleTableCellMouseOver() {
        this.setState({
            tableCellHover: true
        });
    }

    /**
     * Used when the user is no longer hovering on a table cell.
     */
    handleTableCellMouseOut() {
        this.setState({
            tableCellHover: false
        });
    }

    /**
     * Set hover to false if we are no longer adding a unit. This is a
     * workaround in case the browser does not detect a mouseOut.
     */
    componentWillReceiveProps(nextProps) {
        if(this.props.unitToAdd && !nextProps.unitToAdd || this.props.showingMovingUnitUI && !nextProps.showingMovingUnitUI) {
            this.setState({
                tableCellHover: false
            });
        }
    }

    /**
     * Updates state to indicate that the user is hovering on the unit.
     */
    handleUnitMouseOver() {
        if(!this.state.hovering) {
            this.setState({
                hovering: true
            });
        }
    }

    /**
     * Updates state to indicate that the user is hovering on the unit.
     */
    handleUnitMouseMove() {
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
    handleUnitMouseOut() {
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
        if((this.props.free || this.props.placeholder) && this.props.unitToAdd) {
            this.props.addUnit(this.props.teachingPeriodIndex, this.props.index, this.props.unitToAdd);
        }
    }

    /**
    * Removes unit from the course structure.
    */
    handleDelete() {
        if(this.props.free) {
            return;
        }

        this.props.removeUnit(this.props.teachingPeriodIndex, this.props.index, this.props.creditPoints, this.props.cost);
    }

    /**
     * Renders a table cell with a Message inside of it, which displays the
     * unit code and name, as well as showing the color to represent the
     * faculty of the unit.
     */
    render() {
        const { connectDropTarget, isOver }  = this.props;

        return (
            <MediaQuery maxDeviceWidth={767}>
                {mobile => {
                    return (
                        connectDropTarget(
                        <td
                            className={(((isOver && this.props.showingMovingUnitUI) || (this.props.free || this.props.placeholder) && (this.props.showingAddingUnitUI && (isOver || this.state.tableCellHover)))) && !mobile ? "active" : "" +
                                        (this.props.isError || !this.props.highlightingInvalidUnitSlots && (this.props.errors && this.props.errors.length > 0) ? "unit error": "")
                            }
                            onMouseOver={this.handleTableCellMouseOver.bind(this)}
                            onMouseOut={this.handleTableCellMouseOut.bind(this)}
                            onClick={this.handleClick.bind(this)}
                            >
                            {(this.props.free) && (!mobile || mobile && (this.props.unitToAdd !== undefined || this.props.showingMovingUnitUI)) &&
                                <div style={{minHeight: 90, border: mobile ? "1px dashed grey": ""}}>
                                    {mobile && this.props.unitToAdd !== undefined &&
                                        <Header as="h4" icon textAlign="center" style={{marginTop: "0.5em"}}>
                                            <Icon name="plus" color="green" />
                                            Add {this.props.unitToAdd.unitCode}
                                        </Header>
                                    }
                                </div>
                            }
                            {!this.props.free &&
                                <div>
                                    {this.props.placeholder &&
                                        <Message
                                            className="unit placeholder"
                                            onClick={e => {
                                                // If we're not adding a unit.
                                                if(!this.props.unitToAdd) {
                                                    e.stopPropagation() /* otherwise sidebar will never show */;
                                                    this.props.showSidebar();
                                                }
                                            }}
                                            size="mini">
                                            <Message.Header>{this.props.code}</Message.Header>
                                            {this.props.name}
                                        </Message>
                                    }
                                    {!this.props.placeholder &&
                                        <UnitMessage
                                            code={this.props.code}
                                            name={this.props.name}
                                            draggable={!this.props.viewOnly && !this.state.overInput}
                                            unit={this.props.unit}
                                            index={this.props.index}
                                            teachingPeriodIndex={this.props.teachingPeriodIndex}
                                            newUnit={this.props.newUnit}
                                            faculty={this.props.faculty}
                                            basic={this.props.basic}
                                            hovering={this.state.hovering}
                                            viewOnly={this.props.viewOnly}
                                            showDetailButton={this.props.detailButton}

                                            movingUnit={this.props.movingUnit}
                                            cancelMovingUnit={this.props.cancelMovingUnit}

                                            handleUnitMouseOver={this.handleUnitMouseOver.bind(this)}
                                            handleUnitMouseMove={this.handleUnitMouseMove.bind(this)}
                                            handleUnitMouseOut={this.handleUnitMouseOut.bind(this)}
                                            handleButtonMouseEnter={() => this.setState({ overInput: true })}
                                            handleButtonMouseLeave={() => this.setState({ overInput: false })}

                                            handleDelete={this.handleDelete.bind(this)}
                                            fetchUnitInfo={this.props.fetchUnitInfo}
                                            errors={this.props.errors}
                                        />
                                    }
                                </div>
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

    newUnit: PropTypes.bool,
    unit: PropTypes.object,

    index: PropTypes.number,
    code: PropTypes.string,
    name: PropTypes.string,
    faculty: PropTypes.string,
    placeholder: PropTypes.bool,
    /* Used for placeholder units when users click on it */
    showSidebar: PropTypes.func,

    unitToAdd: PropTypes.object,
    showingAddingUnitUI: PropTypes.bool,

    addUnit: PropTypes.func,
    moveUnit: PropTypes.func,
    willMoveUnit: PropTypes.func,
    showingMovingUnitUI: PropTypes.bool,
    swapUnit: PropTypes.func,
    deleteUnit: PropTypes.func,
    hovering: PropTypes.bool,
    onUnitClick: PropTypes.func,
    viewUnitDetails: PropTypes.func,

    willAddUnit: PropTypes.func,
    movingUnit: PropTypes.func,
    cancelMovingUnit: PropTypes.func,

    /* Whether or not it is a custom unit */
    custom: PropTypes.bool,


    /* Used for drop functionality */
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,

    /* Validation */
    isError: PropTypes.bool,
    errors: PropTypes.array,
    highlightingInvalidUnitSlots: PropTypes.bool,

    viewOnly: PropTypes.bool,

    /* Switch to detail button for viewing unit details */
    detailButton: PropTypes.bool,

    /* Redux action creators */
    fetchUnitInfo: PropTypes.func,
    removeUnit: PropTypes.func,

    teachingPeriodIndex: PropTypes.number,
    creditPoints: PropTypes.number,
    cost: PropTypes.number
};

// https://github.com/gaearon/react-dnd/issues/157

const drop = DropTarget("unit", unitTarget, collectTarget)(Unit);
export default connect(mapStateToProps, mapDispatchToProps)(drop);

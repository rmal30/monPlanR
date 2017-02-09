import React, { PropTypes } from "react";
import { Button, Icon, Message, Popup } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import { DragSource } from "react-dnd";

import UnitDetailModal from "./UnitDetailModal.jsx";

/**
* Implements the drag source contract.
*/
const unitSource = {
    beginDrag(props) {
        if(props.newUnit) {
            props.willAddUnit(props.code, props.custom, true);
        } else {
            props.movingUnit(props.unit, props.index, props.teachingPeriodIndex);
        }

        return {};
    },

    endDrag(props, monitor) {
        if(!props.newUnit && !monitor.didDrop()) {
            props.cancelMovingUnit(props.index, props.teachingPeriodIndex);
        }
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
 * The message component.
 */
export function UnitMessage(props) {
    UnitMessage.propTypes = {
        code: PropTypes.string,
        name: PropTypes.string,
        faculty: PropTypes.string,

        newUnit: PropTypes.bool,
        viewOnly: PropTypes.bool,
        showMoveUnitUI: PropTypes.bool,
        basic: PropTypes.bool,
        hovering: PropTypes.bool,
        showDetailButton: PropTypes.bool,

        handleDelete: PropTypes.func,

        handleButtonMouseEnter: PropTypes.func,
        handleButtonMouseLeave: PropTypes.func,

        handleUnitMouseEnter: PropTypes.func,
        handleUnitMouseMove: PropTypes.func,
        handleUnitMouseLeave: PropTypes.func,

        fetchUnitInfo: PropTypes.func,

        errors: PropTypes.array,

        index: PropTypes.number,
        teachingPeriodIndex: PropTypes.number,

        /* Used for drag functionality */
        draggable: PropTypes.bool,
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        willAddUnit: PropTypes.func,
        movingUnit: PropTypes.func,
        cancelMovingUnit: PropTypes.func,

        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    const { connectDragSource, isDragging } = props;

    if(isDragging) {
        return null;
    }

    const facultyColors = {
        "Art, Design and Architecture": "yellow",
        "Arts": "red",
        "Business and Economics": "teal",
        "Education": "violet",
        "Engineering": "orange",
        "Information Technology": "purple",
        "Law": "grey",
        "Medicine, Nursing and Health Sciences": "blue",
        "Pharmacy and Pharmaceutical Sciences": "olive",
        "Science": "green",
        "All": "black"
    };

    let facultyColor = undefined;

    if(typeof props.faculty === "string") {
        facultyColor = facultyColors[props.faculty.replace("Faculty of ", "")];
    }

    /**
     * Message component is used twice.
     */
    const unitMessage = mobile =>
        <Message
            style={{cursor: "pointer", width: props.width ? props.width: undefined}}
            color={facultyColor}
            className={"unit" + (props.draggable ? " draggable" : "")}

            onMouseEnter={e => props.handleUnitMouseEnter && props.handleUnitMouseEnter(e)}
            onMouseMove={e => props.handleUnitMouseMove && props.handleUnitMouseMove(e)}
            onMouseLeave={e => props.handleUnitMouseLeave && props.handleUnitMouseLeave(e)}
            size="mini">
            <Message.Header>
                {props.code}
                {!props.viewOnly &&
                    <Button.Group onMouseEnter={props.handleButtonMouseEnter} onMouseLeave={props.handleButtonMouseLeave}
                      className="no-print right floated" size="mini" compact style={{visibility: (props.hovering || mobile) && !props.showMoveUnitUI ? "visible" : "hidden" }}>
                        <Button inverted color="red" onClick={props.handleDelete} icon="close" style={{display: !props.basic ? "block" : "none"}} />
                        {props.showDetailButton &&
                            <UnitDetailModal
                                onClick={() => props.fetchUnitInfo(props.code)}
                                unitCode={props.code}
                                trigger={<Button className="btnlightblue" color="blue" icon="info" />} />
                        }
                    </Button.Group>
                }

            </Message.Header>
            {props.name}
            <div style={{position: "absolute", bottom: "0.5em", right: "0.5em"}}>
                <Popup
                    trigger={(props.errors && props.errors.length > 0) &&
                            <Icon inverted color="red" name="warning" size="large" />
                    }
                    positioning="bottom left"
                    size="mini"
                    >
                <Popup.Header>The following problems were discovered</Popup.Header>
                <Popup.Content>
                    <ul>{(props.errors && props.errors.length > 0) && props.errors.map((error, index) => <li key={index}>{error.message}</li>)}</ul>
                </Popup.Content>
                </Popup>
            </div>
        </Message>;

    return props.draggable ? connectDragSource(
        <div>
            <MediaQuery maxDeviceWidth={767}>
                {mobile =>
                    props.showDetailButton ? unitMessage(mobile) : (
                        <UnitDetailModal
                            onClick={() => {props.fetchUnitInfo(props.code);}}
                            unitCode={props.code}
                            trigger={unitMessage(mobile)} />
                    )
                }
            </MediaQuery>
        </div>
    ) : (
        <MediaQuery maxDeviceWidth={767}>
            {mobile =>
                props.showDetailButton ? unitMessage(mobile) : (
                    <UnitDetailModal
                        onClick={() => {props.fetchUnitInfo(props.code);}}
                        unitCode={props.code}
                        trigger={unitMessage(mobile)} />
                )
            }
        </MediaQuery>
    );
}


export default DragSource("unit", unitSource, collectSource)(UnitMessage);

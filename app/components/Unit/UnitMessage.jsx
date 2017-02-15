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
            props.willAddUnit(
                props.code,
                props.custom && {
                    UnitCode: props.code,
                    customUnitDragging: true
                },
                true);
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
        hovering: PropTypes.bool,

        handleDelete: PropTypes.func,

        handleButtonMouseEnter: PropTypes.func,
        handleButtonMouseLeave: PropTypes.func,

        handleUnitMouseOver: PropTypes.func,
        handleUnitMouseMove: PropTypes.func,
        handleUnitMouseOut: PropTypes.func,

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

    const { isDragging } = props;

    if(isDragging) {
        return null;
    }

    let connectDragSource;
    if(props.draggable) {
        connectDragSource = props.connectDragSource;
    } else {
        connectDragSource = ele => ele;
    }

    return connectDragSource(
        <div>
            <MediaQuery maxDeviceWidth={767}>
                {mobile =>
                    <UnitDetailModal
                        neverShow={props.newUnit}
                        onClick={() => !props.newUnit && props.fetchUnitInfo(props.code)}
                        unitCode={props.code}
                        trigger={
                            <Message
                                style={{cursor: "pointer", width: props.width ? props.width: undefined}}
                                className={"unit "  + (props.draggable ? "draggable" : "")}
                                color="blue"

                                onClick={() => props.newUnit && props.willAddUnit &&
                                    props.willAddUnit(props.code,
                                        props.custom && {
                                            UnitCode: props.code,
                                            customUnitDragging: true
                                        }
                                )}
                                onMouseOver={e => props.handleUnitMouseOver && props.handleUnitMouseOver(e)}
                                onMouseMove={e => props.handleUnitMouseMove && props.handleUnitMouseMove(e)}
                                onMouseOut={e => props.handleUnitMouseOut && props.handleUnitMouseOut(e)}
                                size="mini">
                                <Message.Header>
                                    {props.code}
                                    {!props.viewOnly &&
                                        <Button.Group onMouseEnter={props.handleButtonMouseEnter} onMouseLeave={props.handleButtonMouseLeave}
                                          className="no-print right floated" size="mini" compact style={{visibility: (props.hovering || mobile) && !props.showMoveUnitUI ? "visible" : "hidden" }}>
                                            <Button inverted color="red" onClick={props.handleDelete} icon="close" style={{display: !props.newUnit ? "block" : "none"}} />
                                            {props.newUnit &&
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
                                                <Icon inverted color="red" name="warning sign" size="big" />
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
                            </Message>
                        } />
                }
            </MediaQuery>
        </div>
    );
}


export default DragSource("unit", unitSource, collectSource)(UnitMessage);

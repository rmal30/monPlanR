import React, { PropTypes } from "react";
import { Message } from "semantic-ui-react";

/**
 * Displays useful information to guide the student on what to do next.
 * 
 * @author Saurabh Joshi
 */
export default function CourseMessage(props) {
    CourseMessage.propTypes = {
        isError: PropTypes.bool,
        errorHeader: PropTypes.bool,
        errorMsg: PropTypes.bool,

        unitToAdd: PropTypes.bool,
        showMoveUnitUI: PropTypes.bool,
        unitToBeMoved: PropTypes.bool,

        cancelAddingToCourse: PropTypes.func
    };

    return (
        <span>
            {props.isError &&
                <Message
                    negative
                    className="no-print">
                    <Message.Header>
                       {props.errorHeader}
                    </Message.Header>
                    <p>
                        {props.errorMsg}
                    </p>
                </Message>
            }
            {!props.showMoveUnitUI && !props.unitToAdd &&
                <Message className="no-print">
                    <Message.Header>
                        Ready to add units to course plan
                    </Message.Header>
                    <p>
                        Search for units by clicking the plus icon in the header, then place it in your course plan.
                    </p>
                </Message>
            }
            {props.unitToAdd && !props.showMoveUnitUI && !props.isError &&
                <Message
                    positive
                    className="no-print"
                    onDismiss={props.cancelAddingToCourse}>
                    <Message.Header>
                        Adding {props.unitToAdd.UnitCode}
                    </Message.Header>
                    <p>
                        Select a table cell in your course structure to insert {props.unitToAdd.UnitCode}.
                    </p>
                </Message>
            }
            {props.showMoveUnitUI &&
                <Message info className="no-print">
                    <Message.Header>
                        Moving {props.unitToBeMoved.UnitCode}
                    </Message.Header>
                    <p>
                        Drop into a table cell in your course structure to move {props.unitToBeMoved.UnitCode}.
                        Dropping into a table cell where there is already an occupied unit will swap the units.
                    </p>
                </Message>
            }
        </span>
    );
}

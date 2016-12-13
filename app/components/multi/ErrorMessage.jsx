import React, { PropTypes } from "react";
import { Message } from "semantic-ui-react";

/**
 * This is the setuRating component, it returns 2 ratings, one representing how much the student's felt they learnt from a unit, and one representing
 * how much they enjoyed a unit.
 * @author JXNS
 * 
 * @param {number} starRating - the level of student learning (0 to 5)
 * @param {number} heartRating - the level of student enjoyment (0 to 5)
 */
function ErrorMessage(props) {

    ErrorMessage.propTypes = {
        header: PropTypes.string.isRequired,
        errorMessage: PropTypes.string.isRequired
    }

    return (
        <Message
            error
            header={props.header}
            content={props.errorMessage}
        />
    );
}

export default ErrorMessage
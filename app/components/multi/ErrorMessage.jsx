import React, { PropTypes } from "react";
import { Message } from "semantic-ui-react";

/**
 * This is the error message component, it displays an error message where ever it is placed, 
 * using 
 * @author JXNS
 * 
 * @param {string} header - The tile of the error
 * @param {string} errorMessage - The description of the error
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
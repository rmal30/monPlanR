import React, { PropTypes } from "react";
import { Popup } from "semantic-ui-react";

/**
 * Tooltips assists students by providing additional information on elements
 * when users hover on them.
 *
 * TODO: Work out if it is necessary to have a ToolTips component, or just
 * use Popup components directly.
 *
 * @author Eric Jiang, Saurabh Joshi
 */
export default function ToolTips({ title, message, direction, target, on }) {
    ToolTips.propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
        direction: PropTypes.string,
        target: PropTypes.element.isRequired,
        on: PropTypes.string
    };

    if(direction === null || direction === "") {
        direction = "bottom left";
    }

    if (on === "") {
        on = "focus";
    }

    if(title !== "" && message !== "") {
        return (
            <Popup
                header={title}
                trigger={target}
                content={message}
                positioning={direction}
                on={on}
                />
        );
    } else {
        return null;
    }
}

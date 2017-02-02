import React, { PropTypes } from "react";

import Notification from "./Notification.jsx";

/**
 * Notifications is displayed to the user at the top right of the screen for
 * users to see.
 */
export default function Notifications(props) {
    Notifications.propTypes = {
        notificationsList: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                message: PropTypes.string,
                dismissable: PropTypes.bool,
                level: PropTypes.oneOf([undefined, "info", "success", "warning", "error"])
            })
        ),
        removeNotification: PropTypes.func
    };

    return (
        <div style={{position: "fixed", top: "1em", right: "1em", zIndex: 9999}}>
            {props.notificationsList &&
                props.notificationsList.map(
                    ({ id, title, message, dismissable, level }) =>
                        <Notification
                            key={id}
                            id={id}
                            title={title}
                            message={message}
                            dismissable={dismissable}
                            level={level}
                            removeNotification={props.removeNotification} />
            )}
        </div>
    );
}

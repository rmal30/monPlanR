import React, { PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Notification from "./Notification.jsx";

/**
 * Notifications is displayed to the user at the top right of the screen for
 * users to see.
 */
export default function Notifications(props) {
    Notifications.propTypes = {
        notificationsList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                title: PropTypes.string,
                message: PropTypes.string,
                dismissable: PropTypes.bool,
                level: PropTypes.oneOf([undefined, "info", "success", "warning", "error"])
            })
        ),
        removeNotification: PropTypes.func
    };

    return (
        <div className="notifications">
            <ReactCSSTransitionGroup
                transitionName="slide"
                transitionEnterTimeout={125}
                transitionLeave={false}>
                {props.notificationsList &&
                    props.notificationsList.map(
                        ({ id, title, message, dismissable, level }, index) =>
                            <Notification
                                key={id || (props.notificationsList.length - 1 - index)}
                                id={id}
                                index={index}
                                title={title}
                                message={message}
                                dismissable={dismissable}
                                level={level}
                                removeNotification={props.removeNotification} />
                )}
            </ReactCSSTransitionGroup>
        </div>
    );
}

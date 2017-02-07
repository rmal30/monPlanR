import React, { PropTypes } from "react";
import { Icon, Message } from "semantic-ui-react";

/**
 * A notification is a message for the reader to see.
 *
 * @author Saurabh Joshi
 * @param {string} id - The ID of the notification
 * @param {string} title - Notification's title
 * @param {string} message - The message of the notification.
 * @param {bool} dismissable - Whether or not to allow the user to dismiss the
 * notification.
 * @param {func} removeNotification - Callback function to be used when user
 * dismisses the notification.
 * @param {string} level - What type of notification is it (One of "info",
 * "success", "warning", "error").
 */
export default function Notification({ id, index, title, message, dismissable = true, removeNotification, level = "info"}) {
    Notification.propTypes = {
        id: PropTypes.string,
        index: PropTypes.number,
        title: PropTypes.string,
        message: PropTypes.string,
        dismissable: PropTypes.bool,
        removeNotification: PropTypes.func,
        level: PropTypes.oneOf(["info", "success", "warning", "error"])
    };

    const iconName = {
        info: "info circle",
        success: "check circle",
        warning: "warning circle",
        error: "remove circle"
    }[level];

    return (
        <Message icon
            className="notify"
            info={level === "info"}
            positive={level === "success"}
            warning={level === "warning"}
            negative={level === "error"}
            onDismiss={dismissable ? () => removeNotification(id, index) : undefined}>
            <Icon name={iconName} />
            <Message.Content>
                <Message.Header>{title}</Message.Header>
                <i>{message}</i>
            </Message.Content>
        </Message>
    );
}

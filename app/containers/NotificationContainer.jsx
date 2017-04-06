import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import *  as NotificationActions from "../actionCreators/Notifications.js";

import NotificationsComponent from "../components/Notifications/Notifications.jsx";

/**
 * Populate list from redux state into props.
 */
const mapStateToProps = state => {
    return {
        notificationsList: state.Notifications.notificationsList
    };
};

/**
 * Injecting redux functions into component.
 */
const mapDispatchToProps = dispatch => {
    return bindActionCreators(NotificationActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent);

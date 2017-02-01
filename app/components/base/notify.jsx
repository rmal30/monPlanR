import React , {Component, PropTypes} from "react";
import NotificationSystem from "react-notification-system";

/**
* Notify System
*/
class Notify extends Component {
    /**
     * State holds a unit object that is used during the add
     * unit process.
     *
     * @param {object} props - React's props
     */
    constructor(props){
        super(props);

        this.state = {
            unitToAdd: undefined,
            showAddToCourseUI: false,
            totalCredits: 0,
            totalCost: 0,
            focusedUnitCode: "",
            customUnitCode: undefined,
            searchResults: null,
            searchResultIndex: 0,
            courseToLoad: "",
            courseYear: 0
        };

        this.addNotification = this.addNotification.bind(this);
    }

    /**
    * Does a addNotifaction Call on mounting of component
    */
    componentDidMount(){
        this._notificationSystem = this.refs.notificationSystem;
        this.addNotification("Ready to add units to course plan", "Search for units by clicking the plus icon in the header, then place it in your course plan.", "info", 0);
        this.addNotification("Adding " , "Select a table cell in your course structure to insert", "success");
        this.addNotification("Moving " , "Drop into a table cell in your course structure to move {props.unitToBeMoved.UnitCode}. Dropping into a table cell where there is already an occupied unit will swap the units.", "warning");
        this.addNotification("Error " , "I'm afraid I can't let you do that Saurabh", "error");
    }

    /**
    * Main addNotifaction Call on mounting of component
    */
    addNotification(title, message, level, dismiss=10){
        this._notificationSystem.addNotification({
            title: title,
            message: message,
            level: level,
            autoDismiss: dismiss
        });
    }

    /**
    *   Main render method
    */
    render(){
        return (
            <div>
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
}

Notify.propTypes = {
    isError: PropTypes.bool,
    errorHeader: PropTypes.bool,
    errorMsg: PropTypes.bool,

    unitToAdd: PropTypes.bool,
    showMoveUnitUI: PropTypes.bool,
    unitToBeMoved: PropTypes.bool,

    cancelAddingToCourse: PropTypes.func
};
export default Notify;

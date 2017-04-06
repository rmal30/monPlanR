const initialState = {
    notificationsList: []
};

/**
 * Notifications reducer
 */
export default function Notifications(state=initialState, action) {
    switch(action.type) {
        case "ADD_NOTIFICATION": {
            const index = state.notificationsList.findIndex(notification => notification.id !== undefined && notification.id === action.id);
            // Replace notification if it already exists
            if(index > -1) {
                return {
                    ...state,
                    notificationsList: [
                        ...state.notificationsList.slice(0, index),
                        {
                            id: action.id,
                            title: action.title || state.notificationsList[index].title,
                            message: action.message || state.notificationsList[index].message,
                            dismissable: action.dismissable || state.notificationsList[index].dismissable,
                            level: action.level || state.notificationsList[index].level,
                            autoDismiss: action.autoDismiss || state.notificationsList[index].autoDismiss
                        },
                        ...state.notificationsList.slice(index + 1)
                    ]
                };
            }

            return {
                ...state,
                notificationsList: [
                    {
                        id: action.id,
                        title: action.title,
                        message: action.message,
                        dismissable: action.dismissable,
                        level: action.level,
                        autoDismiss: action.autoDismiss
                    },
                    ...state.notificationsList
                ]
            };
        }
        case "REMOVE_NOTIFICATION":
            return {
                ...state,
                notificationsList: state.notificationsList.filter(
                    (notfication, index) =>
                        action.id !== undefined && notfication.id !== action.id || action.id === undefined && index !== action.index
                )
            };
        default:
            return state;
    }
}

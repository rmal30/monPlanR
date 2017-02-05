const initialState = {
    notificationsList: []
};

/**
 * Notifications reducer
 */
export default function Notifications(state=initialState, action) {
    switch(action.type) {
        case "ADD_NOTIFICATION":
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
        case "REMOVE_NOTIFICATION":
            return {
                ...state,
                notificationsList: state.notificationsList.filter(notfication => notfication.id !== action.id)
            };
        default:
            return state;
    }
}
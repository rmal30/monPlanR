/**
 * ADD_NOTIFICATION
 */
 export const addNotification = ({ id, title, message, level, dismissable, autoDismiss }) => {
     return dispatch => {
         dispatch({
             type: "ADD_NOTIFICATION",
             id,
             title,
             message,
             dismissable,
             level
         });

         if(autoDismiss && autoDismiss > 0) {
             setTimeout(() => dispatch(removeNotification(id)), autoDismiss);
         }
     };
 };

/**
 * REMOVE_NOTIFICATION
 */
 export const removeNotification = id => {
     return {
         type: "REMOVE_NOTIFICATION",
         id
     };
 };

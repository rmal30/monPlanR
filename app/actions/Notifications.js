/**
 * ADD_NOTIFICATION
 */
 export const addNotification = ({ id, index, title, message, level, dismissable, autoDismiss }) => {
     return dispatch => {
         dispatch({
             type: "ADD_NOTIFICATION",
             id,
             index,
             title,
             message,
             dismissable,
             level
         });

         if(autoDismiss && autoDismiss > 0) {
             setTimeout(() => dispatch(removeNotification(id, index)), autoDismiss);
         }
     };
 };

/**
 * REMOVE_NOTIFICATION
 */
 export const removeNotification = (id, index) => {
     return {
         type: "REMOVE_NOTIFICATION",
         id,
         index
     };
 };

/**
 * A workaround for grabbing input value of a Semantic UI component which is a
 * search selection component.
 *
 * @param {SyntheticEvent} event - The onChange event argument
 * @param {function} callback - A callback function that gives the value in string as an argument.
 */
export default function SearchSelectDropdownGrabValueWorkaround(event, callback) {
    if(event.type === "click") {
        callback(event.target.textContent);
    } else if(event.type === "keydown") {
        callback(event.target.nextSibling.textContent);
    } else if(event.target.nodeName.toLowerCase() === "input") {
        // This is needed to prevent facebook from cleaning up the event
        event.persist();

        // For some reason text element has no textContent for a very brief period
        setTimeout(() => {
            callback(event.target.parentElement.getElementsByClassName("text")[0].textContent);
        }, 0);

        return;
    }
}

import React, { PropTypes } from "react";
import { Icon, Button } from "semantic-ui-react";

/**
 * Represents the Collapsable button that the Unit detail view uses to hide/show content
 * @author JXNS
 *
 * @param {function} onCollapseClick - this is the function that should be called for the external container when the collapse button is pressed
 * @param {boolean} collapse - this represents the current state of the button, if collapse is true, it is in the 'collapsed' state
 * @param {boolean} isDisabled - this is only necessary for before the first search of a unit. Before a unit is selected the view should never be shown,
 * to ensure this happens, we disable the button before the user searchs and re-enable it after.
 * @param {string} currentUnit - this is used to make the button dynamic and show what is currently selected
 */
function CollapseButton(props){

    CollapseButton.propTypes = {
        onCollapseClick: PropTypes.func.isRequired,
        collapse: PropTypes.bool.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        currentUnit: PropTypes.string
    };

    if(props.collapse){
        return(
            <Button disabled={props.isDisabled} compact={true} onClick={props.onCollapseClick}>
                    {props.currentUnit ? "Show " + props.currentUnit + " details " : "Show unit details "} <Icon name="chevron down" />
            </Button>
        );
    } else {
        return (
            <Button disabled={props.isDisabled} compact={true} onClick={props.onCollapseClick}>
                    {props.currentUnit ? "Hide " + props.currentUnit + " details " : "Hide unit details "} <Icon name="chevron up" />
            </Button>
        );
    }
}

export default CollapseButton;

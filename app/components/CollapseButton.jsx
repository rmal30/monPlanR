import React, { PropTypes } from "react";
import { Grid, Icon, Button } from "semantic-ui-react";

function CollapseButton(props){
    if(props.collapse){
        return(
            <Button compact={true} onClick={props.onCollapseClick}>
                    Show unit details <Icon name="chevron down" />
            </Button>
        );
    } else {
        return (
            <Button compact={true} onClick={props.onCollapseClick}>
                    Hide unit details <Icon name="chevron up" />
            </Button>
        );
    }
}

CollapseButton.propTypes = {
    onCollapseClick: PropTypes.func.isRequired,
    collapse: PropTypes.bool.isRequired
};

export default CollapseButton;

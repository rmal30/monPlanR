import React, { PropTypes } from "react";
import { Rating, Icon } from "semantic-ui-react"

function SetuRating(props) {
    return (
        <div id="setu-rating">
            <p>I learnt a lot</p>
            <Rating icon='star' defaultRating={props.starRating} maxRating={5} disabled/>
            <hr />
            <p>I enjoyed the unit</p>
            <Rating icon='heart' defaultRating={props.heartRating} maxRating={5} disabled/>
        </div>
        
    );
}

SetuRating.propTypes = {
    starRating: PropTypes.number.isRequired,
    heartRating: PropTypes.number.isRequired
}

export default SetuRating;
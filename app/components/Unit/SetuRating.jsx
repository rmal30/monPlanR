import React, { PropTypes } from "react";
import { Rating, Icon } from "semantic-ui-react"

/**
 * This is the setuRating component, it returns 2 ratings, one representing how much the student's felt they learnt from a unit, and one representing
 * how much they enjoyed a unit.
 * @author JXNS
 * 
 * @param {number} starRating - the level of student learning (0 to 5)
 * @param {number} heartRating - the level of student enjoyment (0 to 5)
 */
function SetuRating(props) {

    SetuRating.propTypes = {
        starRating: PropTypes.number.isRequired,
        heartRating: PropTypes.number.isRequired
    }

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

export default SetuRating;
import React, { PropTypes } from "react";
import { Divider, Rating } from "semantic-ui-react";

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
        starRating: PropTypes.number,
        heartRating: PropTypes.number
    };
    let noLearnResponses = props.learnResponseCount === 0;
    let noEnjoyResponses = props.enjoyResponseCount === 0;

    return (
        <div id="setu-rating">
            <p>I learnt a lot</p>
            <Rating icon='star' defaultRating={noLearnResponses ? 0 : Math.round(props.starRating)} maxRating={5} disabled/>
            {noLearnResponses ? <p>(No responses yet)</p> : <p>({props.starRating.toFixed(2)}/5) - {props.learnResponseCount} responses</p>}
            <Divider />
            <p>I enjoyed the unit</p>
            <Rating icon='heart' defaultRating={noEnjoyResponses ? 0 : Math.round(props.heartRating)} maxRating={5} disabled/>
            {noEnjoyResponses ? <p>(No responses yet)</p> : <p>({props.heartRating.toFixed(2)}/5) - {props.enjoyResponseCount} responses</p>}
        </div>
    );
}

export default SetuRating;

import React from "react";

import { Grid, Card, Rating, Icon, Button } from "semantic-ui-react"

function SetuRating(props) {
    return (
        <div id="setu-rating">
            <p>Setu Rating - I learnt a lot</p>
            <Rating icon='star' defaultRating={props.starRating} maxRating={6} disabled/>
            <hr />
            <p>Setu Rating - I loved this unit</p>
            <Rating icon='heart' defaultRating={props.heartRating} maxRating={6} disabled/>
        </div>
        
            
    );
}

export default SetuRating;
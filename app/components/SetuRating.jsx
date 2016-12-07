import React from "react";

import { Grid, Card, Rating, Icon, Button } from "semantic-ui-react"

function SetuRating(props) {
    return (
        <div id="setu-rating">
            <p>Setu Rating - I learnt a lot</p>
            <br />
            <Rating icon='star' defaultRating={props.starRating} maxRating={6} disabled/>
            <br />
            <p>Setu Rating - I loved this unit</p>
            <br />
            <Rating icon='heart' defaultRating={props.heartRating} maxRating={6} disabled/>
            <br />
        </div>
        
            
    );
}

export default SetuRating;
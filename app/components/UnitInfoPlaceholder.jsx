import React from "react";
import { Grid, Icon, Button } from "semantic-ui-react"
import SetuRating from "./SetuRating.jsx"
import CollapseButton from "./CollapseButton.jsx"


function UnitInfoPlaceholder(props) {
    return (
        <Grid celled>
            <Grid.Column width={12}>
                <Grid.Row>
                    <h3>{props.UnitCode + " - " + props.UnitName}</h3>
                    <hr />
                    <p>{props.Synopsis}</p>
                    <a target="blank" href={"https://unitguidemanager.monash.edu/view?unitCode=" + props.UnitCode + "&tpCode=S1-01&tpYear=2016"}>View unit guide for this unit</a>   
                </Grid.Row>
            </Grid.Column>

            <Grid.Column width={4}>
                <Grid.Row>
                    <SetuRating starRating={props.usefulnessScore} heartRating={props.likeScore} />
                </Grid.Row>     
            </Grid.Column>
        </Grid>
    )
    
}

export default UnitInfoPlaceholder;
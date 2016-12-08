import React from "react";
import { Grid, Icon, Button, Image, Loader, Rating } from "semantic-ui-react"
import SetuRating from "./SetuRating.jsx"
import CollapseButton from "../CollapseButton.jsx"


function UnitInfoPlaceholder(props) {
    return (
        <Grid celled>
            <Grid.Column width={12}>
                <Grid.Row>
                    <Image src='../resources/img/loaders/header.png' />  
                    <Loader active size="huge"></Loader>
                    <hr />
                    <Image src='../resources/img/loaders/short-paragraph.png' />   
                </Grid.Row>
            </Grid.Column>

            <Grid.Column width={4}>
                <Grid.Row>
                    <Image src='../resources/img/loaders/smallText.png' />
                    <br />
                    <Rating icon='star' defaultRating={0} maxRating={5} disabled/>
                    <hr />
                    <Image src='../resources/img/loaders/smallText.png' />
                    <br />
                    <Rating icon='heart' defaultRating={0} maxRating={5} disabled/>
                </Grid.Row>     
            </Grid.Column>
        </Grid>
    )
    
}

export default UnitInfoPlaceholder;
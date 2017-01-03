import React from "react";
import { Grid, Image, Loader, Rating, Divider } from "semantic-ui-react";

/**
 * This is the placeholder component that is shown when unit information is loading (being fetched). It shows the same structure
 * as a populated UnitInfo component, but replaces the data with grey bars.
 * @author JXNS
 */
function UnitInfoPlaceholder() {
    return (
        <Grid celled="internally" stackable columns={2}>
            <Grid.Row>
                <Grid.Column width={12}>
                    <Image src='../resources/img/loaders/header.png' />
                    <br />
                    <Image src='../resources/img/loaders/smallText.png' />
                    <Loader active size="huge" />
                </Grid.Column>

                <Grid.Column width={2}>
                    <Image src='../resources/img/loaders/square.png' />
                </Grid.Column>

                <Grid.Column width={2}>
                    <Image src='../resources/img/loaders/square.png' />
                </Grid.Column>
            </Grid.Row>
            
            
            <Grid.Row>
                 <Grid.Column width={12}>
                    <Image src='../resources/img/loaders/medium-paragraph.png' />
                    <Divider />
                    <Image src='../resources/img/loaders/short-paragraph.png' />
                    <Divider />
                    <Image src='../resources/img/loaders/smallText.png' />
                    <br />
                    <Image src='../resources/img/loaders/smallText.png' />
                 </Grid.Column>
                
                <Grid.Column width={4}>
                    <Image src='../resources/img/loaders/smallText.png' />
                    <br />
                    <Rating icon='star' defaultRating={0} maxRating={5} disabled/>
                    <hr />
                    <Image src='../resources/img/loaders/smallText.png' />
                    <br />
                    <Rating icon='heart' defaultRating={0} maxRating={5} disabled/>
                    <Divider />
                    <Image src='../resources/img/loaders/smallText.png' />
                    <Divider />
                    <Image src='../resources/img/loaders/smallText.png' />
                </Grid.Column>
            </Grid.Row>
            
        </Grid>
    );
}

export default UnitInfoPlaceholder;

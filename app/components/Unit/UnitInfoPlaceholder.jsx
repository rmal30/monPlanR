import React from "react";
import { Grid, Image, Loader, Rating } from "semantic-ui-react";

/**
 * This is the placeholder component that is shown when unit information is loading (being fetched). It shows the same structure
 * as a populated UnitInfo component, but replaces the data with grey bars.
 * @author JXNS
 */
function UnitInfoPlaceholder() {
    return (
        <Grid celled stackable columns={2}>
            <Grid.Column width={12}>
                <Grid.Row>
                    <Image src='../resources/img/loaders/header.png' />
                    <br />
                    <Image src='../resources/img/loaders/smallText.png' />
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
    );
}

export default UnitInfoPlaceholder;

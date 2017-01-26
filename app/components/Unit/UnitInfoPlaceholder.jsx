import React, { PropTypes } from "react";
import { Grid, Image, Loader, Rating, Divider, Dimmer, Header, Icon } from "semantic-ui-react";

/**
 * This is the placeholder component that is shown when unit information is loading (being fetched). It shows the same structure
 * as a populated UnitInfo component, but replaces the data with grey bars.
 * @author JXNS
 */
const UnitInfoPlaceholder = ({ error }) => {
    return (
        <Dimmer.Dimmable dimmed blurring as={Grid} celled="internally" stackable columns={2}>
            <Dimmer active inverted>
                {!error && <Loader active size="huge" />}
                {error &&
                    <Header as="h2" icon>
                        <Icon name="remove circle" />
                        Failed to fetch unit details
                    </Header>
                }
            </Dimmer>
            <Grid.Row>
                <Grid.Column width={12}>
                    <Image src='../resources/img/loaders/header.png' />
                    <br />
                    <Image src='../resources/img/loaders/smallText.png' />
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
        </Dimmer.Dimmable>
    );
};

export default UnitInfoPlaceholder;

//PropTypes declaration
UnitInfoPlaceholder.propTypes = {
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};
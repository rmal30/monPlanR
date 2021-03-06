import React, { PropTypes } from "react";
import { Grid, Image, Loader, Rating, Divider, Dimmer, Header, Icon } from "semantic-ui-react";

/**
 * This is the placeholder component that is shown when unit information is loading (being fetched). It shows the same structure
 * as a populated UnitInfo component, but replaces the data with grey bars.
 * @author JXNS
 */
const UnitInfoPlaceholder = ({ errorString }) => {
    return (
        <Dimmer.Dimmable dimmed blurring as={Grid} celled="internally" stackable columns={2}>
            <Dimmer active inverted>
                {!errorString && <Loader active size="huge" />}
                {errorString &&
                    <Header as="h2" icon>
                        <Icon name="remove circle" />
                        Failed to fetch unit details
                        <Header.Subheader>{errorString}</Header.Subheader>
                    </Header>
                }
            </Dimmer>
            <Grid.Row className={"header law"}>
                <Grid.Column width={16}>
                    <Image src='../img/loaders/header.png' />
                    <br />
                    <Image src='../img/loaders/smallText.png' />
                </Grid.Column>

            </Grid.Row>


            <Grid.Row>
                 <Grid.Column width={12}>
                    <Image src='../img/loaders/medium-paragraph.png' />
                    <Divider />
                    <Image src='../img/loaders/short-paragraph.png' />
                    <Divider />
                    <Image src='../img/loaders/smallText.png' />
                    <br />
                    <Image src='../img/loaders/smallText.png' />
                 </Grid.Column>

                <Grid.Column width={4}>

                    <Image src='../img/loaders/square.png' />
                    <Divider />
                    <Image src='../img/loaders/square.png' />
                    <Divider />
                    <Image src='../img/loaders/smallText.png' />
                    <br />
                    <Rating icon='star' defaultRating={0} maxRating={5} disabled/>
                    <hr />
                    <Image src='../img/loaders/smallText.png' />
                    <br />
                    <Rating icon='heart' defaultRating={0} maxRating={5} disabled/>
                    <Divider />
                    <Image src='../img/loaders/smallText.png' />
                    <Divider />
                    <Image src='../img/loaders/smallText.png' />
                </Grid.Column>
            </Grid.Row>
        </Dimmer.Dimmable>
    );
};

export default UnitInfoPlaceholder;

//PropTypes declaration
UnitInfoPlaceholder.propTypes = {
    errorString: PropTypes.string
};

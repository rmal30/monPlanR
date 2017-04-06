import React, { PropTypes } from "react";
import { Divider, Grid, Icon, Image, Dimmer, Loader, Header } from "semantic-ui-react";

/**
 * Currently a placeholder for a placeholder component...
 * (Someone call Exhibit)
 */
const CourseInfoPlaceholder = ({ error }) => {
    return (
        <Dimmer.Dimmable dimmed blurring as={Grid} celled="internally" stackable columns={2}>
            <Dimmer active inverted>
            {!error && <Loader active size="huge" />}
                {error &&
                    <Header as="h2" icon>
                        <Icon name="remove circle" />
                        Failed to fetch course details
                    </Header>
                }
            </Dimmer>
            
            <Grid.Row>
                <Grid.Column width={12}>
                    <Image src='../img/loaders/header.png' />
                    <br />
                    <Image src='../img/loaders/smallText.png' />
                </Grid.Column>

                <Grid.Column width={4}>
                    <Image src='../img/loaders/square.png' />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={12}>
                    <Grid.Row>
                        <Image src='../img/loaders/paragraph.png' />
                        <Divider />
                        <Image src='../img/loaders/smallText.png' />
                        <Image src='../img/loaders/smallText.png' />
                        <Divider />
                        <Image src='../img/loaders/smallText.png' />
                        <Image src='../img/loaders/smallText.png' />
                        <Divider />
                        <Image src='../img/loaders/smallText.png' />
                        <Image src='../img/loaders/smallText.png' />
                    </Grid.Row>
                </Grid.Column>

                <Grid.Column width={4}>
                    <Image src='../img/loaders/smallText.png' />
                    <Image src='../img/loaders/smallText.png' />
                    <Divider />
                    <Image src='../img/loaders/smallText.png' />
                    <Divider />
                    <Image src='../img/loaders/smallText.png' />
                </Grid.Column>
            </Grid.Row>
        </Dimmer.Dimmable>
    );
};

CourseInfoPlaceholder.propTypes = {
    error: PropTypes.bool
};

export default CourseInfoPlaceholder;
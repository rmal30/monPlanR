import React, {Component} from "react";
import {Container, Grid, Card, Icon, Button} from "semantic-ui-react";


/**
 * Home page that is shown to the user when they load the domain.
 *
 * @class
 */
class Future extends Component {
    /**
    * State holds a boolean value to display an error message telling users
    * to clear their course as some features will not work otherwise.
    */
    constructor() {
        super();

        this.state = {
            showMessage: true
        };

        this.handleDismiss = this.handleDismiss.bind(this);
    }

    /**
    * Handles warning message dismissal
    *
    * @author Eric Jiang
    */
    handleDismiss() {
        this.setState({ showMessage: false });
    }

    /**
     * Renders the welcome page, with a form and a disclaimer.
     */
    render() {

        return (
            <div style={{color: "white", padding: "1em 0"}}>
                <Container className="ui main text">
                    <div id="welcome" className="ui container" cursor={{blink: true}}>
                        <Grid celled>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <h1>Games Developer</h1>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                            <Grid.Column width={10}>
                                <p>
                                    Some random job description.Some random job description.Some random job description.Some random job description.Some random job description.Some random job description.
                                Some random job description.Some random job description.Some random job description.Some random job description.Some random job description.Some random job description.
                               Some random job description.Some random job description.Some random job description.Some random job description.Some random job description.Some random job description.
                               Some random job description.Some random job description.Some random job description.Some random job description.Some random job description.Some random job description.
                               Some random job description.Some random job description.Some random job description.Some random job description.Some random job description.Some random job description.
                               </p>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                Some cool game developer video
                            </Grid.Column>
                            </Grid.Row>


                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <Card.Group itemsPerRow={4}>
                                        <Card>
                                            <Card.Content header='Bachelor of Engineering (Software)' />
                                            <Card.Content description="Just a degree decription. Just a degree decription. Just a degree decription. Just a degree decription. " />
                                            <Card.Content extra>
                                                <Icon name='pin' />
                                                Clayton Campus <br />
                                                <Icon name='clock' />
                                                5 years
                                                <br/>
                                                <Button>View More Info</Button>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content header='Bachelor of Information Technology (Games Dev major)' />
                                            <Card.Content description="Just a degree decription. Just a degree decription. Just a degree decription. Just a degree decription. " />
                                            <Card.Content extra>
                                                <Icon name='pin' />
                                                Clayton Campus <br />
                                                <Icon name='clock' />
                                                3 years
                                                <br/>
                                                <Button>View More Info</Button>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content header='Bachelor of Computer Science (Games Dev major)' />
                                            <Card.Content description="Just a degree decription. Just a degree decription. Just a degree decription. Just a degree decription. " />
                                            <Card.Content extra>
                                                <Icon name='pin' />
                                                Clayton Campus <br />
                                                <Icon name='clock' />
                                                3 years
                                                <br/>
                                                <Button>View More Info</Button>
                                            </Card.Content>
                                        </Card>
                                        <Card>
                                            <Card.Content header='Bachelor of Commerce/Computer Science (Games Dev major)' />
                                            <Card.Content description="Just a degree decription. Just a degree decription. Just a degree decription. Just a degree decription. " />
                                            <Card.Content extra>
                                                <Icon name='pin' />
                                                Clayton Campus <br />
                                                <Icon name='clock' />
                                                4 years
                                                <br/>
                                                <Button>View More Info</Button>
                                            </Card.Content>
                                        </Card>
                                    </Card.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>    
              
                    </div>
                </Container>
            </div>
        );
    }
}

export default Future;

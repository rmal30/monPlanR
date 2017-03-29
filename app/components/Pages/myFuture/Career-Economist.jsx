import React, {Component} from "react";
import {Container, Grid, Card, Icon, Embed} from "semantic-ui-react";
import Commerce from "./Commerce.jsx";

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
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <h1>Economist</h1>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                            <Grid.Column width={10}>
                                <p>
                                    Economists apply economic analysis to issues within a variety of fields, such as education, health, development, and the environment. Some economists study the cost of products, healthcare, or energy. Others examine employment levels, business cycles, or exchange rates. Still, others analyze the effect of taxes, inflation, or interest rates. 
Economists often study historical trends and use them to make forecasts. They research and analyze data using a variety of software programs, including spreadsheets, statistical analysis, and database management programs.
                               </p>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Embed
                                            id='S1UqwMPgl9U'
                                            placeholder='https://img.youtube.com/vi/S1UqwMPgl9U/0.jpg'
                                            source='youtube'
                                        /> 
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <h2>Degrees you can look at are:</h2>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <Card.Group itemsPerRow={4}>
                                        <Card>
                                            <Card.Content header='Bachelor of Commerce - Majoring in Economics'/>
                                            <Card.Content description="Just a degree decription. Just a degree decription. Just a degree decription. Just a degree decription. " />
                                            <Card.Content extra>
                                                <Icon name='pin' />
                                                Clayton Campus <br />
                                                <Icon name='clock' />
                                                3 years
                                                <br/>
                                                <Commerce />
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

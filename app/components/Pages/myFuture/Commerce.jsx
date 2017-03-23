import React, {Component} from "react";
import {Container, Grid, Embed, Image} from "semantic-ui-react";


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
                                <Grid.Column width={9}>
                                    <h1>Bachelor of Commerce</h1>
                                    <i>Faculty of Business and Commerce</i>
                                </Grid.Column>
                                <Grid.Column width={7}>   
                                    <Image src="/img/monash.png" alt="logo" fluid />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                            <Grid.Column width={10}>
                                <p>Join the brilliant minds of the commercial world.</p><p>If you're a clever thinker who likes to unpack problems and consider ideas in abstract ways, and are intrigued by finding solutions to problems, Commerce will teach you to apply your thinking in a commercial capacity to influence change.</p><p>Commerce is integral to all facets of the economy. It encompasses the diverse and rapidly changing activities of the world, including decision-making, leadership, innovation and policy development.</p><p>In this course you will develop broad commercial knowledge and acquire expertise in a particular discipline, while also developing the capacity to drive change in the future. With ten majors to choose from and 10 double-degree options on offer, you will have genuine depth and diversity of choice at Monash.</p>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Embed
                                    id='Ax5DsxlcPKM'
                                    placeholder='/assets/images/image-16by9.png'
                                    source='youtube'
                                />   
                            </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                
                            </Grid.Row>
                        </Grid>    
              
                    </div>
                </Container>
            </div>
        );
    }
}

export default Future;

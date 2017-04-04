import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dataFetchActions from "../../../actions/DataFetchActions";
import {Container, Grid, Card, Icon, Embed} from "semantic-ui-react";
import Commerce from "./Commerce.jsx";

class CareerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    

    componentWillMount() {
        this.props.fetchCareer(this.props.params.careerID);
    }

    render() {
        return (
            <div style={{color: "white", padding: "1em 0"}}>
                <Container className="ui main text">
                    <div id="welcome" className="ui container" cursor={{blink: true}}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <h1>{this.props.career.title}</h1>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                            <Grid.Column width={10}>
                                <p>
                                    {this.props.career.description}
                                </p>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Embed
                                            id={this.props.career.videoCode}
                                            placeholder={'https://img.youtube.com/vi/'+this.props.career.videoCode+'/0.jpg'}
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
                                            <Card.Content header='Bachelor of Commerce'/>
                                            <Card.Content description="Just a degree decription. Just a degree decription. Just a degree decription. Just a degree decription. " />
                                            <Card.Content extra>
                                                <Icon name='book' />
                                                <b>Majoring</b> in Economics <br />
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

const mapStateToProps = (state) => {
    return {
        career: state.Career.career,
        isLoading: state.Career.careerIsLoading,     
        loadError: state.Career.careerLoadError
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(dataFetchActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerDetail);

CareerDetail.propTypes = {
    fetchCareer: PropTypes.func,
    params: PropTypes.object,
    career: PropTypes.object
};
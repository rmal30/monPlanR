import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dataFetchActions from "../../../actions/DataFetchActions";
import {Container, Grid, Card, Icon } from "semantic-ui-react";
import CareerDetail from "./CareerDetail.jsx";

class CareerDetailContainer extends Component {
    constructor(props) {
        super(props);
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
                                {this.props.isLoading ? <p>Loading...</p> :
                                    <CareerDetail
                                        title={this.props.career.title}
                                        description={this.props.career.description}
                                        videoCode={this.props.career.videoCode}
                                        videoThumbnail={`https://img.youtube.com/vi/${this.props.career.videoCode}/0.jpg`}
                                    />
                                }
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
                                                {/*<Commerce /> */}
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
        loadError: state.Career.careerLoadError,
        relatedDegrees: state.Career.relatedDegrees,
        relatedDegreesAreLoading: state.Career.relatedDegreesAreLoading,
        relatedDegreesError: state.Career.relatedDegreesError
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(dataFetchActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerDetailContainer);

CareerDetailContainer.propTypes = {
    fetchCareer: PropTypes.func,
    params: PropTypes.object,
    career: PropTypes.object,
    isLoading: PropTypes.bool
};

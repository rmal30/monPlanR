import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as dataFetchActions from "../../../actionCreators/DataFetchActions";
import { Container, Grid } from "semantic-ui-react";

import CareerDetail from "./CareerDetail.jsx";
import CourseCardGroup from "./CourseCardGroup.jsx";

/**
 * @author JXNS
 * The career detail container sets up the data and layout for
 * the career detail view that a user sees as part of the my future component
 */
class CareerDetailContainer extends Component {
    /**
     * Constructor for the container
     */
    constructor(props) {
        super(props);
    }


    /**
     * we fetch all the career detail and related degrees
     */
    componentWillMount() {
        this.props.fetchCareer(this.props.params.careerID);
    }

    /**
     * we render the career details and cards
     */
    render() {
        return (
            <div style={{color: "white", padding: "1em 0"}}>
                <Container className="ui main text" >
                    <div id="welcome" className="ui container" cursor={{blink: true, width:"100%" }}>
                        <Grid>
                            <Grid.Row className="careerDetailHeader">
                                {this.props.isLoading ? <p>Loading...</p> :
                                    <CareerDetail
                                        title={this.props.career.title}
                                        description={this.props.career.description}
                                        videoCode={this.props.career.videoCode}
                                        videoThumbnail={`https://img.youtube.com/vi/${this.props.career.videoCode}/0.jpg`}
                                    />
                                }
                            </Grid.Row>
                            <Grid.Row className="recommendedCoursesRow">
                                <h2>Recommended courses:</h2>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column className="recommendedCoursesCardRow" width={16}>
                                    <CourseCardGroup
                                        relatedCourses={this.props.career.relatedCourses} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </div>
                </Container>
            </div>
        );
    }

}

/**
 * We grab the careers and all relatant loading variables to deal with the
 * async call for career and related degrees
 */
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

/**
 * We need to use this to use the fetchCareer function
 */
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

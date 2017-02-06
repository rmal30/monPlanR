import React, { PropTypes } from "react";
import MediaQuery from "react-responsive";
import { Button, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import InsertTeachingPeriodButtonContainer from "../../containers/Buttons/InsertTeachingPeriodButtonContainer.jsx";
import ClearCourseModal from "../modals/ClearCourseModal.jsx";
import CompletedCourseModal from "../modals/CompletedCourseModal.jsx";
import CourseInfoButtonContainer from "../../containers/Buttons/CourseInfoButtonContainer.jsx";
import LoadCourseMap from "../modals/LoadCourseMap.jsx";
import * as courseActions from "../../actions/CourseActions";

/**
 * Course edit actions gives students the ability to clear their course,
 * complete their course plan, save their course and add teaching periods
 * (if there are any).
 */
const CourseEditActions = (props) => {

    /**
     * Generates a the button for triggering the completed course modal
     */
    const CompletedCourseModalTrigger = (mobile) => {return (<Button primary className="btnlightblue" fluid={mobile}>Finished planning for now?</Button>);};

    return (
        <MediaQuery maxDeviceWidth={767}>
            {mobile =>
                <Container className="no-print toolbars" style={!mobile ? {position: "fixed", bottom: 0, zIndex: 20, padding: "0.6em 2em", background: "#003c5b", borderRadius: "0.5em 0.5em 0 0", borderTop: "0.1em solid #005d95"} : {}}>
                    { props.teachingPeriods.length > 0 &&
                        <InsertTeachingPeriodButtonContainer mobile={mobile} bottom />
                    }

                    {mobile && <div><br /></div>}

                    <ClearCourseModal
                        trigger={
                            <Button
                                disabled={props.teachingPeriods.length === 0}
                                fluid={mobile}
                                className="btncancel"
                                color="red">
                                Clear plan
                            </Button>
                        }
                        clearCourse={props.clearCourse.bind(props)} />

                    {mobile && <br />}

                    <CompletedCourseModal trigger={CompletedCourseModalTrigger(mobile)} />

                    {mobile && <br />}
                    
                    <CourseInfoButtonContainer mobile={mobile}/>
                    
                    {mobile && <br />}
                    
                    <LoadCourseMap mobile={mobile}/>

                </Container>
            }
        </MediaQuery>
    );
};

/**
 * maps the teachingPeriods data to props to use
 */
const mapStateToProps = (state) => {
    return {
        teachingPeriods: state.CourseStructure.teachingPeriods
    };
};

/**
 * Gives the component it's needed clear Course function
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(courseActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditActions);

CourseEditActions.propTypes = {
    teachingPeriods: PropTypes.array,
    clearCourse: PropTypes.func
};

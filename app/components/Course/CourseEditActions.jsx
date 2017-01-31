import React, { PropTypes } from "react";
import MediaQuery from "react-responsive";
import { Button, Container } from "semantic-ui-react";

import InsertTeachingPeriodButton from "../TeachingPeriod/InsertTeachingPeriodButton.jsx";
import ClearCourseModal from "../modals/ClearCourseModal.jsx";
import CompletedCourseModal from "../modals/CompletedCourseModal.jsx";

/**
 * Course edit actions gives students the ability to clear their course,
 * complete their course plan, save their course and add teaching periods
 * (if there are any).
 */
export default function CourseEditActions(props) {
    CourseEditActions.propTypes = {
        showInsertTeachingPeriods: PropTypes.bool,
        showInsertTeachingPeriodsUI: PropTypes.func,
        hideInsertTeachingPeriodsUI: PropTypes.func,

        teachingPeriods: PropTypes.array,
        numberOfUnits: PropTypes.number,
        appendSemester: PropTypes.func,
        clearCourse: PropTypes.func,
        semesterString: PropTypes.string,

        isUploading: PropTypes.bool,
        uploaded: PropTypes.bool,
        uploadingError: PropTypes.bool,
        uploadedCourseID: PropTypes.string,
        uploadCourseToDatabase: PropTypes.func
    };

    return (
        <MediaQuery maxDeviceWidth={767}>
            {mobile =>
                <Container className="no-print toolbarsDark" style={!mobile ? {position: "fixed", bottom: 0, zIndex: 20, padding: "0.6em 2em", background: "#003c5b", borderTop: "0.1em solid #005d95"} : {}}>
                    {
                        !props.showInsertTeachingPeriods &&
                        props.teachingPeriods.length > 0 &&
                        <InsertTeachingPeriodButton
                            semesterString={props.semesterString}
                            insert={props.showInsertTeachingPeriodsUI}
                            appendSemester={props.appendSemester}
                            mobile={mobile}
                            bottom
                            />
                    }
                    {props.showInsertTeachingPeriods &&
                        <Button
                            fluid={mobile}
                            className="no-print"
                            floated={mobile ? "" : "right"}
                            onClick={props.hideInsertTeachingPeriodsUI.bind(props)}>Cancel</Button>
                    }
                    {mobile && <div><br /></div>}
                    <ClearCourseModal
                        trigger={
                            <Button
                                disabled={props.teachingPeriods.length === 0}
                                fluid={mobile}
                                className="btncancel"
                                color="red">
                                Clear course
                            </Button>
                        }
                        clearCourse={props.clearCourse.bind(props)} />
                    {mobile && <br />}
                    <CompletedCourseModal
                        trigger={(
                            <Button
                                primary
                                fluid={mobile}
                                className="btnlightblue">
                                Finished planning for now?
                            </Button>
                        )}
                        teachingPeriods={props.teachingPeriods}
                        numberOfUnits={props.numberOfUnits}

                        isUploading={props.isUploading}
                        uploadingError={props.uploadingError}
                        uploaded={props.uploaded}
                        uploadCourseToDatabase={props.uploadCourseToDatabase}
                        uploadedCourseID={props.uploadedCourseID}
                         />
                </Container>
            }
        </MediaQuery>
    );
}

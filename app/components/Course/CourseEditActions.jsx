import React, { PropTypes } from "react";
import MediaQuery from "react-responsive";
import { Button, Container, Icon, Input, Popup } from "semantic-ui-react";

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
                <Container className="no-print" style={!mobile ? {position: "fixed", bottom: 0, zIndex: 20, padding: "0.6em 2em", background: "#003c5b", borderRadius: "0.5em 0.5em 0 0", borderTop: "0.1em solid #005d95"} : {}}>
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
                        disabled={props.teachingPeriods.length === 0}
                        fluid={mobile}
                        clearCourse={props.clearCourse.bind(props)} />
                    {mobile && <br />}
                    <CompletedCourseModal
                        trigger={(
                            <Button
                                primary
                                fluid={mobile}>
                                Finish planning
                            </Button>
                        )}
                        teachingPeriods={props.teachingPeriods}
                        numberOfUnits={props.numberOfUnits} />
                    {mobile && <br />}
                    <Popup
                        on="click"
                        wide
                        trigger={
                            (
                                <Button
                                    fluid={mobile}
                                    color={props.uploadingError ? "red" : "teal"}
                                    disabled={props.isUploading}
                                    onClick={props.uploadCourseToDatabase}
                                    loading={props.isUploading}>
                                    <Icon name={props.uploaded && "checkmark" || props.uploadingError && "x" || "upload"} />
                                    {props.uploaded && "Saved course" || "Save course"}
                                </Button>
                            )
                        }>
                        <Popup.Header>
                            {props.uploaded && "Saved course"
                            || props.isUploading && "Saved course..."
                            || props.uploadingError && "Failed to save course"}
                        </Popup.Header>
                        <Popup.Content>
                            {props.isUploading &&
                                "Please wait until course has been saved."
                            }
                            {props.uploaded &&
                                <div>
                                    <p>Copy and visit the link below to view your saved course plan.</p>
                                    <Input onFocus={e => e.target.select()} fluid value={`${window.location.origin}/view/${props.uploadedCourseID}`} />
                                </div>
                            }
                            {props.uploadingError &&
                                "Please try again later."
                            }
                        </Popup.Content>
                    </Popup>
                </Container>
            }
        </MediaQuery>
    );
}

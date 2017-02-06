import React, { PropTypes } from "react";
import { Button, Icon, Input, Popup, Divider } from "semantic-ui-react";
/**
 * Save button generates a snapshot upon click, and gives a link back to the
 * user so that they can view the snapshot anywhere.
 *
 * @author Saurabh Joshi
 */
export default function SaveButton({ isUploading, uploadingError, uploadCourseToDatabase, uploadedCourseID, mobile }) {
    SaveButton.propTypes = {
        isUploading: PropTypes.bool,
        uploadingError: PropTypes.bool,
        uploadCourseToDatabase: PropTypes.func.isRequired,
        uploadedCourseID: PropTypes.string,
        mobile: PropTypes.bool,
        uploaded: PropTypes.bool
    };    

    let uploaded = !(isUploading || uploadingError);

    return (
        <Popup
            on="click"
            style={{width: 300}}
            positioning="top left"
            trigger={
                (
                    <Button
                        fluid={mobile}
                        color={uploadingError ? "red" : "teal"}
                        disabled={isUploading}
                        onClick={uploadCourseToDatabase}
                        loading={isUploading}
                        className="btnmainblue">
                        <Icon name={uploaded && "checkmark" || uploadingError && "x" || "upload"} />
                        {uploaded && "Saved course" || "Save course"}
                    </Button>
                )
            }>
            <Popup.Header>
                {uploaded && "Course saved!"
                || isUploading && "Saving course..."
                || uploadingError && "Failed to save course"}
            </Popup.Header>
            <Popup.Content>
                {isUploading &&
                    "Please wait until course has been saved."
                }
                {uploaded &&
                    <div>
                        <p>
                            Copy and visit the link below to view your course plan.
                        </p>
                        <Input
                            readOnly
                            fluid
                            onFocus={e => e.target.select()}
                            value={`${window.location.origin}/view/${uploadedCourseID}`} />
                        <Divider />
                        <div>
                          <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/view/${uploadedCourseID}`} target="_blank">
                            <Button circular color='facebook' icon='facebook' />
                          </a>
                          <a href={`https://www.twitter.com/intent/tweet?url=${window.location.origin}/view/${uploadedCourseID}&text=Check out my course plan!`} target="_blank">
                            <Button circular color='twitter' icon='twitter' />
                          </a>
                          <a href={`https://plus.google.com/share?url=${window.location.origin}/view/${uploadedCourseID}`} target="_blank">
                            <Button circular color='google plus' icon='google plus' />
                          </a>
                          <a href={`mailto:?subject=monPlan&body=${window.location.origin}/view/${uploadedCourseID}`} target="_blank">
                            <Button circular color='google plus' icon='mail' />
                          </a>
                        </div>
                    </div>
                }
                {uploadingError &&
                    "Please try again later."
                }
            </Popup.Content>
        </Popup>
    );
}

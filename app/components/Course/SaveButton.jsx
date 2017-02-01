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
        mobile: PropTypes.bool
    };

    let uploaded = !(isUploading || uploadingError);
    
    return (
        <Popup
            on="click"
            wide
            positioning="top left"
            trigger={
                (
                    <Button
                        fluid={mobile}
                        color={uploadingError ? "red" : "teal"}
                        disabled={isUploading}
                        onClick={uploadCourseToDatabase}
                        loading={isUploading}>
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
                        <Divider />
                        <p>You can also share your course plan across many social media channels. Otherwise you can copy the link and come back to your plan later.</p>
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
                        <Divider />
                        <b>If you just want to bookmark the link, copy and paste the link below to your Bookmarks Manager</b>
                        <Input
                            readOnly
                            fluid
                            onFocus={e => e.target.select()}
                            value={`${window.location.origin}/view/${uploadedCourseID}`} />
                    </div>
                }
                {uploadingError &&
                    "Please try again later."
                }
            </Popup.Content>
        </Popup>
    );
}

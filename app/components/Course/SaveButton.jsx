import React, { PropTypes } from "react";
import { Button, Icon, Input, Popup } from "semantic-ui-react";

/**
 * Save button generates a snapshot upon click, and gives a link back to the
 * user so that they can view the snapshot anywhere.
 *
 * @author Saurabh Joshi
 */
export default function SaveButton({ isUploading, uploaded, uploadingError, uploadCourseToDatabase, uploadedCourseID, mobile }) {
    SaveButton.propTypes = {
        isUploading: PropTypes.bool,
        uploaded: PropTypes.bool,
        uploadingError: PropTypes.bool,
        uploadCourseToDatabase: PropTypes.func.isRequired,
        uploadedCourseID: PropTypes.string,
        mobile: PropTypes.bool
    };

    return (
        <Popup
            on="click"
            wide
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
                {uploaded && "Saved course"
                || isUploading && "Saved course..."
                || uploadingError && "Failed to save course"}
            </Popup.Header>
            <Popup.Content>
                {isUploading &&
                    "Please wait until course has been saved."
                }
                {uploaded &&
                    <div>
                        <p>Copy and visit the link below to view your saved course plan.</p>
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

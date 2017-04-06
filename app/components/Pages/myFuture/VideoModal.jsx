import React, { PropTypes } from "react";
import { Modal, Embed } from "semantic-ui-react";

/**
 * Renders the CourseCard for myFuture
 * @author Eric Jiang
 */
const CourseCard = (props) => {
    const { videoCode } = props;

    return (
        <Modal trigger={<button className="videoBtn">
                        Play video
                    </button>}>
            <Modal.Content>    
            <Modal.Description>
                <Embed
                    id={videoCode}
                    active={true}
                    placeholder={'https://img.youtube.com/vi/'+videoCode+'/0.jpg'}
                    source='youtube'
                    fluid
                />
            </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};

export default CourseCard;


CourseCard.propTypes = {
    videoCode: PropTypes.string
};

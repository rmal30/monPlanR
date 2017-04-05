import React, { PropTypes } from "react";
import { Card, Icon } from "semantic-ui-react";

/**
*
*/
const CourseCard = (props) => {
    const { title, description, duration,campus /*, videoCode, videoThumbnail*/ } = props;
    return (
        <Card>
            <Card.Content header={title}/>
            <Card.Content description={description} />
            <Card.Content extra>
                <Icon name='book' />
                <b>Majoring</b> in Economics <br />
                <Icon name='pin' />
                {campus}<br />
                <Icon name='clock' />
                {duration}
                <br/>
                {/*<Commerce /> */}
            </Card.Content>
        </Card>
    );
};

export default CourseCard;


CourseCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.integer,
    campus: PropTypes.string,
    major: PropTypes.major
};

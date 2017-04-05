import React, { PropTypes } from "react";
import { Card } from "semantic-ui-react";
import CourseCard from "./CourseCard.jsx";

/**
 * maps an object to seperate course cards
 * @author Eric Jiang
 */
const CourseCardGroup = (props) => {
    const { courses } = props;
    return (
        <Card.Group itemsPerRow={4}>
             {
                 courses.relatedDegrees.map((object)=>{
                    return <CourseCard 
                                title={object.title} 
                                description={object.description}
                                duration={object.duration}
                                major={object.major}
                                campus={object.campus} />;
                 })
             }                             
        </Card.Group>
    );
};

export default CourseCardGroup;


CourseCardGroup.propTypes = {
    courses: PropTypes.object
};

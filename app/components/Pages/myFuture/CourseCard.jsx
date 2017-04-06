import React, { PropTypes } from "react";
import { Card, Icon } from "semantic-ui-react";

/**
 * Renders the CourseCard for myFuture 
 * @author Eric Jiang
 */
const CourseCard = (props) => {
    const { title, description, duration,major,campus, faculty } = props;
    const facultyMap = {
        "Faculty of Art, Design and Architecture": "ada",
        "Faculty of Arts": "arts",
        "Faculty of Business and Economics": "buseco",
        "Faculty of Education": "edu",
        "Faculty of Engineering": "eng",
        "Faculty of Information Technology": "fit",
        "Faculty of Law": "law",
        "Faculty of Medicine, Nursing and Health Sciences": "med",
        "Faculty of Pharmacy and Pharmaceutical Sciences": "pha",
        "Faculty of Science": "sci",
        "Faculty of All": "all"
    };
    const facultyClass = facultyMap[faculty];
    return (
        <Card className={"ui segment " + facultyClass}>
            <Card.Content header={title}/>
            <Card.Content description={description} />
            
            <Card.Content extra>
                <Icon name='book' />
                <b>Majoring</b> in {major} <br />
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
    duration: PropTypes.string,
    faculty: PropTypes.string,
    campus: PropTypes.string,
    major: PropTypes.string
};

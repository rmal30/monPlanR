import React, { PropTypes } from "react";
import { Card, Container, Header, Icon, Loader } from "semantic-ui-react";

/**
 * Renders the CourseCard for myFuture
 * @author Eric Jiang
 */
const CourseCard = (props) => {
    const { loading, error, title, description, duration, major, specialisation, campus, managingFaculty } = props;
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

    const facultyClass = facultyMap[managingFaculty];

    if(error) {
        return (
            <Card className="courseCard">
                <Card.Content extra>
                    <Container textAlign="center">
                        <Header icon>
                            <Icon color="red" name="remove circle" />
                            Failed to load course
                        </Header>
                    </Container>
                </Card.Content>
            </Card>
        );
    }

    if(loading) {
        return (
            <Card className="courseCard">
                <Card.Content extra>
                    <Loader active inline="centered" />
                </Card.Content>
            </Card>
        );
    }

    return (
        <Card className={"courseCard ui segment" + facultyClass}>
            <Card.Content className="courseCardHeader" header={title}/>
            <Card.Content className="courseCardContent" description={description} />

            <Card.Content extra>
                {major && <span><Icon name='book' /> <b>Majoring</b> in {major}</span>}
                {specialisation && <span><Icon name='book' /> <b>Specialising</b> in {specialisation}</span>}
                <br />
                <Icon name='university' />
                {campus} campus<br />
                <Icon name='clock' />
                {duration}
                <br />
            </Card.Content>

            <button className="readMoreBtn">
                Read More
            </button>
            <div></div>
        </Card>
    );
};

export default CourseCard;


CourseCard.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    managingFaculty: PropTypes.string,
    duration: PropTypes.string,
    faculty: PropTypes.string,
    campus: PropTypes.string,
    major: PropTypes.string,
    specialisation: PropTypes.string
};

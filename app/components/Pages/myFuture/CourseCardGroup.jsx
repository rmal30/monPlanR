import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";

import CourseCard from "./CourseCard.jsx";
/**
* Maps the courses from a career to separate course cards
* @author Eric Jiang, Saurabh Joshi
*/
const CourseCardGroup = ({ relatedCourses, loading, error }) => {
    if(relatedCourses) {
        return (
            <Card.Group itemsPerRow={4}>
                {
                    relatedCourses.map((relatedCourse, index) => {
                        if(error || !relatedCourse) {
                            return <CourseCard key={index} error />;
                        } else if(loading) {
                            return <CourseCard key={index} loading />;
                        } else {
                            let major, specialisation;

                            if(relatedCourse.areaOfStudy) {
                                if(relatedCourse.areaOfStudy.category === "MAJOR") {
                                    major = relatedCourse.areaOfStudy.title;
                                } else if(relatedCourse.areaOfStudy.category === "SPECIALISATION") {
                                    specialisation = relatedCourse.areaOfStudy.title;
                                }
                            }

                            return (
                                <CourseCard
                                    key={index}
                                    title={relatedCourse.title}
                                    description={relatedCourse.shortDescription}
                                    managingFaculty={relatedCourse.managingFaculty}
                                    duration={relatedCourse.duration}
                                    major={major}
                                    specialisation={specialisation}
                                    campus={relatedCourse.campus} />
                            );
                        }
                    })
                }
            </Card.Group>
        );
    } else if(error) {
        return <CourseCard error />;
    } else { // Possibly the cards are still loading
        return <CourseCard loading />;
    }
};

/**
 * Inject state into props. courses is Monash's marketing description of
 * many courses across the university, whereas relatedCourses comes from
 * a career, which tells us which courses and area of studies to render.
 */
const mapStateToProps = state => {
    return {
        relatedCourses: state.Career.relatedCourses,
        loading: state.Career.myFutureCoursesLoading,
        error: state.Career.myFutureCoursesError
    };
};

export default connect(mapStateToProps)(CourseCardGroup);


CourseCardGroup.propTypes = {
    relatedCourses: PropTypes.array,
    courses: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool
};

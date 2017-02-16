import React, { PropTypes } from "react";
import { Container, Icon, Segment } from "semantic-ui-react";

/**
 * Course print status is only shown when student prints out the course plan.
 * It is hidden in screen view as the interactive course plan popup takes
 * place of showing course status to the user.
 *
 * It displays all course errors in the list if there are any as a Segment.
 * Otherwise it renders a tick to indicate to the student that there are no
 * problems with the course plan.
 *
 * @author Saurabh Joshi
 * @param {array} courseErrors - The list of course errors generated from validation
 * code.
 * @param {string} faculty - The managing faculty which is used to direct students
 * to the right faculty.
 * @returns {ReactElement}
 */
export default function CoursePrintStatus({ courseErrors, faculty }) {
    CoursePrintStatus.propTypes = {
        courseErrors: PropTypes.arrayOf(
            PropTypes.shape({
                message: PropTypes.string
            })
        ),
        faculty: PropTypes.string
    };

    return (
        <Segment raised className="print-only">
            {courseErrors.length === 0 &&
                <Container>
                    <h2><Icon name="checkmark" color="green" /> No problems detected with this course plan</h2>
                    <p>
                        However it may be best to check your course plan with your
                        {faculty ? `${faculty}'s` : "faculty's"} course advisor
                        before filling in WES enrolment details.
                    </p>
                </Container>
            }
            {courseErrors.length > 0 &&
                <Container>
                    <h2><Icon name="x" color="red" /> We have found some problems with this course plan</h2>
                    <p>Here are the following errors that you may want to check with your {faculty ? `${faculty}'s` : "faculty's"} course advisor.</p>
                    <ul>
                        {courseErrors.map((error, index) => (
                            <li key={index}>{error.message}</li>
                        ))}
                    </ul>
                </Container>
            }
        </Segment>
    );
}

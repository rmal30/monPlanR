import React, { PropTypes } from "react";
import { Container } from "semantic-ui-react";

import CustomUnitModal from "../modals/CustomUnitModal.jsx";
import CourseStructure from "../Course/CourseStructure.jsx";
import NotificationContainer from "../../containers/NotificationContainer.jsx";
import CourseOverviewContainer from "../../containers/Course/CourseOverviewContainer.jsx";

/**
 * The plan component is the main page of the app, where students can add and
 * remove teaching periods and units.
 */
function Plan() {
    /**
     * Returns a container of grid of a single row, holding the course
     * structure.
     */

    return (
        <div>
            <NotificationContainer />
            <CustomUnitModal />
            <Container className="main text">
                <CourseOverviewContainer />
                <CourseStructure />
            </Container>
        </div>
    );
}

Plan.propTypes = {
    location: PropTypes.shape({
        query: PropTypes.shape({
            /* When a student begins their course */
            startYear: PropTypes.string,
            /* When the student is expected to graduate */
            endYear: PropTypes.string,
            /* What course the student has selected*/
            courseToLoad: PropTypes.string
        }).isRequired
    }).isRequired
};

export default Plan;

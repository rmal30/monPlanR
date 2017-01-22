import React, { Component, PropTypes } from "react";
import { Button, Container, Grid } from "semantic-ui-react";
import MediaQuery from "react-responsive";

import CustomUnitModal from "../modals/CustomUnitModal.jsx";
import UnitQuery from "../../utils/UnitQuery";
import CostCalc from "../../utils/CostCalc";
import LocalStorage from "../../utils/LocalStorage";
import CourseStructure from "../Course/CourseStructure.jsx";
import CourseStatisticGroupWrapper from "../../wrappers/CourseStatisticGroupWrapper";
import LoadCourseMap from "../modals/LoadCourseMap.jsx";
import CourseDetailPopup from "../Course/CourseDetailPopup.jsx";

/**
 * The plan component is the main page of the app, where students can add and
 * remove teaching periods and units.
 */
class Plan extends Component {
    /**
     * State holds a unit object that is used during the add
     * unit process.
     *
     * @param {object} props - React's props
     */
    constructor(props) {
        super(props);

        this.state = {
            unitToAdd: undefined,
            showAddToCourseUI: false,
            totalCredits: 0,
            totalCost: 0,
            focusedUnitCode: "",
            customUnitCode: undefined,
            searchResults: null,
            searchResultIndex: 0,
            courseToLoad: "",
            courseYear: 0
        };

        this.addToCourse = this.addToCourse.bind(this);
        this.doneAddingToCourse = this.doneAddingToCourse.bind(this);
        this.cancelAddingToCourse = this.cancelAddingToCourse.bind(this);
        this.handleCourseLoad = this.handleCourseLoad.bind(this);
    }

    /**
     * A workaround that is a React anti-pattern. It attaches add to course menu
     * callback function, which is called when the user clicks the "+ Add unit"
     * menu item.
     *
     * TODO: Find some better way of handling state.
     * @author Saurabh Joshi
     */
    componentDidMount() {
        this.props.attachAddToCourse(this.addToCourse);
        let courseInLS = LocalStorage.doesCourseStructureExist();

        if(!courseInLS) {
            const { startYear, courseToLoad } = this.props.location.query;
            this.handleCourseLoad(courseToLoad, parseInt(startYear, 10));
        }

    }

    /**
     * Detaches add to course menu
     *
     * @author Saurabh Joshi
     */
    componentWillUnmount() {
        this.props.detachAddToCourse();
    }

    /**
     * Adds unit to course by specifying unit code. It does not add unit
     * immediately.
     *
     * @param {string} unitToAdd - The unit to be added.
     * @param {boolean} custom - If it is a custom unit, prompt user to enter details
     */
    addToCourse(nUnitCode, custom, drag, position) {
        if(typeof nUnitCode === "string") {
            this.props.handleDocumentClick();

            if(!custom) {
                UnitQuery.getExtendedUnitData(nUnitCode)
                    .then(response => {
                        let data = response.data;
                        data.Cost = CostCalc.calculateCost(data.SCABand, data.CreditPoints);

                        this.setState({
                            unitToAdd: data,
                            focusedUnitCode: data.UnitCode
                        });

                    })
                    .catch(error => {
                        console.error(error);
                    });

            } else if(custom && drag) {
                this.setState({
                    unitToAdd: {
                        UnitCode: nUnitCode,
                        UnitName: "Create custom unit",
                        custom: true,
                        dragged: true
                    },
                    focusedUnitCode: nUnitCode
                });
            } else if(custom) {
                this.setState({
                    customUnitCode: nUnitCode,
                    customUnitPosition: position
                });
            }
        } else if(custom) {
            this.setState({
                customUnitCode: "Unit code"
            });
        }
    }

    /**
     * Shows add unit UI and allows user to add their custom unit.
     *
     * @param {string} unitToAdd - The unit to be added.
     */
    addCustomUnitToCourse(unitToAdd) {
        this.setState({
            unitToAdd
        });
    }

    /**
     * handles the cancellation of addCustomUnitToCourse
     */
    cancelAddingCustomUnitToCourse() {
        this.setState({
            customUnitCode: undefined
        });
    }


    /**
     * Handles the cancellation of adding a unit to course
     */
    cancelAddingToCourse() {
        this.setState({
            unitToAdd: undefined
        });
    }

    /**
     * Turns off add unit UI, also updated running course totals
     */
    doneAddingToCourse() {

        this.setState({
            unitToAdd: undefined
        });
    }


    /**
     * when a course has been selected, we call this, update the state, which then passses the coursecode down to CourseStructure component as
     * a prop
     */
    handleCourseLoad(courseCode, courseYear) {
        this.setState({
            courseToLoad: courseCode,
            courseYear
        });
    }

    /**
     * Returns a container of grid of a single row, holding the course
     * structure.
     */
    render() {
        let courseCode = "";
        if(this.state.courseToLoad) {
            courseCode = this.state.courseToLoad.split("-")[0];
        }
        const { startYear, endYear } = this.props.location.query;

        const courseDetailButton = (
            <Button
                fluid
                disabled={courseCode === ""}
                primary>
                View {courseCode !== "" ? courseCode : "course"} details
            </Button>
        );
        
        return (
            <div className="wrapper">
                {this.state.customUnitCode &&
                    <CustomUnitModal
                        UnitCode={this.state.customUnitCode}
                        position={this.state.customUnitPosition}
                        cancelAddingCustomUnitToCourse={this.cancelAddingCustomUnitToCourse.bind(this)}
                        addCustomUnitToCourse={this.addCustomUnitToCourse.bind(this)} />
                }

                <Container className="move no-print">
                    <br />
                    <Grid reversed="mobile" stackable className="no-print">
                        <Grid.Row>
                            <Grid.Column width="4">
                                <CourseDetailPopup courseCode={courseCode} trigger={courseDetailButton} />
                            </Grid.Column>
                            <Grid.Column width="4">
                                <LoadCourseMap
                                    onCourseLoad={this.handleCourseLoad} />
                            </Grid.Column>
                            <Grid.Column width="4" floated="right">
                                <CourseStatisticGroupWrapper />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>

                <Container className="main text">
                    <CourseStructure startYear={parseInt(startYear)}
                                     endYear={parseInt(endYear)}
                                     addToCourse={this.addToCourse}
                                     doneAddingToCourse={this.doneAddingToCourse}
                                     cancelAddingToCourse={this.cancelAddingToCourse}
                                     removeFromCourse={this.removeFromCourse}
                                     unitToAdd={this.state.unitToAdd}
                                     courseToLoad={this.state.courseToLoad}
                                     courseYear={this.state.courseYear}
                                     updateStatus={this.props.updateStatus}
                                     courseErrors={this.props.courseErrors} />
                </Container>
                <MediaQuery minDeviceWidth={768}>
                    <div className="push" />
                </MediaQuery>
            </div>
        );
    }
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
    }).isRequired,

    attachAddToCourse: PropTypes.func,
    detachAddToCourse: PropTypes.func,

    /* Validation status */
    updateStatus: PropTypes.func,
    courseErrors: PropTypes.array,

    /* When user clicks on the page */
    handleDocumentClick: PropTypes.func
};

export default Plan;

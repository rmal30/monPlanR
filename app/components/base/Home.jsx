import React, {Component} from "react";
import {Button, Container, Icon, Segment, Message, Divider} from "semantic-ui-react";
import { Link } from "react-router";
import MediaQuery from "react-responsive";
import ClearCourseModal from "../modals/ClearCourseModal.jsx";
import CourseSelectFormContainer from "../../containers/CourseSelectFormContainer.jsx";

/**
 * Home page that is shown to the user when they load the domain.
 *
 * @class
 */
class Home extends Component {
    /**
    * State holds a boolean value to display an error message telling users
    * to clear their course as some features will not work otherwise.
    */
    constructor() {
        super();

        this.state = {
            showMessage: true
        };

        this.handleDismiss = this.handleDismiss.bind(this);
    }

    /**
     * Checks if there is anything saved to local storage, and if so, whether
     * or not teaching periods list is empty. This is used for checking if
     * a user has anything saved to their browser.
     *
     * @return {string|boolean} savedVersionNumber/courseStructureDoesExist
     */
    static checkIfCourseStructureIsInLocalStorage() {
        const stringifedJSON = localStorage.getItem("courseStructure");
        if(stringifedJSON === null) {
            return false;
        }

        const { teachingPeriods, numberOfUnits, version } = JSON.parse(stringifedJSON);

        return Array.isArray(teachingPeriods) && teachingPeriods.length > 0 && numberOfUnits && (version || true);
    }


    /**
    * Handles warning message dismissal
    *
    * @author Eric Jiang
    */
    handleDismiss() {
        this.setState({ showMessage: false });
    }

    /**
     * Renders the welcome page, with a form and a disclaimer.
     */
    render() {
        const inLocalStorage = Home.checkIfCourseStructureIsInLocalStorage();
        return (
            <Container className="ui main text wrapper">
                <div id="welcome" className="ui container">
                    {this.state.showMessage && inLocalStorage !== false && inLocalStorage !== MONPLAN_VERSION &&
                        <Message
                            icon="warning sign"
                            negative
                            header="Please clear course plan"
                            content="In order for the website to function fully, please click 'Clear Course' upon entering the planning page."
                            onDismiss={this.handleDismiss} />
                    }
                    <h1>Welcome to monPlan!</h1>
                        <p>
                            monPlan allows you to plan your course structure whilst you are at
                            Monash University. We know that choosing units isn't particularly easy,
                            so we've designed a web app that you can use to simplify tasks.
                        </p>
                        {inLocalStorage &&
                            <MediaQuery maxDeviceWidth={767}>
                                {mobile => {
                                    if(mobile) {
                                        return (
                                            <Container>
                                                <h2>To continue where you left off:</h2>
                                                <Segment raised>
                                                    <Link to="/plan">
                                                        <Button fluid color="green">
                                                            Continue Planning <Icon name="right arrow" />
                                                        </Button>
                                                    </Link>
                                                    <Divider horizontal>OR</Divider>
                                                    <ClearCourseModal fluid clearCourse={() => {return localStorage.clear();}}/>
                                                </Segment>
                                            </Container>
                                        );
                                    } else {
                                        return (
                                            <Container>
                                                <h2>To continue where you left off:</h2>
                                                <Segment raised>
                                                    <Link to="/plan">
                                                        <Button color="green">
                                                            Continue Planning <Icon name="right arrow" />
                                                        </Button>
                                                    </Link>
                                                    <ClearCourseModal floated="right" redirect="/" clearCourse={() => {return localStorage.clear();}}/>
                                                </Segment>
                                            </Container>
                                        );
                                    }
                                }}
                                </MediaQuery>
                            }
                            {!inLocalStorage &&
                                <Container>
                                    <h2>To begin:</h2>
                                    <CourseSelectFormContainer />
                                </Container>
                            }
                    <Link to="/disclaimer"><Button style={{marginTop: "1em"}}>View disclaimer</Button></Link>
                    <div className={Home.checkIfCourseStructureIsInLocalStorage() ? "welcomeBackMargin" : "welcomeMargin"} />
                </div>
            </Container>
        );
    }
}

export default Home;

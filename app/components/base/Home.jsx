import React, {Component} from "react";
import {Button, Container, Icon, Segment, Message } from "semantic-ui-react";
import { Link } from "react-router";
import MediaQuery from "react-responsive";
import ClearCourseModal from "../modals/ClearCourseModal.jsx";
import CourseSelectFormContainer from "../../containers/CourseSelectFormContainer.jsx";
import LocalStorage from "../../utils/LocalStorage.js";

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
        const inLocalStorage = LocalStorage.doesCourseStructureExist();

        return (
            <div style={{color: "white", padding: "1em 0"}}>
                <Container className="ui main text">
                    <div id="welcome" className="ui container">
                        {this.state.showMessage && inLocalStorage !== false && inLocalStorage !== MONPLAN_VERSION &&
                            <Message
                                icon="warning sign"
                                negative
                                header="Please clear course plan"
                                content="In order for the website to function fully, please click 'Clear Course' upon entering the planning page."
                                onDismiss={this.handleDismiss} />
                        }
                        {!(this.state.showMessage && inLocalStorage !== false && inLocalStorage !== MONPLAN_VERSION) &&
                            <div style={{padding: "2.5em"}}></div>
                        }
                        <h1 style={{textAlign: "center", fontSize: "3em"}}>monPlan</h1>
                        <p style={{textAlign: "center", fontSize: "1.5em"}}>
                            Planning your course at Monash is now easier than ever.
                        </p>
                        {inLocalStorage &&
                            <MediaQuery maxDeviceWidth={767}>
                                {mobile =>
                                    <Container textAlign="center">
                                        <Segment basic>
                                            <Link to="/plan">
                                                <Button size="big" color="yellow">
                                                    Continue planning <Icon name="right arrow" />
                                                </Button>
                                            </Link>
                                            <br /><br /><br />
                                          <span style={{fontSize: "1.2em"}}>
                                                        You can also
                                                        {mobile && <br />}
                                                        &nbsp;
                                                        <ClearCourseModal
                                                trigger={
                                                    <a style={{color: "white", textDecoration: "underline"}} href="#">clear your course plan.</a>
                                                }
                                                redirect="/"
                                                clearCourse={() => {return localStorage.clear();}}
                                                />
                                           </span>

                                        </Segment>
                                    </Container>
                                }
                            </MediaQuery>
                        }
                        {!inLocalStorage &&
                            <Container>
                                <CourseSelectFormContainer />
                            </Container>
                        }
                    </div>
                </Container>
            </div>
        );
    }
}

export default Home;

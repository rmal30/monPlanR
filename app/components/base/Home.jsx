import React, {Component} from "react";
import {Button, Container, Icon, Segment, Message} from "semantic-ui-react";
import { Link } from "react-router";

import YearFormContainer from "../../containers/YearFormContainer.jsx";

/**
 * Home page that is shown to the user when they load the domain.
 *
 * @class
 */
class Home extends Component {
    /**
    *
    */
    constructor(){
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
     * @return {boolean} courseStructureDoesExist
     */
    static checkIfCourseStructureIsInLocalStorage() {
        const stringifedJSON = localStorage.getItem("courseStructure");
        if(stringifedJSON === null) {
            return false;
        }

        const { teachingPeriods, numberOfUnits } = JSON.parse(stringifedJSON);

        return Array.isArray(teachingPeriods) && teachingPeriods.length > 0 && numberOfUnits;
    }

    /**
    * Handles Warning Message Dismissal
    *
    * @method
    */
    handleDismiss(){
        this.setState({ showMessage: false });
    }

    /**
     * Renders the welcome page, with a form and a disclaimer.
     *
     * @method
     */
    render() {
        //const { formData, value } = this.state;
        // currently using onBlur instead of onChange for faster input, but need to test this to see if it will present an issue later.
        return (
            <Container className="ui main text wrapper">
                <div id="welcome" className="ui container">
                      {this.state.showMessage && <Message
                        icon="warning sign"
                        negative
                        header="Please Clear Course Plan"
                        content="A Major Update has occured, in order for the website to function fully, please Clear Course upon entering the planning page."
                        onDismiss={this.handleDismiss}
                      />}
                    <h1>Welcome to monPlan!</h1>
                        <p>
                            monPlan allows you to plan your course structure whilst you are at
                            Monash University. We know that choosing units isn't particularly easy, so we've
                            designed a web app that you can use to simplify tasks.
                        </p>
                        {Home.checkIfCourseStructureIsInLocalStorage() &&
                        <Container>
                            <h2>To continue where you left off:</h2>
                            <Segment raised>
                                <Link to="/plan">
                                    <Button color="green">
                                        Continue Planning <Icon name="right arrow" />
                                    </Button>
                                </Link>
                            </Segment>
                        </Container>
                        }
                        {!Home.checkIfCourseStructureIsInLocalStorage() &&
                        <Container>
                            <h2>To begin:</h2>
                            <YearFormContainer />
                        </Container>
                        }
                    <h4>Disclaimer</h4>
                    <p className="disclaimer">monPlan is a tool designed to help students to design courses with ease. Our features are designed to assist you in planning your course, including recommending units based off past
                      SETU results. Since it is only a tool, we recommend you to see your faculty’s course advisor.</p>
                    <p className="disclaimer">Our fundamental goal is to allow all Monash University students to add any units in any teaching period, for any year. Period.
                      We place trust in you as a student to plan your own course, and for some quick guidance, we will inform you if there is anything that might be wrong with your course plan.</p>
                    <p className="disclaimer">Our promise is that we will never restrict you in adding your units to your course, and it is up to you and the course advisors to assist you with your plan.</p>
                    <div className={Home.checkIfCourseStructureIsInLocalStorage() ? "welcomeBackMargin" : "welcomeMargin"} />
                </div>
            </Container>
        );
    }
}

export default Home;

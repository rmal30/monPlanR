import React, {Component} from "react";
import {Container} from "semantic-ui-react";

import CourseStructure from "../CourseStructure.jsx";
import CourseStatisticGroup from "../CourseStatisticGroup.jsx";
import UnitSearchContainer from "../../containers/UnitSearchContainer.jsx";
import UnitInfoContainer from "../../containers/UnitInfoContainer.jsx";

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
            showAddToCourseUI: false
        };
    }

    /**
     * Adds unit to course by specifying unit code. It does not add unit
     * immediately.
     *
     * @param {string} unitToAdd - The unit to be added.
     */
    addToCourse(unitToAdd) {
        this.setState({ unitToAdd });
    }

    /**
     * Turns off add unit UI.
     */
    doneAddingToCourse() {
        this.setState({
            unitToAdd: undefined
        });
    }

    /**
     * Returns a container of grid of a single row, holding the course
     * structure.
     */
    render() {
        const { startYear, endYear } = this.props.location.query;

        return (
            <div>
                <Container className="move">
                
                    <UnitInfoContainer addToCourse={this.addToCourse.bind(this)}
                                    doneAddingToCourse={this.doneAddingToCourse.bind(this)} />

                    <Grid reversed="mobile" stackable>
                        <Grid.Column width="9"><UnitSearchContainer onResult={this.unitSelected} /></Grid.Column>
                        <Grid.Column width="3" />
                        <Grid.Column width="4">
                        <a target="_blank" href="https://docs.google.com/a/monash.edu/forms/d/e/1FAIpQLScyXYUi_4-C7juCSrsvxqBuQCf1rKpoJLb7fVknxxApfrym2g/viewform">
                            <Button primary fluid>Give us feedback</Button>
                        </a>
                        </Grid.Column>
                    </Grid>
                    
                    {false &&
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={2}>
                                
                            </Grid.Column>
                            <Grid.Column width={8} />
                            <Grid.Column width={6}>
                                {false /* disable rendering status information for now */ && 
                                    <CourseStatisticGroup />
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    }
                </Container>
                
                <Container className="main text">
                    <CourseStructure startYear={parseInt(startYear)}
                                     endYear={parseInt(endYear)}
                                     addToCourse={this.addToCourse.bind(this)}
                                     doneAddingToCourse={this.doneAddingToCourse.bind(this)}
                                     unitToAdd={this.state.unitToAdd} />
                </Container>
            </div>
        );
    }
}

export default Plan;

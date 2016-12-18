import React, { Component, PropTypes } from "react";
import { Button, Container, Grid } from "semantic-ui-react";

import UnitQuery from "../../utils/UnitQuery";
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

        this.addToCourse = this.addToCourse.bind(this);
        this.doneAddingToCourse = this.doneAddingToCourse.bind(this);
    }

    /**
     * Adds unit to course by specifying unit code. It does not add unit
     * immediately.
     *
     * @param {string} unitToAdd - The unit to be added.
     */
    addToCourse(nUnitCode) {
        if(!(nUnitCode === undefined)) {

            UnitQuery.getExtendedUnitData(nUnitCode)
                .then(function(response) {
                    let data = response.data;
                    console.log(data);

                    this.setState({
                        unitToAdd: data
                    });

                }.bind(this))
                .catch(function(error) {
                    console.log(error);
                });
        }
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
                <Container className="move no-print">
                    <UnitInfoContainer
                        newUnit={this.state.unitToAdd} />

                    <Grid reversed="mobile" stackable className="no-print">
                        <Grid.Column width="9"><UnitSearchContainer onResult={this.addToCourse} /></Grid.Column>
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
                                     addToCourse={this.addToCourse}
                                     doneAddingToCourse={this.doneAddingToCourse}
                                     unitToAdd={this.state.unitToAdd} />
                </Container>
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
            endYear: PropTypes.string
        }).isRequired
    }).isRequired
};

export default Plan;

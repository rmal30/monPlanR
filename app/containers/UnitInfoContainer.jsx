import React, { Component } from "react";
import { Button, Container, Grid, Icon, Label, Statistic } from "semantic-ui-react";
import UnitInfo from "../components/Unit/UnitInfo.jsx";
import UnitSearchContainer from "./UnitSearchContainer.jsx";
import UnitQuery from "../utils/UnitQuery";
import _ from "lodash";
import MediaQuery from "react-responsive";
/**
 * The UnitInfoContainer class holds the state of and controls the unitInfo component. It fetches and updates the data that populates
 * the component.
 * @author JXNS
 */
class UnitInfoContainer extends Component {

    /**
     * The constructor for the UnitInfoContainer component, sets the initial state of the component and binds the necessary functions.
     * Collapse is initially set to true, isLoading set to false and isFirstsearch set to true. These initial values set up the
     * component for before the first search and are changed afterwards.
     * @author JXNS
     */
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            isLoading: false,
            UnitCode: "",
            UnitName: "",
            Faculty: "Faculty of IT",
            Synopsis: "",
            isFirstSearch: true,
            error: false,
            currentCreditPoints: 0,
            currentEstCost: 0,
        };
        this.handleCollapseClick = this.handleCollapseClick.bind(this);
        this.unitSelected = this.unitSelected.bind(this);
    }

    /**
     * When the collapse button is clicked, the collapse bool must be changed from true to false, or false to true depending on whether
     * it was collapsed or not previously.
     * @author JXNS
     */
    handleCollapseClick() {
        let newState = !(this.state.collapse);
        this.setState({
            collapse: newState
        });
    }

    /**
     * @author Saurabh Joshi
     */
    handleAddToCourse() {
        this.props.addToCourse({
            code: this.state.UnitCode,
            name: this.state.UnitName,
            faculty: this.state.Faculty
        });
    }

    /**
     * The unitSelected function is called whenever a new unit is selected.
     * @author JXNS
     * @param {string} nUnitCode - the new unit code selected by the child component, this code is used as the query param for the api call.
     */
    unitSelected(nUnitCode) {
        if(this.state.isFirstSearch) {
            this.setState({collapse: false});
        }

        this.handleAddToCourse.bind(this);

        this.setState({
            isLoading: true,
            isFirstSearch: false
        });

        UnitQuery.getExtendedUnitData(nUnitCode)
            .then(function(response) {
                let data = response.data;

                this.setState({
                    isLoading: false,
                    UnitCode: nUnitCode,
                    UnitName: data.UnitName,
                    Faculty: data.Faculty,
                    Synopsis: data.Description,
                    error: false
                });

                this.props.addToCourse({
                    code: nUnitCode,
                    name: data.UnitName,
			        faculty: data.Faculty
                });
            }.bind(this))
            .catch(function(error) {
                console.log(error);
                this.setState({
                    isLoading: false,
                    UnitCode: nUnitCode,
                    error: true,
                });
            }.bind(this));

    }

    /**
     * The component currently returns both the unitsearch and unitInfo components with all the gathered state.
     * @author JXNS
     */
    render() {
        return (
            <Container className="move">
                
                <UnitInfo
                    isDisabled={this.state.isFirstSearch}
                    UnitCode={this.state.UnitCode}
                    UnitName={this.state.UnitName}
                    Faculty={this.state.Faculty}
                    Synopsis={this.state.Synopsis}
                    usefulnessScore={5}
                    likeScore={3}
                    collapse={this.state.collapse}
                    isLoading={this.state.isLoading}
                    onCollapseClick={this.handleCollapseClick}
                    error={this.state.error}
                />

                <Grid reversed="mobile" stackable>
                    <Grid.Column width="8"><UnitSearchContainer onResult={this.unitSelected} /></Grid.Column>
                    <Grid.Column width="3" />
                    <Grid.Column width="4">
                    <a target="_blank" href="https://docs.google.com/forms/d/1BNnHFCMxfEDejKDY83Vgs9wBXiurM-W4nk4f6KJy79c/edit">
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
                            <MediaQuery minDeviceWidth={768}>{(desktop) => {
                                if (desktop) {
                                    return(
                                        <Statistic.Group size="tiny">
                                            <Statistic>
                                                <Statistic.Value>
                                                    <Icon name='student' />
                                                    {this.state.currentCreditPoints}
                                                </Statistic.Value>
                                                <Statistic.Label>Credit Points</Statistic.Label>
                                            </Statistic>

                                            <Statistic>
                                                <Statistic.Value >
                                                    <Icon name='dollar' />
                                                    {this.state.currentEstCost}
                                                </Statistic.Value>
                                                <Statistic.Label>Total Est. Cost</Statistic.Label>
                                            </Statistic>
                                        </Statistic.Group>
                                    );
                                } else {
                                    return (
                                      <Container>
                                          <Label color="green" size="large">
                                              Total Credits Earnt
                                              <Label.Detail>{this.state.currentCreditPoints}</Label.Detail>
                                          </Label>
                                          <Label color="green" size="large">
                                              Total Expenses
                                              <Label.Detail>${this.state.currentEstCost}</Label.Detail>
                                          </Label>
                                      </Container>
                                    );
                                }
                            }}
                            </MediaQuery>
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                }
            </Container>
        );
    }
}

export default UnitInfoContainer;

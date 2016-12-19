import React, { PropTypes } from "react";
import { Divider, Grid, Segment, Message, Statistic, Icon } from "semantic-ui-react";
import SetuRating from "./SetuRating.jsx";
import UnitInfoPlaceholder from "./UnitInfoPlaceholder.jsx";
import CollapseButton from "../CollapseButton.jsx";
import UnitDescriptionContainer from "../../containers/UnitDescriptionContainer.jsx";

/**
* This component displays the unit info for a selected unit in the form of a collapsable tray.
* @author JXNS
*
* @param {boolean} collapse - A true/false value representing whether the component is in collpased state or not.
* @param {string} Faculty - The faculty a unit belongs to.
* @param {number} likeScore - A score between 0 and 5 representing how much the students enjoyed a unit.
* @param {boolean} isDisabled - A value representing whether the collapse button should be disabled, only necessary for before first search.
* @param {boolean} isLoading - Whether or not to display loading UI.
* @param {function} onCollapseClick - A function called when the prop collapses (in this case used to control the data and state of container parent).
* @param {string} Synopsis - A short description of the unit.
* @param {string} UnitCode - The unit's associated unit code.
* @param {string} UnitName - The unit's associated unit name.
* @param {number} usefulnessScore - A score between 0 and 5 representing how much students felt they learnt in the unit.
* @param {boolean} error - A value indicating whether an error has occured or not, if there is an error getting unit data, the component will display error message.
*/
function UnitInfo(props) {

    UnitInfo.propTypes = {
        collapse: PropTypes.bool.isRequired,
        cost: PropTypes.number.isRequired,
        creditPoints: PropTypes.number.isRequired,
        error: PropTypes.bool.isRequired,
        Faculty: PropTypes.string.isRequired,
        likeScore: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool,
        onCollapseClick: PropTypes.func.isRequired,
        Synopsis: PropTypes.string.isRequired,
        UnitCode: PropTypes.string.isRequired,
        UnitName: PropTypes.string.isRequired,
        usefulnessScore: PropTypes.number.isRequired
    };

    if (props.collapse){
        return (
            <div className="ui raised segment">
                <CollapseButton
                    isDisabled={props.isDisabled}
                    collapse={props.collapse}
                    onCollapseClick={props.onCollapseClick}
                    currentUnit={props.UnitCode} />
            </div>
        );
    } else if(props.isLoading) {
        return (
            <div className="ui raised segment">
                <CollapseButton
                    isDisabled={props.isDisabled}
                    collapse={props.collapse}
                    onCollapseClick={props.onCollapseClick}
                    currentUnit={props.UnitCode} />
                <UnitInfoPlaceholder />
            </div>
        );
    } else if(props.error) {
        return (
                <Segment raised>
                    <CollapseButton
                        isDisabled={props.isDisabled}
                        collapse={props.collapse}
                        onCollapseClick={props.onCollapseClick}
                        currentUnit={props.UnitCode}/>
                    <h3>{"Error fetching unit data for unit: " + props.UnitCode}</h3>
                </Segment>
        );
    } else {
        return (
                <Segment raised>
                    <CollapseButton
                        isDisabled={props.isDisabled}
                        collapse={props.collapse}
                        onCollapseClick={props.onCollapseClick}
                        currentUnit={props.UnitCode}/>
                    <Grid celled stackable columns={2}>
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <h3>{props.UnitCode + " - " + props.UnitName}</h3>
                                <p>{props.Faculty}</p>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Statistic size="mini">
                                    <Statistic.Value>
                                        <Icon name='student' />
                                        {props.creditPoints}
                                    </Statistic.Value>
                                    <Statistic.Label>Credit Points</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Statistic size="mini">
                                    <Statistic.Value >
                                        <Icon name='dollar' />
                                        {props.cost}
                                    </Statistic.Value>
                                    <Statistic.Label>Est. Unit Cost</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <Grid.Row>
                                    <UnitDescriptionContainer
                                        textLength={200}
                                        fullText={props.Synopsis}
                                    />
                                    {false /* disable renderind unit guide link for now */ && <a target="blank" href={"https://unitguidemanager.monash.edu/view?unitCode=" + props.UnitCode + "&tpCode=S1-01&tpYear=2016"}>View unit guide for this unit</a>}
                                    <a target="blank" href={`https://www.monash.edu.au/pubs/handbooks/units/${props.UnitCode}.html`}>View handbook entry for this unit</a>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column width={4}>
                            <Message info>
                                <Message.Header>Unit Ratings</Message.Header>
                                <Message.Content>Ratings coming soon</Message.Content>
                            </Message>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
        );
    }
}

export default UnitInfo;

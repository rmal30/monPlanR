import React, { PropTypes } from "react";
import { Grid, Icon, Button } from "semantic-ui-react";
import SetuRating from "./SetuRating.jsx";
import UnitInfoPlaceholder from "./UnitInfoPlaceholder.jsx";
import CollapseButton from "../CollapseButton.jsx";

/**     
 * Description
 * @author JXNS
 * 
 * @param {boolean} collapse - 
 * @param {string} Faculty - 
 * @param {number} likeScore - 
 * @param {boolean} isDisabled -
 * @param {function} onCollapseClick - 
 * @param {string} Synopsis - 
 * @param {string} UnitCode - 
 * @param {string} UnitName - 
 * @param {number} usefulnessScore - 
 */
function UnitInfo(props) {

    UnitInfo.propTypes = {
        collapse: PropTypes.bool.isRequired,
        Faculty: PropTypes.string.isRequired,
        likeScore: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
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
                    onCollapseClick={props.onCollapseClick} />
            </div>
        );
    } else {
        if (props.isLoading){
            return (
                <div className="ui raised segment">
                   <CollapseButton
                        isDisabled={props.isDisabled}
                        collapse={props.collapse}
                        onCollapseClick={props.onCollapseClick} />
                   <UnitInfoPlaceholder />
            </div>
            );
        } else {
            return (
                <div className="ui raised segment">
                   <CollapseButton
                        isDisabled={props.isDisabled}
                        collapse={props.collapse}
                        onCollapseClick={props.onCollapseClick} />
                    <Grid celled stackable columns={2}>
                        <Grid.Column width={12}>
                            <Grid.Row>
                                    <h3>{props.UnitCode + " - " + props.UnitName}</h3>
                                    <p>{props.Faculty}</p>
                                    <hr />
                                    <p>{props.Synopsis}</p>
                                    <a target="blank" href={"https://unitguidemanager.monash.edu/view?unitCode=" + props.UnitCode + "&tpCode=S1-01&tpYear=2016"}>View unit guide for this unit</a>

                            </Grid.Row>
                        </Grid.Column>

                        <Grid.Column width={4}>
                        <Grid.Row>
                            <SetuRating starRating={props.usefulnessScore} heartRating={props.likeScore} />
                        </Grid.Row>

                        </Grid.Column>
                    </Grid>
                </div>
            );
        }
    }
}

export default UnitInfo;

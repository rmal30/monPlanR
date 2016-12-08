import React, { PropTypes } from "react";
import { Grid, Icon, Button } from "semantic-ui-react"
import SetuRating from "./SetuRating.jsx"
import UnitInfoPlaceholder from "./UnitInfoPlaceholder.jsx"
import CollapseButton from "./CollapseButton.jsx"

function UnitInfo(props) {

    if (props.collapse){
        return (
             <div className="ui raised segment">
                <CollapseButton 
                    collapse={props.collapse} 
                    onCollapseClick={props.onCollapseClick} />
            </div>
        )
    } else {
        if (props.isLoading){
            return (
                <div className="ui raised segment">
                   <CollapseButton 
                        collapse={props.collapse} 
                        onCollapseClick={props.onCollapseClick} />
                   <UnitInfoPlaceholder />
            </div>
            )
        } else {
            return (
                <div className="ui raised segment">
                   <CollapseButton 
                        collapse={props.collapse} 
                        onCollapseClick={props.onCollapseClick} />
                    <Grid celled>
                        <Grid.Column width={12}>
                            <Grid.Row>
                                    <h3>{props.UnitCode + " - " + props.UnitName}</h3>
                                    <hr />
                                    <p>{props.Synopsis}</p>
                                    <a target="blank" href={"https://unitguidemanager.monash.edu/view?unitCode=" + props.UnitCode + "&tpCode=S1-01&tpYear=2016"}>View unit guide for this unit</a>
                            
                            </Grid.Row>
                        </Grid.Column>

                        <Grid.Column width={4}>
                        <Grid.Row>
                                
                        </Grid.Row>
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


UnitInfo.Proptypes = {
    collapse: PropTypes.bool.isRequired,
    onCollapseClick: PropTypes.func.isRequired,
    UnitCode: PropTypes.string.isRequired,
    UnitName: PropTypes.string.isRequired,
    Synopsis: PropTypes.string.isRequired,
    starRating: PropTypes.number,
    heartRating: PropTypes.number
}

export default UnitInfo;
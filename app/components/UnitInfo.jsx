import React from "react";
import { Grid, Icon, Button } from "semantic-ui-react"
import SetuRating from "./SetuRating.jsx"

function UnitInfo(props) {

    if (props.collapse){
        return (
             <div className="ui raised segment">
                <Button floated="right" onClick={props.onCollapseClick}>
                    Show unit details <Icon name="chevron down" />
                </Button>
            </div>
        )
    } else {
        if (props.isLoading){
            return (
                <div className="ui raised segment">
                    <p>Loading...</p>
                </div>
            )
        } else {
            return (
                <div className="ui raised segment">
                    <Button floated="right" onClick={props.onCollapseClick}>Collapse <Icon name="chevron up" /></Button>
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

export default UnitInfo;
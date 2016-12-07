import React from "react";
import { Grid, Icon, Button } from "semantic-ui-react"
import SetuRating from "./SetuRating.jsx"

const testData = {
    "UnitCode": "FIT2001",
    "UnitName": "Systems development",
    "Faculty": "it",
    "Sypnosis": "The unit introduces students to systems analysis and design as a problem solving activity, within the framework of a selected methodology. It will focus on contemporary industry practice; investigating understanding and documenting system requirements; a range of design and implementation activities; and professional skills required for systems development.",
    "Preqs": "24 points of FIT units",
    "Proh": "BUS2021, CPE2003, CSE1204, CSE1205, GCO1813, GCO2601, GCO2852, GCO2826, IMS1001, IMS1002, IMS1805, IMS2071, IMS9001",
    "usefulnessScore": 3,
    "likeScore": 3,
  }

function UnitInfo(props) {
    return (
        <div className="ui raised segment">
            <Button floated="right" onClick={function(){
                            alert("it worked");
                        }}>Collapse <Icon name="chevron up" /></Button>
            <Grid celled>
                <Grid.Column width={12}>
                    <Grid.Row>
                            <h3>{testData.UnitCode + " - " + testData.UnitName}</h3>
                            <hr />
                            <p>{testData.Sypnosis}</p>
                            <a target="blank" href={"https://unitguidemanager.monash.edu/view?unitCode=" + testData.UnitCode + "&tpCode=S1-01&tpYear=2016"}>View unit guide for this unit</a>
                    
                    </Grid.Row>
                </Grid.Column>

                <Grid.Column width={4}>
                <Grid.Row>
                          
                </Grid.Row>
                <Grid.Row>
                    <SetuRating starRating={testData.usefulnessScore} heartRating={testData.likeScore} />
                </Grid.Row>
                      
                </Grid.Column>

                
            </Grid>
            
       </div>
    );
}

export default UnitInfo;
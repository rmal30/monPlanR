import React from "react";

import { Card, Rating } from "semantic-ui-react"

const testData = {
    "UnitCode": "FIT2001",
    "UnitName": "Systems development",
    "Faculty": "it",
    "Sypnosis": "The unit introduces students to systems analysis and design as a problem solving activity, within the framework of a selected methodology. It will focus on contemporary industry practice; investigating understanding and documenting system requirements; a range of design and implementation activities; and professional skills required for systems development.",
    "Preqs": "24 points of FIT units",
    "Proh": "BUS2021, CPE2003, CSE1204, CSE1205, GCO1813, GCO2601, GCO2852, GCO2826, IMS1001, IMS1002, IMS1805, IMS2071, IMS9001",
    "SetuRating": 3
  }

function UnitInfo(props) {
    return (
       <div className="ui raised segment">
           <Card>
               <Card.Content>
                    <Card.Header>FIT2001 - Systems development</Card.Header>
                    <Card.Meta>Faculty of Information Technology</Card.Meta>
                    <Card.Content>
                        <Rating icon='star' defaultRating={3} maxRating={6} disabled/>
                    </Card.Content>
                    <Card.Description>The unit introduces students to systems analysis and design as a problem solving activity, within the framework of a selected methodology. It will focus on contemporary industry practice; investigating understanding and documenting system requirements; a range of design and implementation activities; and professional skills required for systems development.</Card.Description>
               </Card.Content>
           </Card>
           
       </div>
    );
}

export default UnitInfo;
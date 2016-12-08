import React from "react";
import { Card } from "semantic-ui-react"
import SetuRating from "./SetuRating.jsx"

/* The UnitInfoCard is an alternate, more concise way to present unit data, it is kept as a component 
 Currently for if we ever decide we need a multiple */
function UnitInfoCard(props) {
    return (
        <div className="ui raised segment">
            <Card>
                <Card.Content>
                    <Card.Header>FIT2001 - Systems development</Card.Header>
                    <Card.Meta>Faculty of Information Technology</Card.Meta>
                    <Card.Description>The unit introduces students to systems analysis and design as a problem solving activity, within the framework of a selected methodology. It will focus on contemporary industry practice; investigating understanding and documenting system requirements; a range of design and implementation activities; and professional skills required for systems development.</Card.Description>
               </Card.Content>
               <Card.Content>
                   <SetuRating />
               </Card.Content>
               <Card.Content>
                    <a target="blank" href={"https://unitguidemanager.monash.edu/view?unitCode=" + testData.UnitCode + "&tpCode=S1-01&tpYear=2016"}>View unit guide for this unit</a>
               </Card.Content>
           </Card>
           
       </div>
    );
}

export default UnitInfoCard;
import React from "react";
import { Image, Segment } from "semantic-ui-react";

const missingPage = () =>
  <Segment textAlign='center' padded="very" style={{height: "900px", background: 'url(../../resources/img/hal.png)', backgroundColor:'rgba(52,52,52,0)'}}>
    <h3 style={{color: 'white'}}>I'm sorry Dave, I'm afraid I can't let you in.</h3>
    <p style={{color: 'white'}}>This page is missing or does not exist</p>
    <a href="./">Click Here to Go to the Home Page</a>
  </Segment>;


export default missingPage;

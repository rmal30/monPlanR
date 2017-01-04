import React from "react";
import { Image, Segment } from "semantic-ui-react";

const missingPage = () =>
  <Segment textAlign='center' padded="very" style={{height: "315px", background: 'url(../../resources/img/notthepage.jpg)', backgroundColor:'rgba(52,52,52,0)'}}>
    <h3 style={{color: 'yellow'}}>This is not the page you are looking for</h3>
  </Segment>;


export default missingPage;

import React from "react";
import { Segment, Button, Icon} from "semantic-ui-react";
import {Link} from "react-router";

const missingPage = () =>
  <Segment textAlign='center' padded="very"
    style={{minHeight: "100%", width: "100%" ,background: 'url(../../resources/img/hal.png)no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundColor:'rgba(52,52,52,0)'}}>
    <div>
      <h3 style={{color: 'white'}}>I'm sorry Dave, I'm afraid I can't let you do that.</h3>
      <p style={{color: 'white'}}>This page is missing or does not exist</p>
      <p style={{color: 'white'}}>Error Code: 404</p>
      <Link to="/">
        <Button color="blue">
          <Icon name='home' />
          Click Here to Go to the Home Page
        </Button>
      </Link>
    </div>

    <div className="push404" />
  </Segment>;


export default missingPage;

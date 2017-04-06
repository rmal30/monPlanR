import React from "react";
import { Button, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router";

/**
 * When a user visits a path that does not exist, it returns this component
 * as a 404 message.
 *
 * @author Eric Jiang
 */
const missingPage = () => (
    <Segment textAlign="center" padded="very"
        className="missingPage"
        style={{background: "url(../../img/hal.png)no-repeat", backgroundColor: "rgba(52,52,52,0)"}}>
        <div>
            <h3>I'm sorry Dave, I'm afraid I can't let you do that.</h3>
            <p>This page is missing or does not exist</p>
            <p><i>Error Code: 404</i></p>
            <Link to="/">
                <Button color="orange">
                    <Icon name="home" />
                    Click Here to Go to the Home Page
                </Button>
            </Link>
        </div>

        <div className="push404" />
    </Segment>
);

export default missingPage;

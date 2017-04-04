import React from "react";
import { Button, Image, Grid } from "semantic-ui-react";
import axios from "axios";

/**
* The magic function
*/
const LoginButton = () => {
    return(
            <Button className="btnwhite" onClick={() => {axios.post('/auth/login');}}>
                <Grid>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column width={3}>
                            <Image floated="left" height="100%"  size="tiny" src="../../img/monashlogo.png" />
                        </Grid.Column>
                        <Grid.Column width={13} centered>
                            Login with Authecate
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Button>
    );
};

export default LoginButton;

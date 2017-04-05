import React, {Component} from "react";
import {Container, Button} from "semantic-ui-react";
import {Link} from "react-router";
import TypeOut from "react-typeout";
import { browserHistory } from 'react-router';




const words = [" a lawyer.", " a games developer.", " a researcher.",  " a scientist.", " an accountant.", " a doctor.", " a  pharmacist.", " a  journalist.",
    " a physicist.", " an engineer.", " a teacher.", " a  Monash student."
];

/**
 * Home page that is shown to the user when they load the domain.
 *
 * @class
 */
const Future = () => {
    return (
        <div style={{color: "white", padding: "1em 0"}}>
            <Container className="ui main text">
                <div id="welcome" className="ui container">
                    <img style={{width: "40%"}} src="/img/monash.png" alt="logo" />
                    <h1 style={{fontSize: "4rem", marginTop: "16rem"}}> 
                        I want to be   
                        <TypeOut words={words} className={"react-typeout"} typeSpeed={100} />
                    </h1>
                    <Button onClick={() => {browserHistory.push('/future/select');}} inverted size="huge" style={{borderRadius:"0"}}>Explore my future </Button>       
                </div>
            </Container>
        </div>
    );
};

export default Future;

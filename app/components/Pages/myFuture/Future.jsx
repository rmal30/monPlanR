import React, {Component} from "react";
import {Container, Button} from "semantic-ui-react";

import TypeOut from 'react-typeout';


const words = [" a lawyer.", " a games developer.", " a researcher.",  " a scientist.", " an accountant.", " a doctor.", " a  pharmacist.", " a  journalist.",
 " a physicist.", " an engineer.", " a teacher.", " a  Monash student."
];

/**
 * Home page that is shown to the user when they load the domain.
 *
 * @class
 */
class Future extends Component {
    /**
    * State holds a boolean value to display an error message telling users
    * to clear their course as some features will not work otherwise.
    */
    constructor() {
        super();

        this.state = {
            showMessage: true
        };

        this.handleDismiss = this.handleDismiss.bind(this);
    }

    /**
    * Handles warning message dismissal
    *
    * @author Eric Jiang
    */
    handleDismiss() {
        this.setState({ showMessage: false });
    }

    /**
     * Renders the welcome page, with a form and a disclaimer.
     */
    render() {

        return (
            <div style={{color: "white", padding: "1em 0"}}>
                <Container className="ui main text">
                    <div id="welcome" className="ui container" cursor={{blink: true}}>

                        <img style={{width: "40%"}} src="/img/monash.png" alt="logo" />
                        <h1 style={{fontSize: "4rem", marginTop: "16rem"}}> 
                            I want to be   
                            <TypeOut words={words} className={"react-typeout"} typeSpeed={100} />|
                        </h1>
                         <Button inverted size="huge">Explore my future path </Button>                                
                    </div>
                </Container>
            </div>
        );
    }
}

export default Future;

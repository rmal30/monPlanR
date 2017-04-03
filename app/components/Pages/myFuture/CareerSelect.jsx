import React, {Component} from "react";
import { Container, Dropdown, Button, Icon } from "semantic-ui-react";


const options = [" a lawyer.", " a games developer.", " a researcher.",  " a scientist.", " an accountant.", " a doctor.", " a  pharmacist.", " a  journalist.",
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
            showMessage: true,
            selectedCourse: null
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
                    <div id="welcome" className="ui container" style={{textAlign:"left"}}>
                        <img style={{width: "40%", marginBottom: "16rem"}} src="/img/monash.png" alt="logo" />
                        <h1 style={{display: "inline"}}>I want to be a &nbsp;&nbsp;</h1>      
                        <Dropdown placeholder="Select Career Choice" fluid search selection options={options} />
                        <br />
                        <Button className="btnmainblue" style={{right: "0"}}>View how this career looks like <Icon name="right arrow" /> </Button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Future;

import React, {Component} from "react";
import {Button, Container, Icon, Form, Grid, Message} from "semantic-ui-react";
import {Link, Router, Route} from "react-router";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            startYear: 2016,
            endYear: 2018
        };
        this.returnData = this.returnData.bind(this);
        this.changeEndYear = this.changeEndYear.bind(this);
        this.changeStartYear = this.changeStartYear.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    changeEndYear(e){
        this.setState({
            endYear: e.target.value
        });
    }
    changeStartYear(e){
        this.setState({
            startYear: e.target.value
        });
    }

    returnData(){
        console.log(this.state);
        return this.state;
    }

    submitData(event){
        event.preventDefault();

        var startYear = this.state.startYear;
        var endYear = this.state.endYear;

        this.context.router.push({
            pathname: "/plan",
            query: {
                startYear: startYear,
                endYear: startYear
            }
        });
    }

    render() {
        const { formData, value } = this.state ;
        return  (
            <Container className="ui main text">
                <div id="welcome" className="ui container">
                    <h1>Welcome to monPlan!</h1>
                    <p>monPlan allows you to plan your course structure whilst you are at
                        Monash University. We know that choosing units isn't particularly easy, so we've
                        designed a web app that you can use to simplify tasks.</p>
                        <h2>To Begin</h2>
                        <p>Please enter your commencement and graduation year to get started.</p>
                        <Grid.Row>
                            <Form size="large">
                                <div className="ui raised segment">
                                    <Form.Field>
                                        <div className="ui labeled input">
                                            <div className="ui label">Commencement Year:</div>
                                            <input name="startYr" type="text" placeholder="2016" onChange={this.changeStartYear}/>
                                        </div>
                                    </Form.Field>
                                    <Form.Field>
                                        <div className="ui labeled input">
                                            <div className="ui label">Graduation Year:</div>
                                            <input name="gradYr" type="text" placeholder="2018" onChange={this.changeEndYear}/>
                                        </div>
                                    </Form.Field>
                                    <Button color="green" onClick={this.submitData}>Start Planning <Icon name="right arrow" /></Button>
                                    <Button disabled>Start with empty template</Button>
                                </div>
                            </Form>
                        </Grid.Row>
                    <h4>Disclaimer</h4>
                    <p className="disclaimer">monPlan is a tool designed to help students to design courses with ease. Our features are designed to assist you in planning your course, including recommending units based off past
                      SETU results. Since it is only a tool, we recommend you to see your faculty’s course advisor.</p>
                    <p className="disclaimer">Our fundamental goal is to allow all Monash University students to add any units in any teaching period, for any year. Period.
                      We place trust in you as a student to plan your own course, and for some quick guidance, we will inform you if there is anything that might be wrong with your course plan.</p>
                    <p className="disclaimer">Our promise is that we will never restrict you in adding your units to your course, and it is up to you and the course advisors to assist you with your plan.</p>

                </div>
            </Container>);
    }
}


Home.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Home;

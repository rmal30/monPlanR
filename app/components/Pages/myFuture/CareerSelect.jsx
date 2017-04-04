import React, { Component, PropTypes } from "react";
import { Container, Dropdown, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";

import * as DataFetchActions from "../../../actions/DataFetchActions";

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
            selectedCourseID: "0"
        };

        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleCareerSelect = this.handleCareerSelect.bind(this);
    }


    componentWillMount() {
        this.props.fetchCareers();

    }

    /**
    * Handles warning message dismissal
    *
    * @author Eric Jiang
    */
    handleDismiss() {
        this.setState({ showMessage: false });
    }

    handleCareerSelect(e, { value }) {
        this.setState({
            selectedCourseID: value
        });
    }
    /**
     * Renders the welcome page, with a form and a disclaimer.
     */
    render() {
        const careerOptions = this.props.careers.map((career) => {
            return {
                key: career.id,
                value: career.id,
                text: career.title
            };
        });
        


        return (
            <div style={{color: "white", padding: "1em 0"}}>
                <Container className="ui main text">
                    <div id="welcome" className="ui container" style={{textAlign:"left"}}>
                        <img style={{width: "40%", marginBottom: "16rem"}} src="/img/monash.png" alt="logo" />
                        <h1 style={{display: "inline"}}>I want to be a &nbsp;&nbsp;</h1>      
                        <Dropdown 
                            placeholder="Select Career Choice" 
                            fluid 
                            search 
                            selection 
                            options={careerOptions} 
                            onChange={this.handleCareerSelect}
                        />
                        <br />
                        <Link to={`future/career/${this.state.selectedCourseID}`}><Button className="btnmainblue" style={{right: "0"}}>View how this career looks like <Icon name="right arrow" /></Button></Link>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(DataFetchActions, dispatch);
};

const mapStateToProps = (state) => {
    return {
        careers: state.Careers.careers,
        isLoading: state.Careers.careersAreLoading,
        careersLoadError: state.Careers.careersLoadError
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Future);


Future.propTypes = {
    careers: PropTypes.array,
    fetchCareers: PropTypes.func

};
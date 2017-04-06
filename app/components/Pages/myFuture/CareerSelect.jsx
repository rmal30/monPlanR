import React, { Component, PropTypes } from "react";
import { Container, Dropdown, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";

import * as DataFetchActions from "../../../actions/DataFetchActions";

/**
 * Home page that is shown to the user when they load the domain.
 *
 * @class
 */
class CareerSelect extends Component {
    /**
    * State holds a boolean value to display an error message telling users
    * to clear their course as some features will not work otherwise.
    */
    constructor(props) {
        super(props);

        this.state = {
            selectedCourseID: "1"
        };

        this.handleCareerSelect = this.handleCareerSelect.bind(this);
    }


    /**
     * before the component mounts we need to fetch all 
     * careers to populate dropdown
     */
    componentDidMount() {
        this.props.fetchCareers();
    }

    /**
     * once a course is selected from the dropdown we set the state to 
     * reflect this
     */
    handleCareerSelect(e, { value }) {
        this.setState({
            selectedCourseID: value
        });
    }

    /**
     * Renders the welcome page, with a form and a disclaimer.
     */
    render() {
        

        return (
            <div style={{color: "white", padding: "1em 0", backgroundImage: "url('http://www.weareathlon.com/public/uploads/news/16/1420x440-hero_trends.jpg')", backgroundRepeat: "cover"}}>
                <Container className="ui main text">
                    <div id="welcome" className="ui container" style={{textAlign:"left"}}>
                        <img style={{width: "40%", marginBottom: "16rem"}} src="/img/monash.png" alt="logo" />
                        <h1 style={{display: "inline"}}>I want to be a &nbsp;&nbsp;</h1>      
                        {this.props.isLoading ? <p>Loading...</p> :
                            <Dropdown 
                                placeholder="Select Career Choice"  
                                search 
                                selection 
                                onChange={this.handleCareerSelect}
                                compact
                                options={this.props.careers.map((career) => {
                                    return {
                                        key: career.id,		
                                        value: career.id,		
                                        text: career.title		
                                    };		
                                })}
                                style={{display: "inline", minWidth: "500px",maxWidth: "500px", width: "500px"}}
                            />
                        }
                        <br />
                        <Button onClick={() => {browserHistory.push(`/future/career/${this.state.selectedCourseID ? this.state.selectedCourseID : "0"}`);}} className="btnmainblue" style={{right: "0"}}>View how this career looks like <Icon name="right arrow" /></Button>
                    </div>
                </Container>
            </div>
        );
    }
}

/**
 * map dispatch to props to access fetchCareers function
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(DataFetchActions, dispatch);
};

/**
 * map the state to deal with the async loading of careers array
 */
const mapStateToProps = (state) => {
    return {
        careers: state.Careers.careers,
        isLoading: state.Careers.careersAreLoading,
        careersLoadError: state.Careers.careersLoadError
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerSelect);


CareerSelect.propTypes = {
    careers: PropTypes.array,
    fetchCareers: PropTypes.func,
    isLoading: PropTypes.bool
};
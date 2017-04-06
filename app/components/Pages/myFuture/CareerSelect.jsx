import React, { Component, PropTypes } from "react";
import { Container, Dropdown, Button, Icon,Search } from "semantic-ui-react";
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
            selectedCourseID: "0",
            isLoading: false,
            value: ""
        };

        this.handleCareerSelect = this.handleCareerSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
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

    handleResultSelect(e, result){
        this.setState({ selectedCourseID: result.value });
    }

    handleSearchChange (e, value) {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = (result) => re.test(result.title);

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            });
        }, 500)
    }
    /**
     * Renders the welcome page, with a form and a disclaimer.
     */
    render() {


        return (
            <div style={{color: "white", padding: "1em 0", minHeight: "100%", height: "100%" }}>
                <Container className="ui main text" style={{color: "white", padding: "1em 0", minHeight: "100%", height: "100%"}}>
                    
                    <div id="welcome" className="ui container" style={{textAlign:"center", minHeight: "100%", height: "100%"}}>
                        <div className="Aligner" style={{textAlign:"center", minHeight: "100%", height: "100%"}}>
                        <div className="Aligner-item Aligner-item--top"></div>
                        <div className="Aligner-item">
                            {this.props.isLoading ? <p>Loading...</p> :
                            <Search
                                onResultSelect={(e, {value}) => {
                                    browserHistory.push(`/future/career/${value}`);
                                }} 
                                onSearchChange={this.handleSearchChange}
                                results={this.props.careers.map((career) => {
                                    return {
                                        key: career.id,		
                                        value: career.id,		
                                        title: career.title		
                                    };		
                                })}
                                className={"searchCareer"}
                                placeholder="I want to be a ..."
                                size="massive"
                            />
                        }
                        </div>
                        <div className="Aligner-item Aligner-item--bottom"></div>
                        </div>
                        
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

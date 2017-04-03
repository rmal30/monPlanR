import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dataFetchActions from "../../../actions/DataFetchActions";

class CareerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    

    componentWillMount() {
        this.props.fetchCareer(this.props.params.careerID);
    }

    render() {
        return (
            <div>
                <h1>{this.props.career.title}</h1>
                <p>{this.props.career.description}</p>
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    return {
        career: state.Career.career,
        isLoading: state.Career.careerIsLoading,     
        loadError: state.Career.careerLoadError
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(dataFetchActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CareerDetail);

CareerDetail.propTypes = {
    fetchCareer: PropTypes.func,
    params: PropTypes.object,
    career: PropTypes.object
};
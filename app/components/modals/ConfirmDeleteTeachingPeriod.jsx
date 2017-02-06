import React, { Component, PropTypes } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/CourseActions";
import * as uiActions from "../../actions/UIActions";

/**
 * @author JXNS
 */
class ConfirmDeleteTeachingPeriod extends Component {

    /**
     * Sets up initial state and binds the functions
     */
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    /**
     * handles the attempt to delete a teaching period, this is handled by the attemptToDeleteTeachingPeriod action creator
     */
    handlePress() {
        const { attemptToDeleteTeachingPeriod, index, units } = this.props;
        attemptToDeleteTeachingPeriod(index, units);
    }

    /**
     * on render we process the message that will be shown in the confirmation popup, if the state is set to open then we show the
     * modal, otherwise we just show the plain remove button
     */
    render() {
        return (
            <Button floated="right" onClick={this.handlePress} color="red" inverted size="tiny" icon="close" />
        );
    }
}

/**
 * We need the removeTeachingPeriod and attemptToDeleteTeachingPeriod functions from courseActions, and need 
 * the show and hide confirmDeleteTeachingPeriodModal functions from uiActions
 */
const mapDispatchToProps = (dispatch) => {
    const actionBundle = {...courseActions, ...uiActions};
    return bindActionCreators(actionBundle, dispatch);
};

export default connect(null, mapDispatchToProps)(ConfirmDeleteTeachingPeriod);

ConfirmDeleteTeachingPeriod.propTypes = {
    index: PropTypes.number,
    attemptToDeleteTeachingPeriod: PropTypes.func,
    units: PropTypes.array
};

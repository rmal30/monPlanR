import React, { Component, PropTypes } from "react";
import PaletteButton from "../../components/Buttons/PaletteButton.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UIActions from "../../actions/UIActions";

/**
* @author Charlie Campton
*/
class PaletteButtonContainer extends Component {
    /**
    */
    constructor() {
        super();
        this.showPaletteClick = this.showPaletteClick.bind(this);
    }
    /**
    */
    showPaletteClick(){
        this.props.togglePalette();
    }
    /**
    */
    render() {
        return(
            <PaletteButton showPalette={this.showPaletteClick} showingPalette={this.props.showingPalette}/>
        );
    }
}

PaletteButtonContainer.propTypes = {
    togglePalette: PropTypes.func,
    showingPalette: PropTypes.bool
};

/**
Mapping state to props
*/
const mapStateToProps = (state) => {
    return {
        showingPalette: state.UI.showingPalette
    };
};

/**
Mapping dispatch to props
*/
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(UIActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PaletteButtonContainer);

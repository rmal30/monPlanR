import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


/**
 STILL BEING BUILT
 */


/**
 * This component is a palette with which the user can drag interesting unitsto
 * @author Charlie Campton
 */
class UnitPaletteContainer extends Component {
    /**
    *
    */
    drop(){
        return(
            <div>

            </div>
        );
    }
}

/**
Mapping dispatch to props
*/
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(dispatch);
};


export default connect(mapDispatchToProps)(UnitPaletteContainer);

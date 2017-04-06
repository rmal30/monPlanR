import React, { Component, PropTypes } from "react";
import {Icon} from "semantic-ui-react";
/**
 * Offering container returns the formatted unit offering/location data
 *
 * @author JXNS
 *
 * @param {array} offeringArray - a multidimensional array of values of the form [[[Location1], [offering1, offering2, ...], [Location2], [offering1, offering2, ...]]] etc
 *
 */
class OfferingContainer extends Component {

    /**
     * If the offeringArray given has any values (length > 0) then notAvailable is set to false and the offerings can be output, otherwise in the case of an empty array,
     * the component will just return "no offering information available" as seen in the render method.
     */
    constructor(props) {
        super(props);


        let notAvailable = true;
        let offeringArray = this.props.offeringArray;

        if(offeringArray && offeringArray.length >= 1 && offeringArray[0].location !== "Not Offered in 2017") {
            notAvailable = false;
        }

        this.state = {
            offeringArray: offeringArray,
            notAvailable: notAvailable
        };
    }

    /**
     * If the data is not available it renders a message indicating as much, otherwise it maps through the data and renders it.
     */
    render() {
        
        let keyval = 0;
        if (this.state.notAvailable) {
            return (
                <p><i><b>No unit offering information is currently available.</b><br />
                This could be because either this unit has been discontinued or the unit is
                not offered in 2017.
                </i></p>
            );
        } else {
            return (
                <div>
                {this.state.offeringArray.map(item => {
                    return (<p key={keyval++}><Icon name="pin" /><b>{item.location}</b>{": " }<Icon name="time" />{item.time.join(", ")}</p>);
                })}
                </div>
            );
        }
    }
}

OfferingContainer.propTypes = {
    offeringArray: PropTypes.array
};

export default OfferingContainer;

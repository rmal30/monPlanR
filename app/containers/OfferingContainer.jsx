import React, { Component, PropTypes } from "react";

/**
 * Offering container returns the formatted unit offering/location data
 * 
 * @author JXNS
 * 
 * @param {array} offeringArray - a multidimensional array of values of the form [[[Location1], [offering1, offering2, ...], [Location2], [offering1, offering2, ...]]] etc
 * 
 */
export default class OfferingContainer extends Component {

    /**
     * If the offeringArray given has any values (length > 0) then notAvailable is set to false and the offerings can be output, otherwise in the case of an empty array,
     * the component will just return "no offering information available" as seen in the render method.
     */
    constructor(props) {
        super(props);
        
        
        let notAvailable = true;
        let offeringArray = this.props.offeringArray;

        if(offeringArray && typeof offeringArray !== "string" && offeringArray.length > 0) {
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

        if (this.state.notAvailable) {
            return (
                <p>No offering information available</p>
            );
        } else {
            return (
                <div>
                {this.state.offeringArray.map(function(item){
                    return (<p key={item}><b>{item[0]}</b>{": " + item[1].map(function(offering) {
                        return (offering + " ");
                    })}</p>);
                })}
                </div>
            );
        }
    }
}

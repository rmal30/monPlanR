import React, { Component, PropTypes } from "react";

/**
 * Description
 * 
 * @author JXNS
 * 
 * @param {type} var - blah
 */
export default class OfferingContainer extends Component {

    /**
     * 
     */
    constructor(props) {
        super(props);
        this.state = {
            offeringArray: this.props.offeringArray,
            notAvailable: false
        };
    }

    /**
     * Render description
     */
    render() {
        return (
            <p>Hello world</p>
        );
    }
}

OfferingContainer.propTypes = {
    
};
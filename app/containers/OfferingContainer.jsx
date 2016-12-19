import React, { Component, PropTypes } from "react";

/**
 * Description
 * 
 * @author JXNS
 * 
 * @param {type} var - blah
 */

const testData = [[['Clayton'], ['First semester 2017 (Day)', 'Second semester 2017 (Day)']], [['Malaysia'], ['First semester 2017 (Day)']], [['South Africa'], ['First semester 2017 (Day)']]];

export default class OfferingContainer extends Component {

    /**
     * 
     */
    constructor(props) {
        super(props);
        let notAvailable = false;

        if(testData.length > 0) {

        } else {
            notAvailable = true;
        }
        this.state = {
            offeringArray: testData,
            notAvailable: notAvailable
        };
    }

    /**
     * Render description
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
                    return (<p><b>{item[0]}</b>{": " + item[1].map(function(offering) {
                        return (offering)
                    })}</p>)
                })}
                </div>
            );
        }
    }
}

OfferingContainer.propTypes = {
    
};
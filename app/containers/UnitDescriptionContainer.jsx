import React, { Component, PropTypes } from 'react';

export default class UnitDescriptionContainer extends Component {

    constructor(props) {
        super(props);
        
        let maxLength = this.props.textLength;
        let fullText = this.props.fullText;
        let shortText = "";
        let remainingText = "";

        if (fullText.length > maxLength) {
            let textArr = fullText.split("");
            shortText = textArr.slice(0, maxLength);
            shortText = shortText.toString();
        }

        this.state = {
            fullText: fullText,
            shortText: text,
            remainingText: '',
            hide: this.props.hide
        };


    }

    render() {
        if (!(this.state.remainingText === "")) {
            if (this.state.hide) {
                return (
                    <p>{this.state.shortText}<a href="#">... Show more</a></p>
                );
            } else {
                return (
                    <p>{this.state.fullText}<a href="#">... Show less</a></p>
                );
            }
        } else {
            return (
                <p>{this.state.fullText}</p>
            );
        }
    }
}

UnitDescriptionContainer.propTypes = {
    textLength: PropTypes.number.isRequired,
    fullText: PropTypes.string.isRequired,
    hide: PropTypes.bool.isRequired
}

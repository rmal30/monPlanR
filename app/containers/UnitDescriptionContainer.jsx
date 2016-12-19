import React, { Component, PropTypes } from 'react';

export default class UnitDescriptionContainer extends Component {

    constructor(props) {
        super(props);
        
        let maxLength = this.props.textLength;
        let fullText = this.props.fullText;
        let shortText = "";
        let remainingText = "";

        console.log(maxLength);
        console.log(fullText.length);
        console.log(fullText.length > maxLength);
        if (fullText.length > maxLength) {
            console.log("hello")
            let textArr = fullText.split("");
            shortText = textArr.slice(0, maxLength);
            shortText = shortText.join("");
        }

        this.state = {
            fullText: fullText,
            shortText: shortText,
            remainingText: '',
            hide: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let newValue = !this.state.hide;
        this.setState({hide: newValue});
    }

    render() {
        if (!(this.state.shortText === "")) {
            if (this.state.hide) {
                return (
                    <p>{this.state.shortText}<a style={{cursor: 'pointer'}} onClick={this.handleClick}>... Show more</a></p>
                );
            } else {
                return (
                    <p>{this.state.fullText}<a style={{cursor: 'pointer'}} onClick={this.handleClick}> Show less</a></p>
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
}

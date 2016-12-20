import React, { Component, PropTypes } from "react";

/**
 * UnitDescriptionContainer is a container component that controls the hide/show more display of a
 * large text pargraph. It is designed to be reusabled, so once you feed it a limit character count and
 * a text it will manage its own state completely
 *
 * @author JXNS
 *
 * @param {number} textLength - the max length you want before it is cut off
 * @param {string} fullText - the full text that you want to have display limited
 */
export default class UnitDescriptionContainer extends Component {

    /**
     * Constructor calculates whether the text needs to be shortened, if it does the it saves the
     * shortened version of the text.
     */
    constructor(props) {
        super(props);

        let maxLength = this.props.textLength;
        let fullText = this.props.fullText;
        let shortText = "";

        if(!fullText || !fullText.trim()) {
            fullText = undefined;
        } else if (fullText.length > maxLength) {
            let textArr = fullText.split("");
            shortText = textArr.slice(0, maxLength);
            shortText = shortText.join("");
        }

        this.state = {
            fullText: fullText,
            shortText: shortText,
            remainingText: "",
            hide: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * This handles the clicking of the show more/less link
     */
    handleClick() {
        let newValue = !this.state.hide;
        this.setState({hide: newValue});
    }

    /**
     * Render is pretty straight forward. if the shortText string is not null (i.e. theres a reason to shorten it)
     * then it cycles through the hiding and showing of the full text based on the hide parameters
     */
    render() {
        if(!this.state.fullText) {
            return <p><i>No description provided.</i></p>;
        }
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
    fullText: PropTypes.string
};

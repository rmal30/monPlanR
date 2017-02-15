import React, { Component, PropTypes } from "react";

/**
 * This serves as the interpreter for the unique and frankly wacky way in which Monash stores it's 
 * course information strings. Tilde's represent new lines, plus signs represent list items and random 
 * numbers of equal signs greater than 2 represent headings.
 * '
 */
export default class CourseDescription extends Component {
    
    /**
     * We first process the data then pass it into the state
     */
    constructor(props) {
        super(props);
        let processedDescription = this.processData(this.props.description);
        
        this.state = {
            description: processedDescription,
            showingMore: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }


    /**
     * The 'parser' for the data, it iterates through the string, first seperating into 
     * paragraphs based where the newlines are (represented by ~)
     * It then iterates through each character to interpret the types of elements they should render 
     * as. 
     */
    processData(inputString){
        let keyID = 0;
        let paragraphArray = inputString.split(". ~");
        let description = [];
        for(let i=0; i < paragraphArray.length; i++){
            let para = paragraphArray[i];
            let paraArr = para.split("");
            let equalsCount = 0;
            let currentStr = "";
            let array = false;
            let potentialArrayEnd = false;
            let allEquals = false;
            let arrayVal = [];
            for(let j=0; j < paraArr.length; j++){
                let char = paraArr[j];
                if (char === "=") {
                    if(!allEquals) {
                        equalsCount += 1;
                    }
                    if(equalsCount === 2){
                        description.push(["p", currentStr.replace("~", " ")]);
                        currentStr = "";
                        allEquals = true;
                    } else if (equalsCount === 4) {
                        description.push(["h", currentStr.replace("~", " ")]);
                        currentStr = "";
                        equalsCount = 0;
                        allEquals = true;
                    }
                } else if (char === "+") {
                    potentialArrayEnd = false;
                    description.push(["p", currentStr.replace("~", " ")]);
                    currentStr = "";
                    array = true;
                } else if (array && char === "~") {
                    arrayVal.push(currentStr.replace("~", " "));
                    currentStr = "";
                    potentialArrayEnd = true;
                } else if (array && potentialArrayEnd && char !== " " && char !== "+") {
                    description.push(["a", arrayVal]);
                    potentialArrayEnd = false;
                    array = false;
                    currentStr = "";
                    arrayVal = [];
                } else {
                    currentStr += char;
                }
                if (char !== "=" && allEquals){
                    allEquals = false;
                }
            }
            if(currentStr !== "") {
                description.push(["p", currentStr.replace("~", " ")]);
            }
        }

        description = description.map((item) => {
            if(item[0] === "p"){
                let para = item[1].replace("~", " ");
                return <p key={keyID++}>{para}</p>;
            } else if (item[0] === "h"){
                return <h5 key={keyID++}>{item[1].replace("~", " ")}</h5>;
            } else if(item[0] === "a"){
                let list = item[1].map(item => {return <li key={keyID++}>{item.replace("~", " ")}</li>;});
                return <ul key={keyID++}>{list}</ul>;
            } else {
                return <h5 key={keyID++}>Error displaying some data...</h5>;
            }
        });
        
        return description;
    }

    /**
     * Shows more or less based on state
     */
    handleClick() {
        let newValue = !this.state.showingMore;
        this.setState({showingMore: newValue});
    }
    

    /**
     * We don't want to show too much information by default, as the course information writings can be quite 
     * long. So insteadd we render a show more/less link below the text to let the user decide. If the number of paragraphs
     * is under a certain number, we don't bother with the show more/less link as it would render no change in text length'
     */
    render() {
        const { showingMore, description } = this.state;
        let less = description[0];
        if (description.length && description.length > 3) {
            less = description.slice(0,3);
        }
        if (showingMore) {
            return (
                <div>
                    {description}
                    <a style={{cursor: "pointer"}} onClick={this.handleClick}>Show less</a>
                </div>
            );
        } else {
            return (
                <div>
                    {less}
                    {description.length >= 3 && <a style={{cursor: "pointer"}} onClick={this.handleClick}>Show more</a>}
                </div>
            );
        }
    }

}

CourseDescription.propTypes = {
    description: PropTypes.string
};
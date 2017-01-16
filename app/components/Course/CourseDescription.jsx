import React, { Component } from "react";

export default class CourseDescription extends Component {
    
    constructor(props) {
        super(props);
        let processedDescription = this.processData(this.props.description);
        
        this.state = {
            description: processedDescription,
            showingMore: false,
        }

        this.handleClick = this.handleClick.bind(this);
    }


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
                    arrayVal.push(currentStr.replace("~", " "))
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
                description.push(["p", currentStr.replace("~", " ")])
            };
        }

        description = description.map((item, index) => {
            if(item[0] === "p"){
                let para = item[1].replace("~", " ")
                return <p key={keyID++}>{para}</p>
            } else if (item[0] === "h"){
                return <h5 key={keyID++}>{item[1].replace("~", " ")}</h5>
            } else if(item[0] === "a"){
                let list = item[1].map(item => {return <li key={keyID++}>{item.replace("~", " ")}</li>});
                return <ul key={keyID++}>{list}</ul>
            } else {
                return <h5 key={keyID++}>Error displaying some data...</h5>
            }
        });
        
      return description;
    }

    handleClick() {
        let newValue = !this.state.showingMore;
        this.setState({showingMore: newValue});
    }
    

    render() {
        const { showingMore, description } = this.state;
        let less = description[0];
        if (description.length && description.length > 15) {
            less = description.slice(0,15);
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
                    <a style={{cursor: "pointer"}} onClick={this.handleClick}>Show more</a>
                </div>
            );
            }
        }

    }
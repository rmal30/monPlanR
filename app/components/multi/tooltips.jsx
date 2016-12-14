import React, { Component } from "react";
import {Popup, Button} from "semantic-ui-react";

class Tooltips extends Component {
  constructor(props) {
      super(props);

      this.title = "" ;
      this.message = "" ;

  }

  static generate(title, message, direction, target){
      if(direction === null || direction === ""){
          direction = "bottom left";
      }
      if(title !== "" && message !== ""){
          return (
            <Popup
             header = {title}
             trigger = {target}
             content = {message}
             positioning = {direction}
           />
          );
      } else {
        return null;
      }
  }

  render(){
      return (this.tooltips("test","hello",
        <Button icon='add' />));
  }
}

export default Tooltips;

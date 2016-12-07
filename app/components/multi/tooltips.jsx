import React, { Component } from "react";
import {Popup, Button} from "semantic-ui-react";

class Tooltips extends Component {
  constructor() {
      super();

      this.title = "" ;
      this.message = "" ;

  }

  tooltips(title, message, target){
      if(title !== "" && message !== ""){
          return (
            <Popup
             header = {title}
             trigger = {target}
             content = {message}
           />
          );
      }
  }

  render(){
      return (this.tooltips("test","hello",
        <Button icon='add' />));
  }
}

export default Tooltips

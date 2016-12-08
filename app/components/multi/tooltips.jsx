import React, { Component } from "react";
import {Popup, Button} from "semantic-ui-react";
import SettingsModal from "../modals/settings.jsx";

class Tooltips extends Component {
  constructor(props) {
      super(props);

      this.title = "" ;
      this.message = "" ;

  }

  tooltips(title, message, target){
      if(title !== "" && message !== "" && prefs.getTooltipsPrefs()){
          return (
            <Popup
             header = {title}
             trigger = {target}
             content = {message}
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

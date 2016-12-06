import React from "react";

class Footer extends React.Component {
    render () {
        return (
            <div className="ui inverted fixed bottom vertical footer stackable segment">
            <div className="ui center aligned container">
                    <h4 className="ui inverted header">monPlan</h4>
                    <p>A Monash University Course Planner, designed by Monash Students, for Monash Students.</p>
                    <p>Copyright &copy; Monash University 2016</p>
                    <img className="logo" src="resources/img/monash.png" alt="logo" />
                </div>
            </div>
        );
    }
}

export default Footer;

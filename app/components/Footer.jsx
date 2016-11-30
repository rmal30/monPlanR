import React from 'react'

class Footer extends React.Component {
    render () {
        return (
            <div className="ui inverted fixed bottom vertical footer stackable segment">
                <div className="ui center aligned container">
                    <h4 className="ui inverted header">monPlan</h4>
                    <p>A Monash University Course Planner, designed by Monash Students, for Monash Students.</p>
                    <p>This project is licensed under <strong>the MIT License</strong> by monPlan</p>
                    <p>Copyright &copy; monPlan 2016 | Copyright &copy; Monash University 2016</p>
                </div>
            </div>
        )
    }
}

export default Footer

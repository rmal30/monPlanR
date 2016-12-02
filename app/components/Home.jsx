import React from 'react'

function Home(props) {
    return (
        <div className="ui main text container">
        <div id="welcome" className="ui container">
            <h1>Welcome to monPlan!</h1>
            <p>monPlan allows you to plan your course structure whilst you are at
                Monash University. We know that choosing units isn't particularly easy, so we've
                designed a web app that you can use to simplify tasks.</p>
                <p>Please enter your commencement and graduation year to get started.</p>
                <div className="row">
                    <form onSubmit="return false;" className="ui large form">
                        <div className="ui raised segment">
                            <div className="field">
                                <div className="ui labeled input">
                                    <div className="ui label">Commencement Year:</div>
                                    <input id="startYr" type="text" placeholder="2016" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui labeled input">
                                    <div className="ui label">Graduation Year:</div>
                                    <input id="gradYr" type="text" placeholder="2018" />
                                </div>
                            </div>
                            <button id="startPlanning" className="ui green button">Start Planning <i className="right arrow icon"></i></button>
                            <button id="startPlanningEmpty" className="ui button">Start with empty template</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home

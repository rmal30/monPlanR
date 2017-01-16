import React, { Component } from "react";
import CourseInfo from "../components/Course/CourseInfo.jsx";
import UnitQuery from "../utils/UnitQuery";

const testData = {
    courseCode: "E3003",
    courseName: "Bachelor of Engineering (Honours) and Bachelor of Commerce Specialist",
    faculty: "Faculty of Engineering",
    creditPoints: 144,
    abrTitle: "BE(Hons)/BComSpec",
    durationStr: "5 years FT, 10 years PT Students have a maximum of 10 years to complete this course.",
    modeAndLocation: "On-campus (Clayton)",
    awards: [
        "Bachelor of Actuarial Science",
        "Bachelor of Aerospace Engineering (Honours)",
        "Bachelor of Chemical Engineering (Honours)",
        "Bachelor of Civil Engineering (Honours)",
        "Bachelor of Economics",
        "Bachelor of Electrical and Computer Systems Engineering (Honours)",
        "Bachelor of Environmental Engineering (Honours)",
        "Bachelor of Finance",
        "Bachelor of Materials Engineering (Honours)",
        "Bachelor of Mechanical Engineering (Honours)",
        "Bachelor of Mechatronics Engineering (Honours)",
        "Bachelor of Software Engineering (Honours)",
        "The engineering and commerce specialist awards conferred depends on the specialisations completed."
    ],
    description: "Partner one of our specialist degrees in actuarial science, economics or finance with your choice from nine engineering specialisations to open up exciting career opportunities that may not be available to graduates in engineering or commerce alone. Perhaps after some years as an aeronautical engineer your future will be as a finance director for the major company designing the next generation of flight vehicles. Perhaps you will draw on strategic planning know how of actuarial science to contribute to the fortunes of a small start up. The possibilities are there - and yours for the making. Your blend of technical and analytical skills, along with an understanding of the business world, will give you a competitive edge in the job market. Career options include commerce, industry, government or private practice. You might work in in the aviation industry or in environmental management."
};

/**
 * 
 */
export default class CourseInfoContainer extends Component {

    /**
     * 
     */
    constructor(props) {
        super(props);
        this.state = {
            courseCode: this.props.courseCode,
            courseName: "",
            faculty: "",
            creditPoints: 0,
            abrTitle: "",
            durationStr: "",
            modeAndLocation: "",
            awards: "",
            courseDescription: "",
            isLoading: true
        };
    }

    componentDidMount() {
        UnitQuery.getCourseInfo(this.props.courseCode)
            .then(response => {
                let data = response.data;
                this.setState({
                    courseCode: data.courseCode,
                    courseName: data.courseName,
                    faculty: data.mangFac,
                    creditPoints: data.creditPoints,
                    abrTitle: data.abrevTitle,
                    durationStr: data.courseDuration,
                    modeAndLocation: data.modeLoc,
                    awards: "",
                    courseDescription: data.courseDescrip,
                    isLoading: false
                });
            })
            .catch(error => {
                console.log("Error loading data for course: " + this.props.courseCode);
            });
    }

    /**
     * 
     */
    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>
        } else {
            return <CourseInfo {...this.state} />
        }
    }
}
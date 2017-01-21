import { connect } from "react-redux";
import CourseStatisticGroup from "../components/Course/CourseStatisticGroup.jsx";

const mapStateToProps = (state) => {
    return {
        cost: state.Counter.cost,
        creditPoints: state.Counter.creditPoints
    };
};


const CourseStatisticGroupWrapper = connect(mapStateToProps)(CourseStatisticGroup);
export default CourseStatisticGroupWrapper;
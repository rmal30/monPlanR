import { connect } from "react-redux";
import CourseStatisticGroup from "../components/Course/CourseStatisticGroup.jsx";

/**
 * Course statistic group just needs the cost and credit points from the state
 */
const mapStateToProps = (state) => {
    return {
        cost: state.Counter.cost,
        creditPoints: state.Counter.creditPoints
    };
};

const CourseStatisticGroupContainer = connect(mapStateToProps)(CourseStatisticGroup);
export default CourseStatisticGroupContainer;
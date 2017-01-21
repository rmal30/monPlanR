import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as courseActions from "../../actions/CourseActions";
import * as counterActions from "../../actions/CounterActions";
import Main from "./Main.jsx";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
// import TouchBackend from "react-dnd-touch-backend";

const mapStateToProps = (state) => {
    return {
        course: state.Course,
        counter: state.Counter
    };
};

// Can feed it as many actions as needed
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(courseActions, counterActions, dispatch);
};


const App = DragDropContext(HTML5Backend)(Main);
export default connect(mapStateToProps, mapDispatchToProps)(App);



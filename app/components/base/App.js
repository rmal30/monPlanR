import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as courseActions from "../../actions/CourseActions";
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(courseActions, dispatch);
};


const App = DragDropContext(HTML5Backend)(Main);
export default connect(mapStateToProps, mapDispatchToProps)(App);



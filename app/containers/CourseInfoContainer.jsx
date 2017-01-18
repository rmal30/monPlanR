import React, { Component, PropTypes } from "react";
import CourseInfo from "../components/Course/CourseInfo.jsx";
import UnitQuery from "../utils/UnitQuery";

import { Dimmer, Header, Icon, Loader, Segment } from "semantic-ui-react";

/**
 * Handles data fetching for course information.
 */
class CourseInfoContainer extends Component {

    /**
     * Set relevant initial state properties
     */
    constructor(props) {
        super(props);
        this.state = {
            courseName: "",
            faculty: "",
            creditPoints: 0,
            abrTitle: "",
            durationStr: "",
            modeAndLocation: "",
            awards: "",
            courseDescription: "",
            isLoading: true,
            isError: false
        };
    }

    /**
     * Fetch data when component is mounted.
     */
    componentDidMount() {
        this.fetchData(this.props.courseCode);
    }

    /**
     * When updating course code, fetch new data for the course associated to
     * the course code.
     */
    componentWillReceiveProps(nextProps) {
        if(nextProps.courseCode !== this.props.courseCode) {
            this.fetchData(nextProps.courseCode);
        }
    }

    /**
     * Performs fetching for course data, and updates UI to display status
     * to the user.
     */
    fetchData(courseCode) {
        this.setState({
            courseName: "",
            faculty: "",
            creditPoints: 0,
            abrTitle: "",
            durationStr: "",
            modeAndLocation: "",
            awards: "",
            courseDescription: "",
            isLoading: true,
            isError: false
        });

        UnitQuery.getCourseInfo(courseCode)
            .then(response => {
                let data = response.data;

                this.setState({
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
            .catch(() => {
                this.setState({
                    isLoading: false,
                    isError: true
                });
            });
    }

    /**
     * There are three states the component can be in. If data is being fetched,
     * then it is in a loading state where it renders a loading icon. If there
     * was any errors fetching the data, then it would render a generic "check
     * your connection" error message along with an error icon. otherwise it
     * will render the populated course info component.
     */
    render() {
        if (this.state.isLoading) {
            if(this.props.modal) {
                return <Segment textAlign="center"><Header as="h1">Loading...</Header></Segment>;
            } else {
                return (
                    <Dimmer active inverted>
                        <Loader size="massive" inverted>Loading...</Loader>
                    </Dimmer>
                );
            }
        } else if(this.state.isError) {
            if(this.props.modal) {
                return (
                    <Segment textAlign="center">
                        <Header as="h1" icon>
                            <Icon color="red" name="warning circle" />
                            Failed to load course
                            <Header.Subheader>
                                Please check your connection and try again.
                            </Header.Subheader>
                        </Header>
                    </Segment>
                );
            } else {
                return (
                    <Dimmer active inverted>
                        <Header as="h1" icon>
                            <Icon color="red" name="warning circle" />
                            Failed to load course
                            <Header.Subheader>
                                Please check your connection and try again.
                            </Header.Subheader>
                        </Header>
                    </Dimmer>
                );
            }

        } else {
            return <CourseInfo {...this.state} courseCode={this.props.courseCode} />;
        }
    }
}

CourseInfoContainer.propTypes = {
    courseCode: PropTypes.string,
    modal: PropTypes.bool
};

export default CourseInfoContainer;

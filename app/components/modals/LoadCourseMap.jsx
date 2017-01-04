import React, { Component, PropTypes } from "react";
import { Button, Icon, Input, Modal, Search } from "semantic-ui-react";

import FuzzySearch from "../../utils/FuzzySearch";
import UnitQuery from "../../utils/UnitQuery";

/**
* A modal used specifically for students who wish to clear their course.
*/
class LoadCourseMap extends Component {
    /**
     * Holds states
     * courseCode - the Code to Be Found.
     */
    constructor() {
        super();
        this.state = {
            CourseCode: "",
            data: {},
            isLoading: false,
            results: [],
            value: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleLoadCourse = this.handleLoadCourse.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        UnitQuery.getCourses()
            .then(response => {
                let data = response.data;
                this.setState({data: data});
            })
            .catch(err => {
                console.error(err)
            })
    }
    /**
     * Opens the modal
     */
    handleOpen() {
        this.setState({
            modalOpen: true
        });
    }

    /**
     * Closes the modal
     */
    handleCancel() {
        this.setState({
            CourseCode: "",
            value: "",
            modalOpen: false,
            disabled: true
        });
    }

    handleLoadCourse() {
        this.props.onCourseLoad(this.state.CourseCode);
        this.setState({
            CourseCode: "",
            value: "",
            modalOpen: false,
            disabled: true
        });

    }

    /**
     * Clears the course and then closes the modal.
     */
    handleClick() {
        this.handleClose();
    }

    handleResultSelect(e, value) {
        this.setState({
            value: value.title,
            CourseCode: value.title
        });
    }

    handleChange(e){
        let results = FuzzySearch.search(e.target.value, this.state.data, 5, ["courseCode", "courseName"]).map(current => {return current.item})
        
        results = results.map(item => {
            return {title: item.courseCode, description: item.courseName + " - " + item.courseType}
        })

        this.setState({
            value: e.target.value,
            results: results
        });
    }

    /** 
     * Returns a Modal asking the user if they really want to clear their course
     * plan.
     *
     * @returns {ReactElement} Modal
     */
    render() {
        return (
            <Modal trigger={<Button className="no-print" color="green" onClick={this.handleOpen.bind(this)}>Load Course Map</Button>}
                open={this.state.modalOpen}
                onClose={this.handleCancel}>
                <Modal.Header>
                    <Icon name="external square" /> Load Course Map
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>To load a course map, enter your course name and it will automatically load up a template for you</p>
                    <Search
                        loading={this.state.isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.handleChange}
                        results={this.state.results}
                        value={this.state.value}
                        placeholder="Search for your course"
                        {...this.props}
                    />
                    </Modal.Description>
                </Modal.Content>

                <Modal.Actions>
                    {this.state.CourseCode === "" ? <Button disabled color="green">Load Course Map</Button> : <Button onClick={this.handleLoadCourse} color="green">Load {this.state.CourseCode} Map</Button>}
                    <Button onClick={this.handleCancel}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

LoadCourseMap.propTypes = {
    CourseCode: PropTypes.func
};

export default LoadCourseMap;

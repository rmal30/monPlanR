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
            CourseCode: null,
            data: {},
            isLoading: false,
            results: [],
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
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
    handleClose() {
        this.setState({
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
        this.setState({value: value.title})
    }

    handleChange(e){
        let results = FuzzySearch.searchCourses(e.target.value, this.state.data).map(current => {return current.item})
        
        results = results.map(item => {
            return {title: item.courseCode, description: item.courseName}
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
                onClose={this.handleClose.bind(this)}>
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
                    <Button color="green">Go</Button>
                    <Button onClick={this.handleClose.bind(this)}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

LoadCourseMap.propTypes = {
    CourseCode: PropTypes.func
};

export default LoadCourseMap;

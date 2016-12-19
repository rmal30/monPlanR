import React, { Component, PropTypes } from "react";
import { Button, Container, Dropdown, Header, Icon, Message, Popup, Table } from "semantic-ui-react";
import axios from "axios";
import MediaQuery from "react-responsive";

import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Home from "./base/Home.jsx";

import TeachingPeriod from "./TeachingPeriod/TeachingPeriod.jsx";
import InsertTeachingPeriod from "./TeachingPeriod/InsertTeachingPeriod.jsx";
import CompletedCourseModal from "./modals/CompletedCourseModal.jsx";
import DeleteCourseModal from "./modals/DeleteCourseModal.jsx";

/**
 * CourseStructure holds a table that allows students to plan their courses by
 * adding, moving and deleting units. It also holds action and status components
 * to give students feedback and ability to change the course structure.
 *
 * @extends React.Component
 * @param {number} startYear - The year the student commerces their course.
 * @param {number} endYear - The expected graduation year.
 */
class CourseStructure extends Component {

    /**
     * Initialises state that holds a list of teachingPeriods.
     *
     * @param props - React props
     */
    constructor(props) {
        super(props);

        const { startYear, endYear } = this.props;

        this.minNumberOfUnits = 4;
        this.maxNumberOfUnits = 6;

        this.state = {
            numberOfUnits: 4,
            showInsertTeachingPeriods: false,
            teachingPeriods: this.generateCourse(startYear, endYear),
            teachingPeriodsData: null,
            showMoveUnitUI: false,
            unitToBeMoved: undefined,
            totalCreditPoints: 0,
            totalEstimatedCost: 0
        };

        // Fetch common teaching periods to get names for each teaching period code.
        axios.get("/data/teachingPeriods/common.json")
             .then(response => {
                 /**
                  * Compares start teaching period date between two teaching periods.
                  *
                  * @param {object} a - The first teaching period.
                  * @param {object} b - The second teaching period.
                  * Grabbing the common teaching periods and sorting
                  */
                 function compareDate(a, b) {
                     return Math.sign(new Date(...a.split("/").reverse()) - new Date(...b.split("/").reverse()));
                 }

                 response.data.sort(
                     (a, b) => compareDate(a.startDate, b.startDate) !== 0 ? compareDate(a.startDate, b.startDate) : compareDate(b.endDate, a.endDate)
                 );

                 this.setState({
                     teachingPeriodsData: response.data
                 });
             });

        this.generateCourse = this.generateCourse.bind(this);
    }

    /**
     * Generates a course structure of semester one and semester two teaching
     * periods, given start year and end year.
     *
     * @author Eric Jiang, Saurabh Joshi
     * @param {number} startYear - When the student commerces their course.
     * @param {number} endYear - When the student is expected to graduate.
     */
    generateCourse(startYear, endYear) {
        if(endYear - startYear > 12 || startYear === null || endYear === null) {
            // Assumes a four year course beginning this year.
            startYear = new Date().getFullYear();
            endYear = startYear + 3;
        }

        if(startYear <= endYear) { // Prevents from going into an endless for loop
            const arr = [];
            for(let year = startYear; year <= endYear; year++) {
                const semesterOneTeachingPeriod = {
                    year,
                    code: "S1-01",
                    units: new Array(this.state.numberOfUnits).fill(null)
                };

                const semesterTwoTeachingPeriod = {
                    year,
                    code: "S2-01",
                    units: new Array(this.state.numberOfUnits).fill(null)
                };

                arr.push(semesterOneTeachingPeriod);
                arr.push(semesterTwoTeachingPeriod);
            }

            return arr;
        }

        return [];
    }

    /**
     * Saves list of teaching periods to local storage.
     *
     * @author Saurabh Joshi
     */
    saveCourse() {
        const { teachingPeriods, numberOfUnits } = this.state;
        localStorage.setItem("courseStructure", JSON.stringify({
            teachingPeriods,
            numberOfUnits
        }));
    }

    /**
     * Loads list of teaching periods from local storage.
     *
     * @author Saurabh Joshi
     */
    loadCourse() {
        const stringifedJSON = localStorage.getItem("courseStructure");
        if(stringifedJSON) {
            const { teachingPeriods, numberOfUnits } = JSON.parse(stringifedJSON);
            this.setState({
                teachingPeriods,
                numberOfUnits
            });
        }
    }

    /**
     * Clears course on call.
     *
     * @author Saurabh Joshi
     */
    deleteCourse() {
        this.setState({
            teachingPeriods: [],
            numberOfUnits: 4
        });

    }

    /**
     * Loads course if it exists.
     *
     * @author Saurabh Joshi
     */
    componentWillMount() {
        if(Home.checkIfCourseStructureIsInLocalStorage()) {
            this.loadCourse();
        }
    }

    /**
     * Set to auto save when the state of the component changes.
     *
     * @author Saurabh Joshi
     */
    componentDidUpdate() {
        this.saveCourse();
    }

    /**
     * Displays add teaching period buttons in between the teaching period
     * table rows.
     *
     * @author Saurabh Joshi
     * @param {string} teachingPeriodToInsertCode - what teaching period are we
     * inserting
     */
    showInsertTeachingPeriodsUI(teachingPeriodToInsertCode) {
        this.setState({
            showInsertTeachingPeriods: true,
            teachingPeriodToInsertCode
        });
    }

    /**
     * Hides the add teaching period buttons in between the teaching period
     * table rows.
     *
     * @author Saurabh Joshi
     */
    hideInsertTeachingPeriodsUI() {
        this.setState({
            showInsertTeachingPeriods: false
        });
    }

    /**
     * Inserts teaching period at a specified index.
     *
     * @author Saurabh Joshi
     * @param {number} index - Which index in array to insert the teaching period
     * @param {number} year - Year of teaching period that was taken place
     * @param {string} code - Teaching period code.
     */
    insertTeachingPeriod(index, year, code) {
        const teachingPeriods = [
            ...this.state.teachingPeriods.slice(0, index),
            {
                code,
                year,
                units: new Array(this.state.numberOfUnits).fill(null)
            },
            ...this.state.teachingPeriods.slice(index)
        ];

        this.setState({
            showInsertTeachingPeriods: false,
            teachingPeriods
        });
    }

    /**
     * A quick option for students to insert semesters at the end of their
     * course structures.
     *
     * @author Saurabh Joshi
     */
    appendSemester() {
        const index = this.state.teachingPeriods.length;
        let year = new Date().getFullYear();
        let s1Code = "S1-01";
        let s2Code = "S2-01";

        let code = s1Code;

        const { teachingPeriods, teachingPeriodsData } = this.state;

        if(!teachingPeriodsData) {
            return;
        }

        if(index > 0) {
            const startIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[index - 1].code);
            const s1middleIndex = teachingPeriodsData.findIndex(ele => ele.code === s1Code);
            const s2middleIndex = teachingPeriodsData.findIndex(ele => ele.code === s2Code);

            year = teachingPeriods[index - 1].year;

            if(startIndex < s1middleIndex) {
                // do nothing
            } else if(startIndex < s2middleIndex) {
                code = s2Code;
            } else if(startIndex >= s1middleIndex) {
                year ++;
            }
        }

        this.insertTeachingPeriod(index, year, code);
    }

    /**
     * Gets the quick semester append string to be displayed on the button.
     *
     * @author Saurabh Joshi
     */
    getQuickSemesterString() {
        const index = this.state.teachingPeriods.length;
        let year = new Date().getFullYear();
        let s1Code = "S1-01";
        let s2Code = "S2-01";

        let code = s1Code;

        const { teachingPeriods, teachingPeriodsData } = this.state;

        if(!teachingPeriodsData) {
            return;
        }

        if(index > 0) {
            const startIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[index - 1].code);
            const s1middleIndex = teachingPeriodsData.findIndex(ele => ele.code === s1Code);
            const s2middleIndex = teachingPeriodsData.findIndex(ele => ele.code === s2Code);

            year = teachingPeriods[index - 1].year;

            if(startIndex < s1middleIndex) {
                // do nothing
            } else if(startIndex < s2middleIndex) {
                code = s2Code;
            } else if(startIndex >= s1middleIndex) {
                year ++;
            }
        }

        let teachingPeriodName = code;

        if(teachingPeriodsData) {
            const teachingPeriod = teachingPeriodsData.find((element) =>
                element.code === code
            );

            if(teachingPeriod !== undefined) {
                teachingPeriodName = teachingPeriod.name || code;
            }
        }

        return `${teachingPeriodName}, ${year}`;
    }

    /**
     * Inserts unit into course structure.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriodIndex
     * @param {number} unitIndex
     * @param {string} code
     * @param {string} name
     */
    addUnit(teachingPeriodIndex, unitIndex, unitToAdd) {
        const { teachingPeriods } = this.state;
        teachingPeriods[teachingPeriodIndex].units[unitIndex] = unitToAdd;
        this.setState({ teachingPeriods });
        this.props.doneAddingToCourse();
    }

    /**
     * Allows user to move unit into another table cell.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriodIndex
     * @param {number} unitIndex
     */
    willMoveUnit(teachingPeriodIndex, unitIndex) {
        this.setState({
            showMoveUnitUI: true,
            originalPosition: [teachingPeriodIndex, unitIndex],
            unitToBeMoved: this.state.teachingPeriods[teachingPeriodIndex].units[unitIndex]
        });
    }

    /**
     * Cancels the move unit operation.
     *
     * @author Saurabh Joshi
     */
    cancelMoving() {
        this.setState({
            showMoveUnitUI: false,
            originalPosition: undefined,
            unitToBeMoved: undefined
        });
    }

    /**
     * Moves unit to specified position.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriodIndex
     * @param {number} unitIndex
     */
    moveUnit(teachingPeriodIndex, unitIndex) {
        const { teachingPeriods } = this.state;
        teachingPeriods[this.state.originalPosition[0]].units[this.state.originalPosition[1]] = undefined;
        teachingPeriods[teachingPeriodIndex].units[unitIndex] = this.state.unitToBeMoved;
        this.setState({
            showMoveUnitUI: false,
            originalPosition: undefined,
            teachingPeriods: teachingPeriods
        });
    }

    /**
     * Swaps units over according to their positions. This method is used
     * when the student wants to move their unit to another position where the
     * table cell is occupied by another unit.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriodIndex
     * @param {number} unitIndex
     */
    swapUnit(teachingPeriodIndex, unitIndex) {
        const { teachingPeriods } = this.state;
        const temp = teachingPeriods[teachingPeriodIndex].units[unitIndex];
        teachingPeriods[teachingPeriodIndex].units[unitIndex] = teachingPeriods[this.state.originalPosition[0]].units[this.state.originalPosition[1]];
        teachingPeriods[this.state.originalPosition[0]].units[this.state.originalPosition[1]] = temp;
        this.setState({
            showMoveUnitUI: false,
            originalPosition: undefined,
            teachingPeriods: teachingPeriods
        });
    }

    /**
     * Deletes a teaching period at a specified index.
     *
     * @author Saurabh Joshi
     * @param {number} index - Which teaching period in list to delete.
     */
    deleteTeachingPeriod(index) {
        const teachingPeriods = [
            ...this.state.teachingPeriods.slice(0, index),
            ...this.state.teachingPeriods.slice(index + 1)
        ];

        this.setState({ teachingPeriods });
    }

    /**
     * Deletes a unit at a specified teaching period index and specified unit
     * index. This is done by setting the array element to undefined.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriodIndex - Which teaching period are you referring to.
     * @param {number} unitIndex - Which unit in teaching period to remove.
     */
    deleteUnit(teachingPeriodIndex, unitIndex) {
        const { teachingPeriods } = this.state;
        teachingPeriods[teachingPeriodIndex].units[unitIndex] = undefined;
        this.setState({ teachingPeriods });
    }

    /**
     * Adds a column to the course structure.
     */
    incrementNumberOfUnits() {
        const teachingPeriods = this.state.teachingPeriods.slice();

        if(this.state.numberOfUnits < this.maxNumberOfUnits) {
            for(let i = 0; i < teachingPeriods.length; i++) {
                teachingPeriods[i].units.push(null);
            }

            this.setState({
                numberOfUnits: this.state.numberOfUnits + 1,
                teachingPeriods
            });
        }
    }

    /**
     * Removes a column from the course structure.
     */
    decrementNumberOfUnits() {
        if(this.state.numberOfUnits > this.minNumberOfUnits) {
            const teachingPeriods = this.state.teachingPeriods.slice();

            for(let i = 0; i < teachingPeriods.length; i++) {
                teachingPeriods[i].units.pop();
            }

            this.setState({
                numberOfUnits: this.state.numberOfUnits - 1
            });
        }
    }

    /**
     * Returns a rendered teaching period component as a table row to be used in
     * a table.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriod - The teaching period object.
     * @param {number} index - For bookkeeping which teaching period is which.
     */
    renderTeachingPeriod(teachingPeriod, index) {
        return <TeachingPeriod
                    key={`${teachingPeriod.year}-${teachingPeriod.code}`}
                    index={index}
                    year={teachingPeriod.year}
                    code={teachingPeriod.code}
                    data={this.state.teachingPeriodsData}
                    numberOfUnits={this.state.numberOfUnits}
                    deleteTeachingPeriod={this.deleteTeachingPeriod.bind(this)}
                    addUnit={this.addUnit.bind(this)}
                    moveUnit={this.moveUnit.bind(this)}
                    swapUnit={this.swapUnit.bind(this)}
                    willMoveUnit={this.willMoveUnit.bind(this)}
                    deleteUnit={this.deleteUnit.bind(this)}
                    unitToAdd={this.props.unitToAdd}
                    showMoveUnitUI={this.state.showMoveUnitUI}
                    unitToBeMoved={this.state.unitToBeMoved}
                    units={teachingPeriod.units} />;
    }

    /**
     * Returns a table of teaching periods as table rows, and in teaching period
     * holds a list of units represented as table cells. It also renders an add button
     * as well as some status labels.
     *
     * TODO: Modularise into smaller components for course structure.
     *
     * @author Saurabh Joshi
     * @returns {ReactElement} CourseStructure
     */
    render() {
        const tableRows = [];
        let year, code, show = false;
        const { teachingPeriodToInsertCode, teachingPeriods, teachingPeriodsData, showInsertTeachingPeriods } = this.state;
        if(showInsertTeachingPeriods) {
            year = new Date().getFullYear();
            code = teachingPeriodToInsertCode;
        }

        for(let i = 0; i <= teachingPeriods.length; i++) {
            show = true;
            if(i !== 0) {
                tableRows.push(this.renderTeachingPeriod(teachingPeriods[i - 1], i - 1));
                year = teachingPeriods[i - 1].year;

                if(!showInsertTeachingPeriods) {
                    continue;
                }

                if(i !== teachingPeriods.length) {
                    const startIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[i - 1].code);
                    const middleIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriodToInsertCode);
                    const endIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[i].code);

                    if(startIndex !== -1 && endIndex !== -1) {
                        if(teachingPeriods[i - 1].year === teachingPeriods[i].year && startIndex < middleIndex && middleIndex < endIndex) {
                            year = teachingPeriods[i - 1].year;
                        }  else if(teachingPeriods[i - 1].year !== teachingPeriods[i].year) {
                            if(startIndex >= middleIndex && middleIndex >= endIndex) {
                                continue;
                            }
                            year = teachingPeriods[i - 1].year;

                            if(startIndex >= middleIndex) {
                                year ++;
                            }
                        } else {
                            continue;
                        }
                    }
                } else {
                    const startIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[i - 1].code);
                    const middleIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriodToInsertCode);

                    year = teachingPeriods[i - 1].year;

                    if(startIndex >= middleIndex) {
                        year ++;
                    }
                }
            } else if(showInsertTeachingPeriods && teachingPeriods.length > 0) {
                const middleIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriodToInsertCode);
                const endIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[i].code);

                year = teachingPeriods[i].year;

                if(middleIndex >= endIndex) {
                    year --;
                }
            } else if(showInsertTeachingPeriods && teachingPeriods.length === 0) {
                // don't do anything
            } else {
                continue;
            }

            if(showInsertTeachingPeriods && show) {
                tableRows.push(
                    <InsertTeachingPeriod index={i}
                                          key={`${i}-insertTeachingPeriod`}
                                          numberOfUnits={this.state.numberOfUnits}
                                          insertTeachingPeriod={this.insertTeachingPeriod.bind(this)}
                                          year={year}
                                          teachingPeriodType="Teaching Period"
                                          teachingPeriods={this.state.teachingPeriodsData}
                                          code={code} />
                );
            }
        }

        if(this.state.teachingPeriods.length === 0) {
            tableRows.push(
                <Table.Row key="no-teaching-period">
                    <Table.Cell colSpan={this.state.numberOfUnits + 1}>
                        <Header as="h3" icon textAlign="center">
                            <Icon name="calendar" />
                            No teaching periods
                            <Header.Subheader>
                                Click add semester button below to get started.
                            </Header.Subheader>
                        </Header>
                    </Table.Cell>
                </Table.Row>
            );
        }

        return (
            <Container>
                {!this.state.showMoveUnitUI && !this.props.unitToAdd &&
                    <Message className="no-print">
                        <Message.Header>
                            Ready to add units to course plan
                        </Message.Header>
                        <p>
                            Search for units in the above search bar, then place it in your course plan. Your course structure is automatically saved to your browser, so when you come back it will be exactly where you left off.
                        </p>
                    </Message>
                }
                {this.props.unitToAdd &&
                    <Message positive className="no-print">
                        <Button floated="right" onClick={this.props.doneAddingToCourse}>Cancel</Button>
                        <Message.Header>
                            Adding {this.props.unitToAdd.UnitCode}
                        </Message.Header>
                        <p>
                            Select a table cell in your course structure to insert {this.props.unitToAdd.UnitCode}.
                        </p>
                    </Message>
                }
                {this.state.showMoveUnitUI &&
                    <Message info className="no-print">
                        <Button floated="right" onClick={this.cancelMoving.bind(this)}>Cancel</Button>
                        <Message.Header>
                            Moving {this.state.unitToBeMoved.UnitCode}
                        </Message.Header>
                        <p>
                            Drop into a table cell in your course structure to move {this.state.unitToBeMoved.UnitCode}.
                            Dropping into a table cell where there is already an occupied unit will swap the units.
                        </p>
                    </Message>
                }
                <Table celled fixed striped compact>
                    <MediaQuery query="(min-device-width: 768px)">
                        <Table.Header>
                            <Table.Row textAlign="center">
                                <Table.HeaderCell>Teaching Period</Table.HeaderCell>
                                <Table.HeaderCell colSpan={this.state.numberOfUnits}>
                                    <Popup
                                        trigger={<Button className="no-print" disabled={this.state.numberOfUnits <= this.minNumberOfUnits}  onClick={this.decrementNumberOfUnits.bind(this)} color="red" floated="left">Remove column</Button>}
                                        content="Removes last column from your course plan."
                                        size='mini'
                                        positioning='bottom center'
                                        />
                                    Units
                                    <Popup
                                        trigger={<Button className="no-print" disabled={this.state.numberOfUnits >= this.maxNumberOfUnits} onClick={this.incrementNumberOfUnits.bind(this)} color="green" floated="right">Add column</Button>}
                                        content="Click this to overload a teaching period."
                                        size='mini'
                                        positioning='bottom center'
                                        />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                    </MediaQuery>
                    <Table.Body>
                        {tableRows}
                    </Table.Body>
                </Table>
                <MediaQuery maxDeviceWidth={767}>
                    {mobile =>
                        <Container>
                            {!this.state.showInsertTeachingPeriods &&
                            <Button.Group color="green" fluid={mobile} className={"no-print" + (mobile ? "" : " right floated")}>
                                <Button fluid={mobile} onClick={this.appendSemester.bind(this)}><Icon name="add square"/>Add {this.getQuickSemesterString()}</Button>
                                <Dropdown floating button className="icon">
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={this.showInsertTeachingPeriodsUI.bind(this, "S1-01")}>Insert Semester 1</Dropdown.Item>
                                        <Dropdown.Item onClick={this.showInsertTeachingPeriodsUI.bind(this, "S2-01")}>Insert Semester 2</Dropdown.Item>
                                        <Dropdown.Item onClick={this.showInsertTeachingPeriodsUI.bind(this, "SSA-02")}>Insert Summer Semester A</Dropdown.Item>
                                        <Dropdown.Item onClick={this.showInsertTeachingPeriodsUI.bind(this, "SSB-01")}>Insert Summer Semester B</Dropdown.Item>
                                        <Dropdown.Item onClick={this.showInsertTeachingPeriodsUI.bind(this, "WS-01")}>Insert Winter Semester</Dropdown.Item>
                                        <Dropdown.Item onClick={this.showInsertTeachingPeriodsUI.bind(this, "FY-01")}>Insert Full Year</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Button.Group>
                            }
                            {this.state.showInsertTeachingPeriods &&
                            <Button fluid={mobile} className="no-print" floated="right" onClick={this.hideInsertTeachingPeriodsUI.bind(this)}>Cancel</Button>
                            }
                            {mobile && <br /> && <br />}
                            <DeleteCourseModal fluid={mobile} deleteCourse={this.deleteCourse.bind(this)} />
                            {mobile && <br />}
                            <CompletedCourseModal trigger={<Button primary fluid={mobile} className="no-print">Complete course plan</Button>} />
                        </Container>
                    }
                </MediaQuery>
            </Container>
        );
    }
}

CourseStructure.propTypes = {
    startYear: PropTypes.number,
    endYear: PropTypes.number,
    unitToAdd: PropTypes.shape({
        UnitName: PropTypes.string,
        UnitCode: PropTypes.string,
        Faculty: PropTypes.string
    }),
    doneAddingToCourse: PropTypes.func
};

export default DragDropContext(HTML5Backend)(CourseStructure);

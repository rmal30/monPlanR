import React, { PropTypes } from "react";
import { Button, Dropdown, Icon } from "semantic-ui-react";

/**
 * Allows students to insert new teaching periods, by both quickly adding new
 * semesters, as well as giving the option to add other teaching periods such as
 * summer semesters.
 */
export default function InsertTeachingPeriodButton({ semesterString, insert, addSemester, mobile, noFloat, bottom }) {
    InsertTeachingPeriodButton.propTypes = {
        semesterString: PropTypes.string,
        insert: PropTypes.func.isRequired,
        addSemester: PropTypes.func.isRequired,
        mobile: PropTypes.bool,
        noFloat: PropTypes.bool,
        bottom: PropTypes.bool
    };


    if(semesterString === null) {
        semesterString = "Add Semester 1, 2016";
    }
    return (
        <Button.Group fluid={mobile} className={"no-print" + (mobile || noFloat ? "" : " right floated")}>
            <Button className="btnorange" onClick={addSemester}><Icon name="add square"/>Add {semesterString}</Button>
            <Dropdown floating button className="icon btnorange" icon={bottom ? "caret up" : "caret down"} label="Add Custom Semester">
                <Dropdown.Menu style={bottom ? {top: "auto", bottom: "120%"} : {}}>
                    <Dropdown.Item onClick={insert.bind(null, "S1-01")}>Insert Semester 1</Dropdown.Item>
                    <Dropdown.Item onClick={insert.bind(null, "S2-01")}>Insert Semester 2</Dropdown.Item>
                    <Dropdown.Item onClick={insert.bind(null, "SSA-02")}>Insert Summer Semester A</Dropdown.Item>
                    <Dropdown.Item onClick={insert.bind(null, "SSB-01")}>Insert Summer Semester B</Dropdown.Item>
                    <Dropdown.Item onClick={insert.bind(null, "WS-01")}>Insert Winter Semester</Dropdown.Item>
                    <Dropdown.Item onClick={insert.bind(null, "FY-01")}>Insert Full Year</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Button.Group>
    );
}

import React, { PropTypes } from "react";
import { Button, Dropdown, Icon, Popup } from "semantic-ui-react";

/**
 * Allows students to insert new teaching periods, by both quickly adding new
 * semesters, as well as giving the option to add other teaching periods such as
 * summer semesters.
 */
export default function InsertTeachingPeriodButton({ semesterString, insert, appendSemester, mobile, noFloat, bottom }) {
    InsertTeachingPeriodButton.propTypes = {
        semesterString: PropTypes.string.isRequired,
        insert: PropTypes.func.isRequired,
        appendSemester: PropTypes.func.isRequired,
        mobile: PropTypes.bool,
        noFloat: PropTypes.bool,
        bottom: PropTypes.bool
    };
    bottom = true;
    return (
        <Button.Group fluid={mobile} className={"no-print" + (mobile || noFloat ? "" : " right floated")}>
            <Popup
              trigger={<Button className="btnlightblue" onClick={appendSemester}><Icon name="add square"/>Add {semesterString}</Button>}
              content="Instantly add a teaching period to the bottom of your plan"
              header="Quick Add Teaching Period"
              size="tiny"
            />
            <Popup
              trigger={
            <Dropdown floating button className="icon btnlightblue" icon={bottom ? "caret up" : "caret down"} label="Add Custom Semester">
                <Dropdown.Menu style={bottom ? {top: "auto", bottom: "120%"} : {}} className="btnlightblue">
                    <Dropdown.Item onClick={insert.bind(null, "S1-01")}>Insert Semester 1</Dropdown.Item>
                    <Dropdown.Item onClick={insert.bind(null, "S2-01")}>Insert Semester 2</Dropdown.Item>
                    <Dropdown.Item onClick={insert.bind(null, "SSA-02")}>Insert Summer Semester A</Dropdown.Item>
                    <Dropdown.Item onClick={insert.bind(null, "SSB-01")}>Insert Summer Semester B</Dropdown.Item>
                    <Dropdown.Item onClick={insert.bind(null, "WS-01")}>Insert Winter Semester</Dropdown.Item>
                    <Dropdown.Item onClick={insert.bind(null, "FY-01")}>Insert Full Year</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>}
            header="Add Custom Teaching Period"
            content="Add a different teaching period to your plan"
            size="tiny"
            />
        </Button.Group>
    );
}

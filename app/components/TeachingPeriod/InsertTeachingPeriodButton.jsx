import React, { PropTypes } from "react";
import { Button, Icon, Popup } from "semantic-ui-react";

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
        semesterString = "Semester 1";
    }

    return (
        <Button.Group fluid={mobile} className={"no-print" + (mobile || noFloat ? "" : " right floated")}>
            <Button color="yellow" onClick={addSemester}><Icon name="add square"/>Add {semesterString}</Button>
            <Popup
                basic
                trigger={<Button className="marginLeft" primary icon={bottom ? "caret up" : "caret down"}/>}
                on="click"
                hideOnScroll
                className="header-primary"
                >
            <Popup.Header>
                Insert a custom teaching period
            </Popup.Header>
            <Popup.Content>
                <i>You can <b>insert</b> a teaching period between rows using this action:</i>
                <br />
                <br />
                <Button.Group primary fluid vertical>
                        <Button onClick={insert.bind(null, "S1-01")}>Insert Semester 1</Button>
                        <Button onClick={insert.bind(null, "S2-01")}>Insert Semester 2</Button>
                        <Button onClick={insert.bind(null, "SSA-02")}>Insert Summer Semester A</Button>
                        <Button onClick={insert.bind(null, "SSB-01")}>Insert Summer Semester B</Button>
                        <Button onClick={insert.bind(null, "WS-01")}>Insert Winter Semester</Button>
                        <Button onClick={insert.bind(null, "FY-01")}>Insert Full Year</Button>
                </Button.Group>
            </Popup.Content>
            </Popup>
        </Button.Group>
    );
}

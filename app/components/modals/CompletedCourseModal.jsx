import React, { PropTypes } from "react";
import { Button, Dropdown, Header, Icon, Modal } from "semantic-ui-react";
import fileDownload from "react-file-download";

import ControlledModal from "./ControlledModal.jsx";

/**
 * The completed course modal.
 *
 * @author Saurabh Joshi
 */
export default function CompletedCourseModal({ trigger, teachingPeriods, numberOfUnits }) {
    CompletedCourseModal.propTypes = {
        trigger: PropTypes.element.isRequired,
        teachingPeriods: PropTypes.arrayOf(PropTypes.object),
        numberOfUnits: PropTypes.number.isRequired
    };

    /**
     * Exports the course plan to CSV format and downloads it
     */
    const exportToCSVFile = () => {
        var csvString = "Year, Teaching Period";

        for (var j = 0; j < numberOfUnits; j++) {
            csvString += ",Unit" + parseInt(j, 10);
        }
        csvString += "\r\n";

        for (var i = 0; i < teachingPeriods.length; i ++) {
            var teachingPeriod = teachingPeriods[i];
            csvString += teachingPeriod.year + "," + teachingPeriod.code + ",";

            var listofUnits = teachingPeriod.units;
            for(var k = 0; k < numberOfUnits; k++) {
                var unit = "";

                if(listofUnits[k] === null || listofUnits[k] === undefined || listofUnits[k] === "") {
                    // do nothing
                } else {
                    unit = listofUnits[k].UnitCode;
                }

                csvString += unit + ",";
            }

            csvString += "\r\n";
        }

        console.log(csvString);
        fileDownload(csvString, "course-plan.csv");
    };

    /**
     * Exports the course plan to JSON format and downloads it
     */
    const exportToJSONFile = () => {
        fileDownload(JSON.stringify({ teachingPeriods, numberOfUnits }), "course-plan.json");
    };

    const closeTrigger = <Button content="Close" />;
    return (
        <ControlledModal
               openTrigger={trigger}
               closeTrigger={closeTrigger}>
            <Modal.Header>
                <Icon name="checked calendar" />Well done on planning your course
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    There are several things you can do next:
                    <br />
                    <Header>1. Take it to your course advisor</Header>
                    <p>
                        Printing your course plan then showing it to your course
                        advisor will help speed up the process on whether or not
                        you can follow it.
                    </p>
                    <Button primary onClick={() => print()}><Icon name="print" />Print course plan</Button>
                    <Button.Group secondary>
                        <Button onClick={() => print()}><Icon name="download" /> Export as PDF</Button>
                        <Dropdown floating button className="icon">
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={exportToCSVFile}>Export as CSV</Dropdown.Item>
                                <Dropdown.Item onClick={exportToJSONFile}>Export as JSON</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Button.Group>
                    <Header>2. Place it somewhere</Header>
                    <p>
                        You can place your course plan somewhere, whether it is a printed
                        document or an exported digital copy. You can import your
                        course plan into a spreadsheet program if you export it as a CSV file.
                    </p>
                    <Header>3. Visit this site every now and then</Header>
                    <p>
                        Your course plan is saved to your browser, so if you want to
                        see your course plan again, come back to this website and
                        make changes whenever necessary.
                    </p>
                </Modal.Description>
            </Modal.Content>
        </ControlledModal>
    );
}

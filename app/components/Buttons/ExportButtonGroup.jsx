import React, { PropTypes } from "react";
import { Button, Dropdown, Icon } from "semantic-ui-react";


/**
 * @author JXNS
 * Simple component returning the buttons to export a course as pdf, csv or json
 */
const ExportButtonGroup = (props) => {
    const { onExportAsCSV, onExportAsJSON, onExportAsPDF } = props;

    return (
        <Button.Group secondary>
            <Button className="btnmainblue" onClick={onExportAsPDF}><Icon name="download" /> Export as PDF</Button>
            <Dropdown className="icon btnmainblue marginLeft" floating button>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={onExportAsCSV}>Export as CSV</Dropdown.Item>
                    <Dropdown.Item onClick={onExportAsJSON}>Export as JSON</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Button.Group>
    );
};

export default ExportButtonGroup;

ExportButtonGroup.propTypes = {
    onExportAsCSV: PropTypes.func,
    onExportAsJSON: PropTypes.func,
    onExportAsPDF: PropTypes.func
};

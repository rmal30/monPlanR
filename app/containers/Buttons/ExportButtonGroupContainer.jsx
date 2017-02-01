import React, { PropTypes } from "react";
import { connect } from "react-redux";

import Export from "../../utils/Export";
import ExportButtonGroup from "../../components/Buttons/ExportButtonGroup.jsx";

/**
 * @author JXNS
 * Container for the ExportButtonGroup component, grabs the necessary data as props from redux store
 * then generates the necessary function handlers and feeds them to the Export button group component.
 */
const ExportButtonGroupContainer = (props) => {

    const { teachingPeriods, numberOfUnits } = props;

    /**
     * Handles exporting as CSV using external Export function in utils
     */
    const handleExportAsCSV = () => {
        Export.File(teachingPeriods, numberOfUnits, Export.CSV);
    };

    /**
     * Handles exporting as JSON using external Export function in utils
     */
    const handleExportAsJSON = () => {
        Export.File(teachingPeriods, numberOfUnits, Export.JSON);
    };

    /**
     * Handles exporting as PDF, we're limited currently so we just print and hope the user 
     * will save it from there, we'll beed to fix this in future
     */
    const handleExportAsPDF = () => {
        print();
    };

    return (
        <ExportButtonGroup 
            onExportAsCSV={handleExportAsCSV}
            onExportAsJSON={handleExportAsJSON}
            onExportAsPDF={handleExportAsPDF}
        />
    );
};

/**
 * All this needs is teachingPeriods and numberOfUnits from redux store
 */
const mapStateToProps = (state) => {
    return {
        teachingPeriods: state.CourseStructure.teachingPeriods,
        numberOfUnits: state.CourseStructure.numberOfUnits
    };
};

export default connect(mapStateToProps)(ExportButtonGroupContainer);

ExportButtonGroupContainer.propTypes = {
    teachingPeriods: PropTypes.array,
    numberOfUnits: PropTypes.number
};
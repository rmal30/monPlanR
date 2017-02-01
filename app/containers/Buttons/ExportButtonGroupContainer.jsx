import React, { PropTypes } from "react";
import { connect } from "react-redux";
import Export from "../../utils/Export";

import ExportButtonGroup from "../../components/Buttons/ExportButtonGroup.jsx";

const ExportButtonGroupContainer = (props) => {

    const { teachingPeriods, numberOfUnits } = props;

    const handleExportAsCSV = () => {
        Export.File(teachingPeriods, numberOfUnits, Export.CSV);
    };

    const handleExportAsJSON = () => {
        Export.File(teachingPeriods, numberOfUnits, Export.JSON);
    };

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
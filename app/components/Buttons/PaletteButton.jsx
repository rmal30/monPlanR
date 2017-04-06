import React, { PropTypes } from "react";
import { Button } from "semantic-ui-react";

/**
 *
 */
const PaletteButton = (props) => {
    const { showPalette, showingPalette } = props;
    return (
        <Button
            fluid className={showingPalette ? "icon btnmainblue palette-tab palette-tab-open" : "icon btnmainblue palette-tab"}
            onClick={showPalette}
            icon={showingPalette ? "minus" : "plus"}
            content={showingPalette ? "Close Palette" : "Open Palette"}
            labelPosition="left"
        />
    );
};

export default PaletteButton;

PaletteButton.propTypes = {
    showPalette: PropTypes.func,
    showingPalette: PropTypes.bool
};

import * as React from "react";
import {Table} from "semantic-ui-react";
import Unit from "./Unit.jsx";

class TeachingPeriod extends React.Component {
    render() {
        var units = [<Unit></Unit>];
        return (
            <Table.Row>
                <Table.Cell class="teachingPeriod cell" data-popup-id={this.props.popupId}>
                    {this.props.teachingPeriodString}
                </Table.Cell>
                {units}
            </Table.Row>
        );
    }
}

export default TeachingPeriod;

import React, { PropTypes } from "react";
import { Container, Icon, Label, Statistic } from "semantic-ui-react";
import MediaQuery from "react-responsive";

/**
 * This currently is a component that renders the statistics for cost and credit points
 * @author JXNS
 *
 * @param {number} currentCreditPoints - A number representing the toal sum of credit points accumulated from a course
 * @param {number} currentEstCost - A number representing the current total estimated cost of a degree
 */
function CourseStatisticGroup(props) {

    CourseStatisticGroup.propTypes = {
        currentCreditPoints: PropTypes.number.isRequired,
        currentEstCost: PropTypes.number.isRequired
    };

    return (
        <Statistic.Group size="tiny">
            <Statistic>
                <Statistic.Value>
                    <Icon name='student' />
                    {props.currentCreditPoints}
                </Statistic.Value>
                <Statistic.Label>Credit Points</Statistic.Label>
            </Statistic>

            <Statistic>
                <Statistic.Value >
                    <Icon name='dollar' />
                    {props.currentEstCost}
                </Statistic.Value>
                <Statistic.Label>Total Est. Cost</Statistic.Label>
            </Statistic>
        </Statistic.Group>
    );
}

export default CourseStatisticGroup;

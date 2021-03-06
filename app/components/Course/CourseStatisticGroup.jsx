import React, { PropTypes } from "react";
import { Icon, Statistic, Popup, Grid } from "semantic-ui-react";

/**
 * This currently is a component that renders the statistics for cost and credit points
 * @author JXNS
 *
 * @param {number} creditPoints - A number representing the toal sum of credit points accumulated from a course
 * @param {number} cost - A number representing the current total estimated cost of a degree
 */
function CourseStatisticGroup(props) {


    CourseStatisticGroup.propTypes = {
        creditPoints: PropTypes.number.isRequired,
        cost: PropTypes.number.isRequired,
        requiredCreditPoints: PropTypes.number
    };

    const { creditPoints, requiredCreditPoints, cost } = props;
    return (
          <Grid>
            <Grid.Column width={7}>
                <Statistic size="mini">
                    <Statistic.Value>
                        <Icon name='student' />&nbsp;
                         {(requiredCreditPoints && requiredCreditPoints > 0 ) ? `${creditPoints}/${requiredCreditPoints}` : creditPoints}
                    </Statistic.Value>
                    <Popup
                      trigger={<Statistic.Label>Credit points</Statistic.Label>}
                      header="Current Credits/Required Credits to Complete Course"
                      content="This estimate is the total amount of credit points that could be earnt from the current plan out of the total required credit points"
                      on="hover"
                      positioning="bottom right"
                    />
                </Statistic>
            </Grid.Column>
            <Grid.Column width={9}>
                <Statistic size="mini">
                    <Statistic.Value >
                        <Icon name='dollar' />
                        {cost}
                    </Statistic.Value>
                    <Popup
                      trigger={<Statistic.Label>Total est. cost</Statistic.Label>}
                      header="Estimated cost for CSP students"
                      content="This estimate is the total cost of the current course if taken in 2017 for Commonwealth Supported Place (domestic) students."
                      on="hover"
                      positioning="bottom left"
                    />
            </Statistic>
            </Grid.Column>
          </Grid>
    );
}

export default CourseStatisticGroup;

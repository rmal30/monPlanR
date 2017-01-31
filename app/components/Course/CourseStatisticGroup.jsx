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
        cost: PropTypes.number.isRequired
    };

    return (
          <Grid textAlign="center">
            <Grid.Row className="statsGroupRow">
              <Grid.Column width={8}>
                <Statistic size="mini">
                    <Statistic.Value>
                        <Icon name='student' />
                        {props.creditPoints}
                    </Statistic.Value>
                    <Popup
                      trigger={<Statistic.Label>Total credit points</Statistic.Label>}
                      header="Current credit points"
                      content="This estimate is the total amount of credit points that could be earnt of the current current course for students"
                      on="hover"
                      positioning="bottom right"
                    />
                </Statistic>
              </Grid.Column>
              <Grid.Column width={8}>
                <Statistic size="mini">
                    <Statistic.Value >
                        <Icon name='dollar' />
                        {props.cost}
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
            </Grid.Row>
          </Grid>
    );
}

export default CourseStatisticGroup;

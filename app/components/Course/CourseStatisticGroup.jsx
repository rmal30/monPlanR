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
          <Grid style={{marginRight: "-0.5rem !important"}}>
            <Grid.Row className="statsGroupRow" style={{marginRight: "-0.5rem !important"}}>
              <Grid.Column width={8}>
                <Statistic size='tiny'>
                    <Statistic.Value>
                        <Icon name='student' />
                        {props.creditPoints}
                    </Statistic.Value>
                    <Popup
                      trigger={<Statistic.Label>Credit Points</Statistic.Label>}
                      header="Total Credit Points"
                      content="This estimate is the total amount of credit points that could be earnt of the current current course for students"
                      on="hover"
                      positioning="bottom right"
                    />
                </Statistic>
              </Grid.Column>
              <Grid.Column width={8}>
                <Statistic size='tiny'>
                    <Statistic.Value >
                        <Icon name='dollar' />
                        {props.cost}
                    </Statistic.Value>
                    <Popup
                      trigger={<Statistic.Label>Total Est. Cost</Statistic.Label>}
                      header="Est. Cost for Commonwealth Supported Place Students"
                      content="This estimate is the total cost of the current course if taken in 2017 for CSP Domestic Students."
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

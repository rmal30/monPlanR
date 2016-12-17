import React, { PropTypes } from "react";
import { Statistic, Label, Container } from "semantic-ui-react";

/**
 * 
 */
function CourseStatisticGroup(props) {


    return (
        <MediaQuery minDeviceWidth={768}>{(desktop) => {
            if (desktop) {
                
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
            } else {
                return (
                    <Container>
                        <Label color="green" size="large">
                            Total Credits Earnt
                            <Label.Detail>{props.currentCreditPoints}</Label.Detail>
                        </Label>
                        <Label color="green" size="large">
                            Total Expenses
                            <Label.Detail>${props.currentEstCost}</Label.Detail>
                        </Label>
                    </Container>
                );
            }
        }}
        </MediaQuery>
    );
}

export default CourseStatisticGroup
import React from "react";
import { Header, Icon, Table } from "semantic-ui-react";

export default function NoTeachingPeriod({ numberOfUnits }) {
    return (
        <Table.Row>
            <Table.Cell colSpan={numberOfUnits + 1}>
              <Header as="h3" icon textAlign="center">
                  <Icon name="calendar" />
                  No teaching periods
                  <Header.Subheader>
                      Click add semester button below to get started.
                  </Header.Subheader>
              </Header>
            </Table.Cell>
        </Table.Row>
    );
}

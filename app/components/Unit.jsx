import React from "react";
import {Button, Container, Dropdown, Table} from "semantic-ui-react";

/**
 * Unit component
 *
 * @class
 * @extends React.Component
 */
class Unit extends React.Component {
    /**
     * State should only hold additional unit information.
     * CourseStructure component stores only the unit code to reduce space
     * usage.
     *
     * TODO: Find some way to make Unit stateless again.
     */
    constructor() {
        super();
        this.state = {
            showUI: false
        };
    }
    /**
     * Shows unit details in a modal.
     */
    handleDetail() {

    };

    handleMouseEnter(e) {
        if(!this.props.free) {
            this.setState({
                showUI: true
            });
        }
    };

    handleMouseLeave(e) {
        if(!this.props.free) {
            this.setState({
                showUI: false
            });
        }
    };

    /**
     * Removes unit from the course structure.
     */
    handleDelete() {
        if(this.props.free) {
            return;
        }

        this.props.deleteUnit(this.props.index);
    };

    render() {
        return (
            <Table.Cell onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
                {this.props.code}
                {!this.props.free && this.state.showUI &&
                        <Button.Group size="mini" compact className="right floated">
                            <Button basic floated="right" onClick={this.handleDetail.bind(this)} color="blue" icon="info" />
                            <Button basic floated="right" onClick={this.handleDelete.bind(this)} color="red" icon="close" />
                        </Button.Group>
                }
            </Table.Cell>
        );
    }
}

export default Unit;

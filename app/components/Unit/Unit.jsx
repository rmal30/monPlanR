import React from "react";
import {Button, Container, Dropdown, Icon, Table} from "semantic-ui-react";
import MediaQuery from "react-responsive";

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
        this.setState({
            showUI: true
        });
    };

    handleMouseMove(e) {
        this.setState({
            showUI: true
        });
    }

    handleMouseLeave(e) {
        this.setState({
            showUI: false
        });
    };

    handleClick(e) {
        if(this.props.free && this.state.showUI && this.props.unitToAdd) {
            this.props.addUnit(this.props.index, this.props.unitToAdd);
        } else if(this.props.free && this.state.showUI && this.props.showMoveUnitUI) {
            this.props.moveUnit(this.props.index);
        }
    }

    handleMove(e) {
        if(!this.props.free) {
            this.props.willMoveUnit(this.props.index);
        }
    }

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
            <MediaQuery maxDeviceWidth={767}>
                {mobile => {
                    return (
                        <Table.Cell active={this.props.free && this.state.showUI && (this.props.showMoveUnitUI || this.props.showAddToCourseUI) && !mobile}
                                    onMouseEnter={this.handleMouseEnter.bind(this)}
                                    onMouseMove={this.handleMouseMove.bind(this)}
                                    onMouseLeave={this.handleMouseLeave.bind(this)}
                                    onClick={this.handleClick.bind(this)}>
                            {this.props.free && this.props.showAddToCourseUI && mobile && this.props.firstFreeUnit &&
                                <Button color="green"><Icon name="plus" />Add {this.props.unitToAdd}</Button>
                            }
                            {this.props.code}
                            {!this.props.free && (this.state.showUI || mobile) && !this.props.showMoveUnitUI &&
                                    <Button.Group size="mini" compact className="right floated">
                                        <Button basic onClick={this.handleDetail.bind(this)} color="blue" icon="info" />
                                        <Button basic onClick={this.handleMove.bind(this)} color="grey" icon="move" />
                                        <Button basic onClick={this.handleDelete.bind(this)} color="red" icon="close" />
                                    </Button.Group>
                            }
                        </Table.Cell>
                    );
                }}
            </MediaQuery>
        );
    }
}

export default Unit;

import React, { PropTypes } from "react";
import { Button, Message, Icon, Table, Popup } from "semantic-ui-react";
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
            hovering: false,
            moving: false
        };
    }
    /**
    * Shows unit details in a modal.
    */
    handleDetail() {

    }

    handleMouseEnter() {
        if(!this.state.hovering) {
            this.setState({
                hovering: true
            });
        }
    }

    handleMouseMove() {
        if(!this.state.hovering) {
            this.setState({
                hovering: true
            });
        }
    }

    handleMouseLeave() {
        if(this.state.hovering) {
            this.setState({
                hovering: false
            });
        }
    }

    handleClick() {
        if(this.props.free && this.state.hovering && this.props.unitToAdd) {
            this.props.addUnit(this.props.index, this.props.unitToAdd);
        } else if(this.state.hovering && this.props.showMoveUnitUI) {
            if(this.props.free) {
                this.props.moveUnit(this.props.index);
            } else {
                this.props.swapUnit(this.props.index);
            }
        }
    }

    handleMove() {
        if(!this.props.free) {
            this.props.willMoveUnit(this.props.index);
            this.setState({ moving: true });
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
    }

    render() {
        const facultyColors = {
            "Art, Design and Architecture": "black",
            "Arts": "red",
            "Business and Economics": "teal",
            "Education": "violet",
            "Engineering": "orange",
            "Information Technology": "purple",
            "Law": "grey",
            "Medicine, Nursing and Health Sciences": "blue",
            "Pharmacy and Pharmaceutical Sciences": "olive",
            "Science": "green"
        };

        let facultyColor = undefined;

        if(!this.props.free) {
            console.log(this.props.faculty);
            facultyColor = facultyColors[this.props.faculty.replace("Faculty of ", "")];
        }
        return (
            <MediaQuery maxDeviceWidth={767}>
                {mobile => {
                    return (
                        <Table.Cell active={this.state.hovering && (this.props.showMoveUnitUI || this.props.free && this.props.unitToAdd !== undefined) && !mobile}
                            onMouseEnter={this.handleMouseEnter.bind(this)}
                            onMouseMove={this.handleMouseMove.bind(this)}
                            onMouseLeave={this.handleMouseLeave.bind(this)}
                            onClick={this.handleClick.bind(this)}>
                            {this.props.free && this.props.unitToAdd !== undefined && mobile && this.props.firstFreeUnit &&
                                <Button color="green"><Icon name="plus" />Add {this.props.unitToAdd.code}</Button>
                            }
                            {!this.props.free &&
                                <Message color={facultyColor} size="mini">
                                    <Message.Header>
                                        {this.props.code}
                                    </Message.Header>
                                    {(!this.state.hovering || !this.showMoveUnitUI) &&
                                        `${this.props.name}`
                                    }
                                    {(this.state.hovering || mobile) && !this.props.showMoveUnitUI &&
                                        <Button.Group className="no-print" size="mini" fluid compact>
                                            {false && <Button disabled={true} basic onClick={this.handleDetail.bind(this)} color="blue" icon="info" />}
                                            <Popup
                                                trigger={<Button basic onClick={this.handleMove.bind(this)} color="grey" icon="move" />}
                                                content='Move unit'
                                                size='mini'
                                                positioning='bottom center'
                                                />
                                            <Popup
                                                trigger={<Button basic onClick={this.handleDelete.bind(this)} color="red" icon="close" />}
                                                content='Remove unit'
                                                size='mini'
                                                positioning='bottom center'
                                                />
                                        </Button.Group>
                                    }
                                </Message>
                            }
                        </Table.Cell>
                    );
                }}
            </MediaQuery>
        );
    }
}

Unit.propTypes = {
    /* Used for indicating whether unit is free or not */
    free: PropTypes.bool,

    index: PropTypes.number.isRequired,
    code: PropTypes.string,
    name: PropTypes.string,
    faculty: PropTypes.string,

    unitToAdd: PropTypes.shape({
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        faculty: PropTypes.string
    }),

    addUnit: PropTypes.func,
    moveUnit: PropTypes.func,
    willMoveUnit: PropTypes.func,
    showMoveUnitUI: PropTypes.bool,
    swapUnit: PropTypes.func,
    deleteUnit: PropTypes.func,
    firstFreeUnit: PropTypes.bool
};

export default Unit;

import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const d3 = require("d3");

import * as courseActions from "../../actions/CourseActions";
import LocalStorage from "../../utils/LocalStorage";
import { getListOfUnits } from "../../utils/ValidateCoursePlan";

// import cola from "webcola";

/**
 * Graph is designed to be more clear in showing relationships between units
 * in terms of prereqs, coreqs and prohibs.
 *
 * Some of the d3 code was read from bl.ocks.org site, which are licensed
 * under the GNU General Public License version 3 (https://opensource.org/licenses/GPL-3.0)
 */
class Graph extends Component {
    /**
     * Start setting up the force-directed graph, but wait until the SVG object
     * is mounted onto the DOM.
     */
    constructor(props) {
        super(props);

        const width = 1400, height = 600;

        this.data = {
            nodes: [
                {
                    unitCode: "ABC1234",
                    creditPoints: 6
                },
                {
                    unitCode: "ABC2345",
                    creditPoints: 6
                }
            ],
            links: []
        };

        this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(d => d.unitCode))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width/2, height/2));

        this.state = {
            width,
            height
        };
    }

    /**
     * Set force coordinates to where the unit is at
     */
    dragStarted(d) {
        if(!d3.event.active) {
            this.simulation.alphaTarget(0.3).restart();
        }

        d.fx = d.x;
        d.fy = d.y;
    }

    /**
     * Set force coordinates to mouse
     */
    dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    /**
     * Turn off force coordinates
     */
    dragEnded(d) {
        d.fx = null;
        d.fy = null;
    }

    /**
     * A node is a text on top of a rect. The text displays the unit code,
     * and the rect with its color indicates that it is a unit.
     */
    enterNode(selection) {
        const g = selection.append("g")
            .classed("node", true)
            .call(d3.drag()
                .on("start", this.dragStarted.bind(this))
                .on("drag", this.dragged.bind(this))
                .on("end", this.dragEnded.bind(this)));

        g.append("rect")
            .attr("width", d => d.creditPoints * 20)
            .attr("height", 60)
            .style("fill", "steelblue");

        g.append("text")
            .text(d => d.unitCode)
            .style("fill", "white");
    }

    /**
     * Updates the position of the nodes
     */
    updateNode(selection) {
        selection.select("rect")
            .attr("x", d => d.x)
            .attr("y", d => d.y);

        selection.select("text")
            .attr("x", d => d.x + 8)
            .attr("y", d => d.y + 24);
    }

    /**
     * Updates the graph displated on the screen
     */
    updateGraph(selection) {
        selection.select(".nodes")
            .selectAll(".node")
            .call(this.updateNode.bind(this));
    }

    /**
     * After we have the component mounted, we can use the ref to initialise
     * the force directed graph.
     */
    componentDidMount() {
        if(LocalStorage.doesCourseStructureExist()) {
            this.props.clearCourse();
            this.props.loadCourseFromLocalStorage();
        }

        this.d3Graph = d3.select(this.graphSVG);

        /*
        const links = this.d3Graph.append("g")
                        .attr("class", "links")
                        .selectAll("line")
                        .data(this.data.links);

        links.enter()
                .append("line")
                .attr("stroke-width", 5)
                .attr("stroke", "black");
        */

        this.d3Graph.append("g")
            .classed("nodes", true)
            .selectAll("g")
            .data(this.data.nodes)
            .enter()
            .call(this.enterNode.bind(this));

        this.simulation
            .nodes(this.data.nodes)
            .on("tick", () => {
                this.d3Graph.call(this.updateGraph.bind(this));
                /*
                links
                    .attr("x1", d => d.source.x + d.source.creditPoints * 20/2)
                    .attr("y1", d => d.source.y + 60/2)
                    .attr("x2", d => d.target.x + d.target.creditPoints * 20/2)
                    .attr("y2", d => d.target.y + 60/2);
                    */
            });

            /*
        this.simulation
            .force("link")
            .links(this.data.links);
            */
    }

    /**
     * Opt to use d3's update system instead of React's. This is because
     * d3 manipulates with DOM as well, and we wouldn't be able to use both
     * at once. Since performance seems to be reduced when using React, we
     * chose to use d3 instead of React.
     */
    shouldComponentUpdate(nextProps) {
        let nodes = nextProps.nodes && [...nextProps.nodes] || [];

        let d3Nodes = this.d3Graph.select(".nodes")
            .selectAll(".node")
            .data(nodes, node => node.unitCode);

        d3Nodes.enter().call(this.enterNode.bind(this));
        d3Nodes.exit().remove();
        // This must come after nodes coorespond with the data one-to-one
        d3Nodes.call(this.updateNode.bind(this));

        /* Restarts simulation as data has been updated */
        this.simulation.nodes(nodes);
        this.simulation.restart();

        return false;
    }

    /**
     * Renders a blank SVG, as d3 will be used to populate the graph.
     */
    render() {
        return (
            <svg
                width={this.state.width}
                height={this.state.height}
                ref={graphSVG => this.graphSVG = graphSVG} />
        );
    }
}

Graph.propTypes = {
    nodes: PropTypes.array,
    links: PropTypes.array,
    clearCourse: PropTypes.func.isRequired,
    loadCourseFromLocalStorage: PropTypes.func.isRequired
};

/**
 * Injects a list of units into the props
 */
const mapStateToProps = state => {
    return {
        nodes: state.CourseStructure.teachingPeriods && getListOfUnits(state.CourseStructure.teachingPeriods)
    };
};

/**
 * Injects course actions into the props.
 */
const mapDispatchToProps = dispatch => {
    const actionBundle = {
        ...courseActions
    };

    return bindActionCreators(actionBundle, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);

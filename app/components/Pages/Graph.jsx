import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const d3 = require("d3");

import * as courseActions from "../../actionCreators/CourseActions";
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
            .force("charge", d3.forceManyBody().strength(-10))
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
        d3.event.sourceEvent.stopPropagation(); // Prevent zoom from triggering
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

        const rect = {
            width(d) {
                return d.creditPoints * 30;
            },
            height() {
                return 90;
            }
        };

        const margin = {
            x: 10,
            y: 10
        };

        g.append("rect")
           .attr("width", rect.width)
           .attr("height", rect.height)
           .style("fill", "#DFF0FF")
           .style("stroke", "#2185D0");

        g.append("foreignObject")
            .classed("unitCode", true)
            .attr("width", d => rect.width(d) - margin.x * 2)
            .attr("height", d => rect.height(d) - margin.y * 2)
            .attr("x", margin.x)
            .attr("y", margin.y)
            .append("xhtml:body")
            .style("min-width", "0")
            .text(d => d.unitCode)
            .style("color", "#2185D0")
            .style("background", "transparent")
            .style("overflow", "visible")
            .style("font-weight", "bold");

        g.append("foreignObject")
            .classed("unitName", true)
            .attr("width", d => rect.width(d) - margin.x * 2)
            .attr("height", d => rect.height(d) - margin.y * 2 - 20)
            .attr("x", margin.x)
            .attr("y", margin.y + 20)
            .append("xhtml:body")
            .style("min-width", "0")
            .text(d => d.unitName)
            .style("color", "#2185D0")
            .style("background", "transparent")
            .style("font-size", "0.9em")
            .style("overflow", "visible")
            .style("font-weight", "bold");
    }

    /**
     * Updates the position of the nodes
     */
    updateNode(selection) {
        selection.attr("transform", d => `translate(${d.x}, ${d.y})`);
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
     * Resizes SVG to 100% width and height.
     */
    handleWindowResize() {
        const rectObject = this.graphSVG.parentNode.getBoundingClientRect();

        this.d3Graph
            .attr("width", rectObject.width)
            .attr("height", rectObject.height - 10);
    }

    /**
     * Using d3 to handle zoom and pan
     */
    handleZoom() {
        this.d3Graph.select(".container").attr("transform", d3.event.transform);
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

        this.d3Graph = d3.select(this.graphSVG)
            .call(d3.zoom().scaleExtent([0.5, 10]).on("zoom", this.handleZoom.bind(this)));

        this.handleWindowResize.call(this);

        window.addEventListener("resize", this.handleWindowResize.bind(this));

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

        this.d3Graph
            .append("g")
            .classed("container", true)
            .append("g")
            .classed("nodes", true)
            .selectAll("foreignObject")
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

        // TODO: Find a better way of merging an immutable array into a mutate array used by d3
        // First we remove any nodes removed from the units array
        this.data.nodes = this.data.nodes.filter(node => nodes.find(originalNode => `${originalNode.unitCode}-${originalNode.teachingPeriodIndex}-${originalNode.unitIndex}` === `${node.unitCode}-${node.teachingPeriodIndex}-${node.unitIndex}`));

        // Then we check if an element exists already in the array, and update that element if it does exist. Otherwise we create a new element.
        nodes.forEach(node => {
            const i = this.data.nodes.findIndex(originalNode => `${originalNode.unitCode}-${originalNode.teachingPeriodIndex}-${originalNode.unitIndex}` === `${node.unitCode}-${node.teachingPeriodIndex}-${node.unitIndex}`);
            if(i > -1) {
                this.data.nodes[i] = {
                    ...this.data.nodes[i],
                    ...node
                };
            } else {
                this.data.nodes.push(node);
            }
        });

        let d3Nodes = this.d3Graph.select(".nodes")
            .selectAll(".node")
            .data(this.data.nodes, node => `${node.unitCode}-${node.teachingPeriodIndex}-${node.unitIndex}`);

        d3Nodes.enter().call(this.enterNode.bind(this));
        d3Nodes.exit().remove();
        // This must come after nodes coorespond with the data one-to-one
        d3Nodes.call(this.updateNode.bind(this));

        /* Restarts simulation as data has been updated */
        this.simulation.nodes(this.data.nodes);
        this.simulation.restart();

        return false;
    }

    /**
     * Renders a blank SVG, as d3 will be used to populate the graph.
     */
    render() {
        return (
            <svg ref={graphSVG => this.graphSVG = graphSVG} />
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

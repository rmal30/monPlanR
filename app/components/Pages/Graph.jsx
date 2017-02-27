import React, { Component } from "react";
const d3 = require("d3");
// import cola from "webcola";

/**
 * Graph is designed to be more clear in showing relationships between units
 * in terms of prereqs, coreqs and prohibs.
 *
 * Some of the d3 code was read from bl.ocks.org site, which are licensed
 * under the GNU General Public License version 3 (https://opensource.org/licenses/GPL-3.0)
 */
export default class Graph extends Component {
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
            links: [
                {
                    source: "ABC1234",
                    target: "ABC2345"
                }
            ]
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
     * After we have the component mounted, we can use the ref to initialise
     * the force directed graph.
     */
    componentDidMount() {
        this.graph = d3.select(this.graphSVG);

        const self = this;

        /**
         * Set force coordinates to where the unit is at
         */
        function dragStarted(d) {
            if(!d3.event.active) {
                self.simulation.alphaTarget(0.3).restart();
            }

            d.fx = d.x;
            d.fy = d.y;
        }

        /**
         * Set force coordinates to mouse
         */
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        /**
         * Turn off force coordinates
         */
        function dragEnded(d) {
            d.fx = null;
            d.fy = null;
        }

        const links = this.graph.append("g")
                        .selectAll("line")
                        .data(this.data.links)
                        .enter()
                        .append("line")
                        .attr("stroke-width", 5)
                        .attr("stroke", "black");

        const g = this.graph
                    .append("g")
                    .selectAll("g")
                    .data(this.data.nodes)
                    .enter()
                    .append("g")
                    .call(d3.drag()
                        .on("start", dragStarted)
                        .on("drag", dragged)
                        .on("end", dragEnded));

        const rects = g
                        .append("rect")
                        .attr("width", d => d.creditPoints * 20)
                        .attr("height", 60)
                        .style("fill", "steelblue");

        const texts = g
                        .append("text")
                        .text(d => d.unitCode)
                        .style("fill", "white");

        this.simulation
            .nodes(this.data.nodes)
            .on("tick", () => {
                links
                    .attr("x1", d => d.source.x + d.source.creditPoints * 20/2)
                    .attr("y1", d => d.source.y + 60/2)
                    .attr("x2", d => d.target.x + d.target.creditPoints * 20/2)
                    .attr("y2", d => d.target.y + 60/2);

                rects
                    .attr("x", d => d.x)
                    .attr("y", d => d.y);

                texts
                    .attr("x", d => d.x + 8)
                    .attr("y", d => d.y + 24);
            });

        this.simulation
            .force("link")
            .links(this.data.links);
    }

    /**
     * Opt to use d3's update system instead of React's. This is because
     * d3 manipulates with DOM as well, and we wouldn't be able to use both
     * at once. Since performance seems to be reduced when using React, we
     * chose to use d3 instead of React.
     */
    shouldComponentUpdate() {
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

import React, { Component } from 'react';
import Graph from 'react-graph-vis';


class GraphDisplay extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   console.log("graph display mounted");
  //   console.log(this.props.nodes)
  // }

  temp(event) {
    console.log("click!!", event)
  }

  render(){
    const graph = {
      "nodes": this.props.nodes,
      "edges": this.props.edges
    };
  
    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: {color: "#000000"},
        width: 4,
        smooth: true
      },
      nodes: {
        color: "#efefef"
      },
      height: "500px"
    };
  
    const events = {
      doubleClick: (event) => {
        var { nodes, edges } = event;
        this.props.addRequirement(event);
      }
    };
    return (
      <div className="graph-display">
        <Graph
          graph={graph}
          options={options}
          events={events}
        />
      </div>
    );
  }

}

export default GraphDisplay;
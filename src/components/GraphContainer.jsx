import React, { Component } from 'react';

import GraphDisplay from './GraphDisplay';

class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredNodes: [],
      requiredEdges: [],
      currentNodes: [],
      currentEdges: [],
      currentPile: []
    }

    this.addRequirement = this.addRequirement.bind(this);
  }

  componentDidMount() {
    console.log("graph container mounted")
    // console.log(this.state.currentPile)
    this.update([], []);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pile !== prevProps.pile) {
      console.log("graph container updated from componentDidUpdate");
      // console.log(this.props.pile);
      this.update([], []);
    }

  }

  requiredInList(required, listA){
    /*
      checks if all ids in required list are in a list of objects (listA)
    */

    let listA_IDs = []
    for (let i in listA) {
      listA_IDs.push(listA[i].id)
    }

    let isSubset = true;
    for (let l in required) {
      isSubset = isSubset && (listA_IDs.includes(required[l]));
    }

    return isSubset;
  }

  updatePile(reqNodes, reqEdges) {
    
    let tempPile = [];
    console.log("props pile", this.props.pile)
    console.log("required nodes", this.state.requiredNodes)
    console.log("required edges", this.state.requiredEdges)

    // set the current pile to only include graphs with the minimum required nodes and edges
    for (let g in this.props.pile) {
      let graph = this.props.pile[g];
      
      // checks if includes all required nodes and edges
      if (this.requiredInList(reqNodes, graph["nodes"]) && this.requiredInList(reqEdges, graph["edges"])) {
        tempPile.push(graph);
      }
    }

    console.log("temp pile", tempPile);
    return tempPile;
  }

  getNodes(pile) {
    let count = {}
    console.log("count should be empty", count)
    let listNodes = []

    // get a single graph of the pile
    for (let g in pile) {
      let graph = pile[g];

      // add to the counts for each node in the graph
      for (let n in graph["nodes"]){
        let tempid = graph["nodes"][n].id;
        if (!count[tempid]) {
          count[tempid] = 0;
          listNodes.push(graph["nodes"][n]);
        }
        count[tempid]++;
      }
    }

    // update opacity based on count
    for (let n in listNodes) {
      let opacity = count[listNodes[n].id]/pile.length;
      listNodes[n]["opacity"] = opacity;
      if (opacity < 1) {
        listNodes[n]["color"] = "#708090";
      }
    }

    return listNodes;
  }

  getEdges(pile) {
    let count = {}
    let listEdges = []

    // get a single graph of the pile
    for (let g in pile) {
      let graph = pile[g];

      // add to the counts for each edge in the graph
      for (let e in graph["edges"]){
        let tempid = graph["edges"][e].id;
        if (!count[tempid]) {
          count[tempid] = 0;
          listEdges.push(graph["edges"][e]);
        }
        count[tempid]++;
      }
    }

    // update opacity based on count
    for (let e in listEdges) {
      let opacity = count[listEdges[e].id]/pile.length;
      listEdges[e]["color"] = { "opacity": opacity };
      if (opacity < 1) {
        listEdges[e]["color"]["color"] = "#708090"
      }
    }

    return listEdges;
  }


  addRequirement(event) {
    console.log("clickk", event.nodes[0], event.edges[0]);
    let newRequiredNodes = this.state.requiredNodes;
    let newRequiredEdges = this.state.requiredEdges;
    if (event.nodes.length === 1) {
      newRequiredNodes = this.state.requiredNodes.concat(event.nodes[0]);
      console.log("required nodes", this.state.requiredNodes);

    } else if (event.edges.length === 1){
      newRequiredEdges = this.state.requiredEdges.concat(event.edges[0]);
      console.log("required edges", this.state.requiredEdges);
    }

    this.update(newRequiredNodes, newRequiredEdges);

  }

  update(reqNodes, reqEdges) {
    let newPile = this.updatePile(reqNodes, reqEdges);
    let newNodes = this.getNodes(newPile);
    let newEdges = this.getEdges(newPile);
    this.setState({
      requiredNodes: reqNodes,
      requiredEdges: reqEdges,
      currentEdges: newEdges,
      currentNodes: newNodes,
      currentPile: newPile
    });
  }


  render(){
    console.log("passed pile", this.state.currentPile);
    console.log("passed nodes", this.state.currentNodes);
    console.log("passed edges", this.state.currentEdges);
    return (
      <div className="graph-container">
        <GraphDisplay key={Math.random()} nodes={this.state.currentNodes} edges={this.state.currentEdges} addRequirement={this.addRequirement} />
      </div>
    )
  }

}

export default GraphContainer;
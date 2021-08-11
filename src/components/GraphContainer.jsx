import React, { Component } from 'react';

import GraphDisplay from './GraphDisplay';

class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredNodes: [],
      requiredEdges: [],
      currentNodes: [],
      currentEdges: []
    }
  }

  componentDidMount() {
    // console.log("graph container mounted")
    // console.log(this.state.currentPile)
    this.update()
  }

  componentDidUpdate(prevProps) {
    if (this.props.pile !== prevProps.pile) {
      // console.log("graph container updated");
      // console.log(this.props.pile);
      this.update(this.props.pile);
    }

  }

  // checkRequired() {
  //   for (let g in this.props.pile) {

  //   }
  // }

  // nodeInCurrent(testNode) {
  //   for (let n in this.state.currentNodes) {

  //     if (testNode.id === this.state.currentNodes[n].id) {
        

  //       this.setState(({currentNodes}) => ({
  //         currentNodes: [
  //           ...currentNodes.slice(0, n),
  //           {
  //             ...currentNodes[n],
  //             count: this.state.currentNodes + 1
  //           },
  //           currentNodes.slice(n+1)
  //         ]
  //       }));

  //       console.log("eq")

  //       return;
  //     }
  //   }
  //   console.log("not eq")
  //   console.log(this.state.currentNodes)
  //   console.log(testNode)
  //   // if it wasn't already in the list of nodes
  //   let updateNode = testNode;
  //   updateNode["count"] = 1;

  //   this.setState(({currentNodes}) => ({
  //     currentNodes: currentNodes.concat(updateNode)
  //   }));
  // }
  

  countNodes(pile) {
    let count = {}
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
      listNodes[n]["opacity"] = count[listNodes[n].id]/pile.length;
    }

    this.setState({currentNodes: listNodes}, () => {console.log("callback from setstate")});
  }

  countEdges(pile) {
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
      listEdges[e]["color"] = { "opacity": count[listEdges[e].id]/pile.length };
    }

    this.setState({currentEdges: listEdges});
  }


  update(pile) {
    this.countNodes(pile);
    this.countEdges(pile);

    // // replace count with opacity (% of graphs)
    // for (let n in this.state.currentNodes) {
    //   let op = this.state.currentNodes[n].count / this.state.currentPile.length;
    //   this.setState(({currentNodes}) => ({
    //     currentNodes: [
    //       ...currentNodes.slice(0, n),
    //       {
    //         ...currentNodes[n],
    //         opacity: op
    //       },
    //       currentNodes.slice(n+1)
    //     ]
    //   }));
    // }

    // for (let e in this.state.currentEdges) {
    //   let op = this.state.currentEdges[e].count / this.state.currentPile.length;
      
    //   this.setState(({currentEdges}) => ({
    //     currentEdges: [
    //       ...currentEdges.slice(0, e),
    //       {
    //         ...currentEdges[e],
    //         color: {"opacity": op}
    //       },
    //       currentEdges.slice(e+1)
    //     ]
    //   }));
    // }
  }



  render(){
    console.log("aaa", this.state.currentEdges);
    return (
      <div className="graph-container">
        <GraphDisplay key={Math.random()} nodes={this.state.currentNodes} edges={this.state.currentEdges} />
      </div>
    )
  }

}

export default GraphContainer;
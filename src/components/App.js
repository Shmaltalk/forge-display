import React, { Component } from 'react';

import TopBar from './TopBar';
import SideBar from './SideBar';
import GraphContainer from './GraphContainer';

import graphData from '../graphData';
import '../App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      piles: this.getPiles(),
      currentPile: 0
    }
    this.nextPile = this.nextPile.bind(this);
    this.prevPile = this.prevPile.bind(this);
  }

  componentDidMount() {
    // console.log("graph container mounted")
    // console.log(this.state.currentPile)
    console.log(graphData)
  }


  // objectEquals(objA, objB){
  //   /*
  //     generically tell if two objects are equivalent
  //   */

  //   // not equal if different number of keys
  //   if (!(Object.keys(objA).length === Object.keys(objB).length)) {
  //     return false;
  //   }

  //   // check that all key/vals in objA are in objB
  //   for (let k in objA) {
  //     if (!(objA[k] === objB[k])) {
  //       return false;
  //     }
  //   }

  //   // check that all key/vals in objB are in objA
  //   for (let k in objB) {
  //     if (!(objB[k] === objA[k])) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }

  objInList(testObj, testList) {
    /* 
      checks if a given object is in a given list
    */
    
    for (let o in testList) {
      if (testObj.id === testList[o].id) {
        return true;
      }
    }

    return false;
  }

  listAinB(listA, listB){
    /*
      checks if a list of objects (listA) is a subset of another (listB)
    */
    let isSubset = true;
    for (let l in listA) {
      isSubset = isSubset && this.objInList(listA[l], listB);
    }

    return isSubset;
  }

  graphAinB(graphA, graphB) {
    return this.listAinB(graphA.nodes, graphB.nodes) && this.listAinB(graphA.edges, graphB.edges)
  }

  getPiles() {

    let pileDict = {}
    // for some reason when I do loops like this, g is the index, not the value
    for (let g in graphData){
      let currID = graphData[g].id
      pileDict[currID] = []
    }

    for (let g1 in graphData) {
      let baseID = graphData[g1].id

      // graphs not in the dict should not be considered as pile bases
      if (!(baseID in pileDict)) {
        continue
      }

      let tempList = [];

      for (let g2 in graphData) {
        /* if graph1 is a subset of graph 2 then add it to the pile (inclusive subset so graph1 will also be added)*/
        if (this.graphAinB(graphData[g1], graphData[g2])) {
          tempList.push(graphData[g2])

          // remove superset graphs from list of base graphs (not including the base graph)
          if (!(graphData[g2].id == baseID)) {
            delete pileDict[graphData[g2].id]
          }
        }
      }

      pileDict[baseID] = tempList
    }
    let pileList = []
    for (let p in pileDict) {
      pileList.push(pileDict[p])
    }
    return pileList;

  }

  nextPile() {
    /*
      wont increment if it's at the last pile
    */
    if ((this.state.currentPile + 1) < this.state.piles.length) {
      this.setState({currentPile: this.state.currentPile + 1})
    }
  }

  prevPile() {
    /*
      wont increment if it's at the first
    */
    if ((this.state.currentPile - 1) >= 0) {
      this.setState({currentPile: this.state.currentPile - 1})
    }
  }

  render(){
    return (
      <div className="App">
        <div className="page-body">
          <SideBar />
          <div className="content-body">
            <TopBar nextPile={this.nextPile} prevPile={this.prevPile} />
            <GraphContainer pile={this.state.piles[this.state.currentPile]}/>
          </div>
        </div>
      </div>
    )
  }

}

export default App;
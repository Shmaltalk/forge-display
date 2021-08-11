import React, { Component } from 'react';

class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="top-bar">
        <button onClick={this.props.prevPile}>
          PREEVIOUS
        </button>

        <button onClick={this.props.nextPile}>
          Next
        </button>
      </div>
    )
  }

}

export default TopBar;
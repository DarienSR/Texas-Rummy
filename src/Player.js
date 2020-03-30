import React, { Component } from 'react'
import "./Player.css";

export default class Player extends Component {
  render() {
    return (
      <div className="Player">
        {this.props.hand.map((card) => {
          return card;
        })}
      </div>
    )
  }
}

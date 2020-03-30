import React, { Component } from 'react'
import "./Card.css";
export default class Card extends Component {
  render() {
    return (
      <div className="Card">
        <img alt={`${this.props.suit}, ${this.props.value}`} src={this.props.image} />
      </div>
    )
  }
}

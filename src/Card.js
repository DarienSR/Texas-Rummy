import React, { Component } from 'react'
import "./Card.css";
export default class Card extends Component {
  render() {
    return (
      <div className="Card">
        <img id={this.props.id} alt={this.props.id} src={this.props.image} />
      </div>
    )
  }
}

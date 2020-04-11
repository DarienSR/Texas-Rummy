import React, { Component } from 'react'

export default class Card extends Component {
  toggleCard(selected) {
    this.props.select(selected)
  }
  render() {
    return (
      <img 
        alt={this.props.value}
        onClick={() => this.toggleCard(`${this.props.suit} ${this.props.value}`)} 
        style={this.props.style}
        className="Card" 
        src={this.props.image} 
      />
    )
  }
}

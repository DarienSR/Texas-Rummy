import React, { Component } from 'react'
import "./Card.css";
export default class Card extends Component {
 constructor(props) {
   super(props)
 
   this.state = {
      value: this.props.value,
      suit: this.props.suit
   }
   this.handleChange = this.handleChange.bind(this)
 }
 

  toggleCard(selected) {
    this.props.select(selected)
  }

  handleChange(e) {
    
    this.props.ChangeInfo(e.target.value, this.props.idx)
  }

  render() {

    let cardPreview = this.props.isWild ? 
      <div className="Card-Wild">
        <img 
          onClick={() => this.props.type !== "divider" ? this.toggleCard(`${this.props.suit} ${this.props.value}`) : this.toggleCard(this.props.value)} 
          style={this.props.style}
          className="Card Card-Wild" 
          src={this.props.image} 
        />
        <select onChange={this.handleChange}>
          <option value={this.props.suit}>{this.props.suit}</option>
          <option value="SPADES">SPADES</option>
          <option value="DIAMONDS">DIAMONDS</option>
          <option value="CLUBS">CLUBS</option>
          <option value="HEARTS">HEARTS</option>
        </select>
        <select onChange={this.handleChange}>
          <option value={this.props.value}>{this.props.value}</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>J</option>
          <option>K</option>
          <option>Q</option>
        </select>
      </div>
    :
      <div>
        <img 
          onClick={() => this.props.type !== "divider" ? this.toggleCard(`${this.props.suit} ${this.props.value}`) : this.toggleCard(this.props.value)} 
          style={this.props.style}
          className="Card" 
          src={this.props.image} 
        />
      </div>


    return (
      cardPreview
    )
  }
}

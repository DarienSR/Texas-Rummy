import React, { Component } from 'react'
import "./Player.css";

export default class Player extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      selected: "",
      hand: [...this.props.hand]
    }
    this.GetCard = this.GetCard.bind(this)
    this.CallDiscardCard = this.CallDiscardCard.bind(this)
  }
  
  GetCard(e) {
    this.setState({selected: e.target.id})
  }

  CallDiscardCard() {
    // pass back selected card to board.
    this.props.DiscardCard(this.state.selected, this.props.id)
  }

  render() {
    return (
      <div>
        <div className="Player">
          {this.props.hand.map((card) => {
            return <button 
            style={this.state.selected === card.props.id ? {backgroundColor: "blue"} : {backgroundColor: "green"}} 
            onClick={this.GetCard}>{card}
                  </button>;
          })}
        </div>
        <button onClick={this.CallDiscardCard}>Discard</button>
      </div>
    )
  }
}

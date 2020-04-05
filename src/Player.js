import React, { Component } from 'react'
import Card from "./Card";
export default class Player extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      selected: ""
    }
  }
  

  toggleDiscard() {
    this.props.Discard(this.props.id, this.state.selected);
  }

  selectCard(selected) {
    this.setState({selected: selected})
  }

  render() {
    return (
      <div>
        <div style={this.props.style} className="PlayerHand">
          {this.props.hand.map((card) => {
            return <Card 
              style={this.state.selected === card.id ? {borderBottom: "5px solid black"} : null}
              select={(x) => this.selectCard(x)} 
              id={card.id} 
              suit={card.suit} 
              value={card.value} 
              image={card.image} 
            />
          })}
        </div>
        <button onClick={() => this.toggleDiscard()}>Discard Card</button>
      </div>
    )
  }
}

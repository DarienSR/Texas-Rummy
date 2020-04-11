import React, { Component } from 'react'
import Card from "./Card";
export default class Player extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      selected: "",
      score: 0
    }
  }
  
  toggleDiscard() {
    this.props.Discard(this.props.id, this.state.selected);
  }

  handleOrganizeHand(increment) {
    this.props.OrganizeHand(increment, this.state.selected, this.props.id)
  }

  selectCard(selected) {
    this.setState({selected: selected})
  }
  
  render() {
    return (
      <div>        
        <div 
        style={this.props.style} className="PlayerHand">
          {this.props.hand.map((card) => {
            return <Card 
              className="Playercard"
              style={this.state.selected === card.id ? {borderBottom: "5px solid black"} : null}
              select={(x) => this.selectCard(x)} 
              key={card.id} 
              suit={card.suit} 
              value={card.value} 
              image={card.image} 
            />
          })}
        </div>

        <div className="Player-Controls">
          <button onClick={() => this.toggleDiscard()}>Discard Card</button>
          
          <button onClick={() => this.handleOrganizeHand(-1)}>left</button>
          <button onClick={() => this.handleOrganizeHand(1)}>right</button>

          <button>OUT</button>
        </div>

      </div>
    )
  }
}

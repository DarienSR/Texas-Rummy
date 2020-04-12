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

  handleOut() {
    this.props.Out(this.props.id)
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
            if(card.type === undefined)
              return <Card 
                className="Playercard"
                style={this.state.selected === card.id ? {borderBottom: "5px solid black"} : null}
                select={(x) => this.selectCard(x)} 
                key={card.id} 
                suit={card.suit} 
                value={card.value} 
                image={card.image} 
              />
            else
              return <Card 
                className="Playerdivider"
                style={this.state.selected === card.id ? {borderBottom: "5px solid black"} : null}
                select={(x) => this.selectCard(x)} 
                key={card.id} 
                id={card.id}
                value={card.value} 
                type={card.type}
              />
          })}
        </div>

        <div className="Player-Controls">
          <button onClick={() => this.toggleDiscard()}>Discard Card</button>
          
          <div className="Player-Controls-Center">
            <div>
              <button onClick={() => this.handleOrganizeHand(-1)}>left</button>
              <button onClick={() => this.handleOrganizeHand(1)}>right</button>
            </div>
            <div>
              <button onClick={() => this.handleOrganizeHand("|")}>Add Divider</button>
              <button onClick={() => this.handleOrganizeHand("-|")}>Remove Divider</button>
            </div>
          </div>

          <button onClick={() => this.handleOut()}>OUT</button>
        </div>

      </div>
    )
  }
}

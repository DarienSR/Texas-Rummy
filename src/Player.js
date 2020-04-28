import React, { Component } from 'react'
import Card from "./Card";
export default class Player extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      selected: "",
      score: 0
    }
    this.handleChangeInfo= this.handleChangeInfo.bind(this)
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

  handleChangeInfo(y, idx) {
    this.props.ChangeInfo(y, idx);
  }
  
  selectCard(selected) {
    this.setState({selected: selected})
  }

  render() {
    return (
      <div style={this.props.isOut ? {backgroundColor: "green"} : null}>        
        <div 
          style={this.props.style} 
          className="PlayerHand"
        >
          {this.props.hand.map((card, idx) => {
            let isWild;

            if(card.value == this.props.wild || card.id === "SPADES 2" || card.id === "CLUBS 2" || card.hasChanged) isWild = true;
            if(card.type === undefined)
              return <Card 
                className="Playercard"
                style={this.state.selected === card.id ? {borderBottom: "5px solid black"} : null}
                select={(x) => this.selectCard(x)} 
                key={card.id} 
                suit={card.suit} 
                value={card.value} 
                image={card.image} 
                isWild={isWild}
                ChangeInfo={this.handleChangeInfo}
                idx={idx}
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

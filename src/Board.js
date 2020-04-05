import React, { Component } from 'react'
import Deck from "./GetCards";
import Card from "./Card";
import Player from "./Player";
import "./Board.css";

export default class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: [],
      discardPile: [],
      playerOneHand: [],
      playerTwoHand: [],
      hasPickedUp: false,
      currentTurn: true
    }
    this.DiscardCard = this.DiscardCard.bind(this)
  }

  componentDidMount() {
    let deck = Deck, p1Hand = [], p2Hand = [], discard = [];
    StartGame(deck, p1Hand, p2Hand, discard);
    this.setState({playerOneHand: p1Hand, playerTwoHand: p2Hand, discardPile: discard, deck: deck})
  }

  PickUpCard() {
    if(this.state.hasPickedUp) return;

    


    let playerHand, player;
    if(this.state.currentTurn) {
      playerHand = "playerOneHand";
      player = this.state.playerOneHand;
    } else {
      playerHand = "playerTwoHand";
      player = this.state.playerTwoHand;
    }

    let card = this.state.deck.shift();
    this.setState({[playerHand]: [...player, card], hasPickedUp: !this.state.hasPickedUp});
  }

  DiscardCard(id, selected) {
    if(id === 1 && this.state.currentTurn === false) return;
    if(id === 2 && this.state.currentTurn === true) return;
    if(!this.state.hasPickedUp) return;

    let playerHand, player, discarded;

    if(id === 1) {
      playerHand = "playerOneHand";
      player = this.state.playerOneHand;
    } else {
      playerHand = "playerTwoHand";
      player = this.state.playerTwoHand;
    }
    
    player.forEach((card, i) => {
      if(card.id === selected) {
        discarded = player.splice(i, 1);
      }
    });
      console.log(discarded)

    this.setState(
      {
        [playerHand]: player, 
        discardPile: [...this.state.discardPile, discarded[0]], 
        hasPickedUp: !this.state.hasPickedUp, 
        currentTurn: !this.state.currentTurn 
      }
    )
  }

  render() {
    return (
      <div className="Board">
        <div>
          <Player 
            style={!this.state.currentTurn ? {backgroundColor: "orange"} : null} 
            Discard={this.DiscardCard} id={2} 
            hand={this.state.playerTwoHand} /
          >
        </div>

        <div className="Board-Middle">
          <div>
            <Card image={this.state.discardPile[0] ? this.state.discardPile[this.state.discardPile.length - 1].image : null} />
          </div>
          <button className="Card" onClick={() => this.PickUpCard()}></button>
        </div>
          
        <div>
          <Player 
            style={this.state.currentTurn ? {backgroundColor: "orange"} : null} 
            Discard={this.DiscardCard} 
            id={1} 
            hand={this.state.playerOneHand} 
          />
        </div>
      </div>
    )
  }
}

function StartGame(deck, p1Hand, p2Hand, discard) {
  // Generate a shuffled deck (importing).
  deck.forEach((card) => {
    card.id = `${card.suit} ${card.value}`;
  })
  // deal 3 cards to each player
  for(let i = 0; i < 3; i++) {
    // pops card from top of the deck and puts it in players hand
    p1Hand.push(deck.shift());
    p2Hand.push(deck.shift());
  }
  // add one card to discard pile
  discard.push(deck.shift());

  return deck, p1Hand, p2Hand, discard;
}
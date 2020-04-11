import React, { Component } from 'react'
import Deck, { StartGame } from "./GetCards";
import Player from "./Player";
import "./Board.css";
import CheckIfOut from "./CheckIfOut";
import { v4 as uuid } from 'uuid';
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
    this.OrganizeHand = this.OrganizeHand.bind(this)
    this.Out = this.Out.bind(this)
  }

  componentDidMount() {
    let deck = Deck, p1Hand = [], p2Hand = [], discard = [];
    StartGame(deck, p1Hand, p2Hand, discard);
    this.setState({playerOneHand: p1Hand, playerTwoHand: p2Hand, discardPile: discard, deck: deck})
  }

  PickUpCard(fromDiscard) {
    if(this.state.hasPickedUp) return;

    let playerHand, player, card;
    if(this.state.currentTurn) {
      playerHand = "playerOneHand";
      player = this.state.playerOneHand;
    } else {
      playerHand = "playerTwoHand";
      player = this.state.playerTwoHand;
    }
    
    if(fromDiscard) {
      card = this.state.discardPile.pop();
      this.setState({[playerHand]: [...player, card], hasPickedUp: !this.state.hasPickedUp, discardPile: [...this.state.discardPile]});
    } else {
      card = this.state.deck.shift();
      this.setState({[playerHand]: [...player, card], hasPickedUp: !this.state.hasPickedUp});
    }
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
      if(card.id === selected) discarded = player.splice(i, 1);
    });

    this.setState(
      {
        [playerHand]: player, 
        discardPile: [...this.state.discardPile, discarded[0]], 
        hasPickedUp: !this.state.hasPickedUp, 
        currentTurn: !this.state.currentTurn 
      }
    )
  }

  OrganizeHand(increment, selected, id) {
    let playerHand, player;

    if(id === 1) {
      playerHand = "playerOneHand";
      player = this.state.playerOneHand;
    } else {
      playerHand = "playerTwoHand";
      player = this.state.playerTwoHand;
    }
    
    if(increment === -1 || increment === 1) {
      player.forEach((card, i) => {
        if(card.id === selected) {
          if(player[i+increment] === undefined) return;
          let temp = player[i];
          player[i] = player[i+increment]
          player[i+increment] = temp;
          return
        }
      });
    } else {
      player.forEach((card, i) => {
        if(card.id === selected) {
          if(player[i+1] === undefined) return;
          if(increment === "|") {
            if(player[i+1].type === "divider") return;
            if(player[i].type === "divider") return;
            let ranId = uuid();
            player.splice(i+1, 0, {id: ranId, value: ranId, type: "divider"});
          } else {
            if(player[i].type !== "divider") return;
            player.splice(i,1);
          }
        }
      });
    }

    this.setState({[playerHand]: player})
  }

  Out(id) {
    if(id === 1) {
      CheckIfOut(this.state.playerOneHand)
    } else {
      CheckIfOut(this.state.playerTwoHand)
    }
  }

  render() {
    return (
      <div className="Board">
        <div>
          <Player 
            style={!this.state.currentTurn ? {backgroundColor: "orange"} : null} 
            Discard={this.DiscardCard} 
            id={2} 
            hand={this.state.playerTwoHand} 
            OrganizeHand={this.OrganizeHand}
            Out={this.Out}
          />
        </div>

        <div className="Board-Middle">
          <button onClick={() => this.PickUpCard(true)} >
            <img className="Card"
              alt="Discard Pile"
              src={this.state.discardPile[0] ? this.state.discardPile[this.state.discardPile.length - 1].image : null} 
            />
          </button>
          <button className="Card" onClick={() => this.PickUpCard()}></button>
        </div>
          
        <div>
          <Player 
            style={this.state.currentTurn ? {backgroundColor: "orange"} : null} 
            Discard={this.DiscardCard} 
            id={1} 
            hand={this.state.playerOneHand} 
            OrganizeHand={this.OrganizeHand}
            Out={this.Out}
          />
        </div>
      </div>
    )
  }
}


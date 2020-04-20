import React, { Component } from 'react'
import Deck, { StartGame } from "./GetCards";
import Player from "./Player";
import "./Board.css";
import CheckIfOut from "./CheckIfOut";
import ComputersTurn from "./ComputersTurn";
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
      currentTurn: true,
      lastMove: false,
      resetRound: false,
      currentWildCard: "3",
      currentHand: 3 // STARTING
    }
    this.DiscardCard = this.DiscardCard.bind(this)
    this.OrganizeHand = this.OrganizeHand.bind(this)
    this.Out = this.Out.bind(this)
    this.GetComputersTurn = this.GetComputersTurn.bind(this)
  }

  componentDidMount() {
    let deck = Deck, p1Hand = [], p2Hand = [], discard = [];
    StartGame(deck, p1Hand, p2Hand, discard, this.state.currentHand);
    this.setState({playerOneHand: p1Hand, playerTwoHand: p2Hand, discardPile: discard, deck: deck})
  }

  PickUpCard(fromDiscard) {
    if(this.state.hasPickedUp || this.state.resetRound) return;
    
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
    if(!this.state.hasPickedUp || this.state.resetRound) return;
    if(selected.length > 15) return; // we know this is a uuid, not a valid card

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

    if(discarded === undefined) return;

    if(!this.state.lastMove) {
      this.setState(
        {
          [playerHand]: player, 
          discardPile: [...this.state.discardPile, discarded[0]], 
          hasPickedUp: !this.state.hasPickedUp, 
          currentTurn: !this.state.currentTurn 
        }
        )
    } else {
      this.setState({[playerHand]: player, resetRound: true})
    }
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
          return;
        }
      });
    } else {
      player.forEach((card, i) => {
        if(card.id === selected) {
          let check = "divider", ranId = uuid();
          if(player[i+1] === undefined) return;
          if(increment === "|") {
            if(player[i+1].type === check || player[i].type === check) return;
            player.splice(i+1, 0, {id: ranId, value: ranId, type: "divider"});
          } else {
            if(player[i].type !== check) return;
            player.splice(i,1);
          }
          return;
        }
      });
    }

    this.setState({[playerHand]: player})
  }

  Out() {
    let isValid;
    if(!this.state.currentTurn) {
      isValid = CheckIfOut(this.state.playerOneHand, this.state.currentWildCard)
    } else {
      isValid = CheckIfOut(this.state.playerTwoHand, this.state.currentWildCard)
    }

    if(isValid) {
      this.setState({lastMove: true})
    }
    console.log(isValid)
  }

  ResetRound() {
    let number = this.state.currentHand;
    let deck = Deck, p1Hand = [], p2Hand = [], discard = [], wild;
    number++
    StartGame(deck, p1Hand, p2Hand, discard, number);
    
    switch(number) {
      case 11:
        wild = "J";
        break;
      case 12:
        wild = "K";
        break;
      case 13: 
        wild = "Q"
        break;
      case wild >= 14:
        wild = "GAME FINISHED"
        break;
      default:
        wild = number;
        break;
    }

    AddScore()

    this.setState({
      playerOneHand: p1Hand, 
      playerTwoHand: p2Hand, 
      discardPile: discard, 
      deck: deck,
      currentWildCard: wild,
      currentHand: number,
      hasPickedUp: false,
      currentTurn: true,
      lastMove: false,
      resetRound: false,
    });

  }

  AddScore() {
    // divide hand by dividers
    // pass each division and see if out
    // if not out, add up cards
    // move on to next division
  }

  OverwriteCard() {
    let idx = prompt();
    let value = prompt();
    let suit = prompt();
    let image = prompt();
    let newCard = {
      value: value,
      suit: suit,
      image: `./cards/${image}.png`,
      id: `${suit} ${value}`
    }

    let playerHand = this.state.playerOneHand;
    playerHand[idx] = newCard
    this.setState({playerOneHand: playerHand})
  }

  GetComputersTurn() {
    ComputersTurn(this.state.playerTwoHand, this.state.discardPile, this.state.currentWildCard);
  }

  render() {
    if(this.state.currentTurn === false) this.GetComputersTurn();
    let nextRound;
    if(this.state.resetRound) nextRound = <button onClick={() => this.ResetRound()}>NEXT ROUND</button>

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
        {nextRound}
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
        <button onClick={() => this.OverwriteCard()}>OVERWRITE</button>
      </div>
    )
  }
}


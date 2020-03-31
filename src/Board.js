import React, { Component } from 'react'
import Card from "./Card";
import Player from "./Player";
import "./Board.css";

const axios = require('axios');
export default class Board extends Component {
  async setDeck() {
    const info = await this.getDeck();
    let arr = [];
    info.forEach(card => arr.push({ value: card.value, suit: card.suit, image: card.image }));
    return arr;
  }
  
  async getDeck() {
    let arr = [];
    const deckIdPromise = await axios.get("https://deckofcardsapi.com/api/deck/new/");
    await axios.get(`https://deckofcardsapi.com/api/deck/${deckIdPromise.data.deck_id}/draw/?count=52`)
      .then((deck) => {
        for(let i = 0; i < 52; i++) {
          arr.push(deck.data.cards[i])
        };
    });
    return arr
  }

  constructor(props) {
    super(props)
    
    this.state = {
      deck: [],
      discarded: [],
      playerOneHand: [],
      playerTwoHand: []
    }
    this.DiscardCard = this.DiscardCard.bind(this)
  }

  async componentDidMount() {
    const res = await this.setDeck();
    let deck = res.map((card) => { return <Card id={`${card.value} ${card.suit}`} suit={card.suit} value={card.value} image={card.image} /> })
    let p1 = [];
    let p2 = [];

    // shuffle deck, our own shuffle algoritm. 
    shuffle(deck)
    // deal 3 cards to each player
    for(let i = 0; i < 3; i++) {
      // pops card from top of the deck and puts it in players hand
      p1.push(deck.shift());
      p2.push(deck.shift());
    }
    // set deck to remaining cards
    this.setState({deck: deck, playerOneHand: p1, playerTwoHand: p2})
  }
  
  PullCard() {
    let card = this.state.deck.shift();
    this.setState({playerOneHand: [...this.state.playerOneHand, card]})
  }

  DiscardCard(selected, id) {
    let player, discarded, newPlayerHand;
    if(id === 1) player = this.state.playerOneHand;
    else         player = this.state.playerTwoHand;
    
    // loop through players hand, find card.
    player.forEach((card, i) => {
      if(card.props.id === selected) {
        discarded = player.splice(i, 1);
        newPlayerHand = player;
      }
    });

    this.setState({[player]: newPlayerHand, discarded: [...this.state.discarded, discarded]})
  }
  
  render() {
    return (
      <div ClassName="Board">
        <div className="Card-Container">
          <Player DiscardCard={this.DiscardCard} id={2} hand={this.state.playerTwoHand} />
        
          <div className="Card-Pile">
            <div className="Discarded">
             {this.state.discarded[this.state.discarded.length - 1]}
            </div>
            <div className="Divider"></div>
            <button onClick={() => this.PullCard()}>
              <img className="pull" src="https://i.pinimg.com/originals/11/45/96/11459640e599fd105943f5a379d25248.jpg" />
            </button>
            {/* <h2>Score</h2> */}
          </div>

          <Player DiscardCard={this.DiscardCard} id={1} hand={this.state.playerOneHand} />
        </div>
      </div>
    )
  }
}

function shuffle(arr) {
    for(let i = 0; i < 1000; i++) {
      // generate two random numbers
      let x = Math.floor(Math.random() * 52)
      let y = Math.floor(Math.random() * 52)
      // swap two random indexs in our dex.
      let temp = arr[x];
      arr[x] = arr[y];
      arr[y] = temp;
    }
    return arr
}
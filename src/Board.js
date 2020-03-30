import React, { Component } from 'react'
import Card from "./Card";
import Player from "./Player";
import "./Board.css";

const axios = require('axios');
export default class Board extends Component {
  async setDeck() {
    const info = await this.getDeck();
    let arr = [];
    console.log(info)
    info.forEach(card => arr.push({value: card.value, suit: card.suit, image: card.image}));
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
  }

  async componentDidMount() {
    const res = await this.setDeck();
    let deck = res.map((card) => { return <Card suit={card.suit} value={card.value} image={card.image} /> })
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
  }

  PullCard() {
    let card = this.state.deck.shift();
    this.setState({playerOneHand: [...this.state.playerOneHand, card]})
  }

  render() {
    return (
      <div ClassName="Board">
        <div className="Card-Container">
          <Player hand={this.state.playerTwoHand} />
        
          <div className="Card-Pile">
            {this.state.deck[8]}
            <button onClick={() => this.PullCard()}>
              <img className="pull" src="https://i.pinimg.com/originals/11/45/96/11459640e599fd105943f5a379d25248.jpg" />
            </button>
            {/* <h2>Score</h2> */}
          </div>

          <Player hand={this.state.playerOneHand} />
          <button>Discard</button>
        </div>
      </div>
    )
  }
}

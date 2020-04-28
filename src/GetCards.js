
let deck = [
  {value: "A", suit: "SPADES", image: "./cards/AS.png", isWild: false},
  {value: "2", suit: "SPADES", image: "./cards/2S.png", isWild: true},
  {value: "3", suit: "SPADES", image: "./cards/3S.png", isWild: false},
  {value: "4", suit: "SPADES", image: "./cards/4S.png", isWild: false},
  {value: "5", suit: "SPADES", image: "./cards/5S.png", isWild: false},
  {value: "6", suit: "SPADES", image: "./cards/6S.png", isWild: false},
  {value: "7", suit: "SPADES", image: "./cards/7S.png", isWild: false},
  {value: "8", suit: "SPADES", image: "./cards/8S.png", isWild: false},
  {value: "9", suit: "SPADES", image: "./cards/9S.png", isWild: false},
  {value: "10", suit: "SPADES", image: "./cards/10S.png", isWild: false},
  {value: "J", suit: "SPADES", image: "./cards/JS.png", isWild: false},
  {value: "Q", suit: "SPADES", image: "./cards/QS.png", isWild: false},
  {value: "K", suit: "SPADES", image: "./cards/KS.png", isWild: false},
  {value: "A", suit: "DIAMONDS", image: "./cards/AD.png", isWild: false},
  {value: "2", suit: "DIAMONDS", image: "./cards/2D.png", isWild: false},
  {value: "3", suit: "DIAMONDS", image: "./cards/3D.png", isWild: false},
  {value: "4", suit: "DIAMONDS", image: "./cards/4D.png", isWild: false},
  {value: "5", suit: "DIAMONDS", image: "./cards/5D.png", isWild: false},
  {value: "6", suit: "DIAMONDS", image: "./cards/6D.png", isWild: false},
  {value: "7", suit: "DIAMONDS", image: "./cards/7D.png", isWild: false},
  {value: "8", suit: "DIAMONDS", image: "./cards/8D.png", isWild: false},
  {value: "9", suit: "DIAMONDS", image: "./cards/9D.png", isWild: false},
  {value: "10", suit: "DIAMONDS", image: "./cards/10D.png", isWild: false},
  {value: "J", suit: "DIAMONDS", image: "./cards/JD.png", isWild: false},
  {value: "Q", suit: "DIAMONDS", image: "./cards/QD.png", isWild: false},
  {value: "K", suit: "DIAMONDS", image: "./cards/KD.png", isWild: false},
  {value: "A", suit: "HEARTS", image: "./cards/AH.png", isWild: false},
  {value: "2", suit: "HEARTS", image: "./cards/2H.png", isWild: false},
  {value: "3", suit: "HEARTS", image: "./cards/3H.png", isWild: false},
  {value: "4", suit: "HEARTS", image: "./cards/4H.png", isWild: false},
  {value: "5", suit: "HEARTS", image: "./cards/5H.png", isWild: false},
  {value: "6", suit: "HEARTS", image: "./cards/6H.png", isWild: false},
  {value: "7", suit: "HEARTS", image: "./cards/7H.png", isWild: false},
  {value: "8", suit: "HEARTS", image: "./cards/8H.png", isWild: false},
  {value: "9", suit: "HEARTS", image: "./cards/9H.png", isWild: false},
  {value: "10", suit: "HEARTS", image: "./cards/10H.png", isWild: false},
  {value: "J", suit: "HEARTS", image: "./cards/JH.png", isWild: false},
  {value: "Q", suit: "HEARTS", image: "./cards/QH.png", isWild: false},
  {value: "K", suit: "HEARTS", image: "./cards/KH.png", isWild: false},
  {value: "A", suit: "CLUBS", image: "./cards/AC.png", isWild: false},
  {value: "2", suit: "CLUBS", image: "./cards/2C.png", isWild: true},
  {value: "3", suit: "CLUBS", image: "./cards/3C.png", isWild: false},
  {value: "4", suit: "CLUBS", image: "./cards/4C.png", isWild: false},
  {value: "5", suit: "CLUBS", image: "./cards/5C.png", isWild: false},
  {value: "6", suit: "CLUBS", image: "./cards/6C.png", isWild: false},
  {value: "7", suit: "CLUBS", image: "./cards/7C.png", isWild: false},
  {value: "8", suit: "CLUBS", image: "./cards/8C.png", isWild: false},
  {value: "9", suit: "CLUBS", image: "./cards/9C.png", isWild: false},
  {value: "10", suit: "CLUBS", image: "./cards/10C.png", isWild: false},
  {value: "J", suit: "CLUBS", image: "./cards/JC.png", isWild: false},
  {value: "Q", suit: "CLUBS", image: "./cards/QC.png", isWild: false},
  {value: "K", suit: "CLUBS", image: "./cards/KC.png", isWild: false}
]









shuffle(deck)
export default deck;
export function StartGame(deck, p1Hand, p2Hand, discard, number) {
console.log(number)
  // Generate a shuffled deck (importing).
  deck.forEach((card) => {
    card.id = `${card.suit} ${card.value}`;
  })
  // deal 3 cards to each player
  for(let i = 0; i < parseInt(number); i++) {
    // pops card from top of the deck and puts it in players hand
    p1Hand.push(deck.shift());
    p2Hand.push(deck.shift());
  }
  // add one card to discard pile
  discard.push(deck.shift());

  return deck, p1Hand, p2Hand, discard;
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
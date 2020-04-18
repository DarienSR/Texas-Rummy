let hand = [
  {value: "9", suit: "SPADES", image: "./cards/JC.png", id: "SPADES 9"},
  {value: "10", suit: "SPADES", image: "./cards/7D.png", id: "SPADES 10"},
  {value: "J", suit: "SPADES", image: "./cards/KD.png", id: "SPADES J"},
  {id: "fbcff3c1-75e8-4796-9ae0-66d920d22c71", value: "fbcff3c1-75e8-4796-9ae0-66d920d22c71", type: "divider"},
  {value: "K", suit: "CLUBS", image: "./cards/AS.png", id: "CLUBS K"},
  {value: "K", suit: "SPADES", image: "./cards/KC.png", id: "SPADES K"},
  {value: "2", suit: "CLUBS", image: "./cards/3C.png", id: "CLUBS 2"}
]

// TO DO: TEST CASE 3, WILD CARD, INVALID

const valueOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let wildcard = "6";

let subArr = [], start = 0, invalid = false;

for(let i = 0; i < hand.length - 1; i++) {
  // seperate by divider
  if(hand[i].type === "divider") {
    subArr.push(hand.slice(start, i))
    start = i+1;  
  }
}

// push remaining
subArr.push(hand.slice(start, hand.length))

for(let i = 0; i < subArr.length; i++) {
  // create array with cards that do not have same suit as first card.
  let check = subArr[i].every(card => card.suit === subArr[i][0].suit);

  if(check) {
    console.log("run")
    // we have a run
    let count = 1;
    for(let j = 0; j < subArr[i].length - 1; j++) {
      if(subArr[i][count].value !== undefined) {
        let checkIfWild = subArr[i][count].value === wildcard || subArr[i][count].id === "SPADES 2" || subArr[i][count].id === "CLUBS 2";
        // finds card position in compare hand.
        let compare = valueOrder.indexOf(subArr[i][j].value);
        // find what the next card SHOULD BE
        compare++;
        

        if(checkIfWild) {
          // next card is a wild card.
          console.log("Wild Card Found", j)
          subArr[i][count] = {value: valueOrder[compare]}
        }

        // check next value
        if(subArr[i][count].value !== valueOrder[compare] && checkIfWild === false) console.log(false)
      }
      console.log(subArr)
      count++;
    }
  } else {
    console.log("values")
    // we are looking at the values

    let sameValues = subArr[i].every(card => card.value === subArr[i][0].value)

    if(!sameValues) {
      // we want to filter out wild cards
      let checkForWilds = subArr[i].filter(card => card.value !== wildcard)
                                   .filter(card => card.id !== "SPADES 2")
                                   .filter(card => card.id !== "CLUBS 2")
                                   
    checkForWilds = checkForWilds.every(card => card.value === subArr[i][0].value)
    console.log(checkForWilds)
    if(!checkForWilds) console.log(false)                  
     
    }
  }
}


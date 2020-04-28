let hand = [
  {value: "9", suit: "HEARTS", image: "./cards/3C.png", id: "HEARTS 9"},
  {value: "3", suit: "HEARTS", image: "./cards/AS.png", id: "DIAMONDS 3"},
  {value: "9", suit: "SPADES", image: "./cards/AS.png", id: "SPADES 9"},
  {value: "9", suit: "SPADES", image: "./cards/AS.png", id: "SPADES 9"},
  // {value: "Q", suit: "DIAMONDS", image: "./cards/KC.png", id: "DIAMONDS Q"},
]

// TO DO: TEST CASE 3, WILD CARD, INVALID

const valueOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q"];

let wildcard = "3";

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


  let checkForWilds = subArr[i].filter(card => card.value !== wildcard)
                                   .filter(card => card.id !== "SPADES 2")
                                   .filter(card => card.id !== "CLUBS 2")

  console.log("---", checkForWilds)
  // create array with cards that do not have same suit as first card.
  let check = checkForWilds.every(card => card.suit === checkForWilds[0].suit);

  if(check) {
    console.log("run")
    // we have a run
    if(checkForWilds.length !== check.length) {
      // we have wild cards that need to be replaced
     
      for(let j = 0; j < subArr[i].length; j++) {
        if(subArr[i][j].value === wildcard || subArr[i][j].id === "SPADES 2" || subArr[i][j].id === "CLUBS 2") {
          let replaceWith;
          if(j === 0) {
            replaceWith = valueOrder.indexOf(subArr[i][j + 1].value);
            replaceWith--
          } else {
            replaceWith = valueOrder.indexOf(subArr[i][j - 1].value);
            replaceWith++;
          }
          // replace wild with proper card
          subArr[i][j].value = valueOrder[replaceWith]
        }
      }

      let compare = valueOrder.indexOf(subArr[i][0].value)
      
      for(let j = 0; j < subArr[i].length; j++) {
        // console.log(subArr[i][j].value , valueOrder[compare])
        console.log(subArr[i][j].value, valueOrder[compare])
        if(subArr[i][j].value !== valueOrder[compare]) console.log(false);
        compare++
      }
    }
  } else {
    let j;
    if(subArr[i][0].value === wildcard || subArr[i][0].id === "SPADES 2" || subArr[i][0].id === "CLUBS 2") j = 1;
    else j = 0;
    console.log("values")
    // we are looking at the values

    let sameValues = subArr[i].every(card => card.value === subArr[i][j].value)

    if(!sameValues) {
      // we want to filter out wild cards
      let checkForWilds = subArr[i].filter(card => card.value !== wildcard)
                                   .filter(card => card.id !== "SPADES 2")
                                   .filter(card => card.id !== "CLUBS 2")
                                   
    checkForWilds = checkForWilds.every(card => card.value === subArr[i][j].value)
    if(!checkForWilds) console.log(false)                  
    }
  }
}


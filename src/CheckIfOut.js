export default function CheckIfOut(hand, wildcard) {
  const valueOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  // loop through hand checking order. See if it matches conditions.
  // create an array of arrays, seperate by divider.
  for(let i = 0; i < hand.length - 1; i++) {
    if(hand[i].type !== "divider" || hand !== undefined) {
      if(hand[i].value === wildcard && hand[i].id === "SPADES 2" && hand[i].id === "CLUBS 2") {
        if(hand[i].suit === hand[i+1].suit) {
          // same suit
          let compare = valueOrder.indexOf(hand[i].value);
           
          if(hand[i].value + hand[i+1].value !== valueOrder[compare] + valueOrder[compare+1]) return false;
          // check if values are in correct order
        } else {
          // check if values are all different
          if(hand[i].value !== hand[i+1].value) return false
        }
      }
    }
  }
  return true
}


// value: 5
// suit : "HEARTS"
// id: "HEARTS 5"
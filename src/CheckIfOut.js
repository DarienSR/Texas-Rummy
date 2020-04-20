export default function CheckIfOut(hand, wildcard) {
  const valueOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q"];

  let subArr = [], start = 0

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
       let checkCurrentCardWild = subArr[i][j].value === wildcard || subArr[i][j].id === "SPADES 2" || subArr[i][j].id === "CLUBS 2";
        if(subArr[i][count].value !== undefined && !checkCurrentCardWild) {
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
          if(subArr[i][count].value !== valueOrder[compare] && checkIfWild === false) return false
        }
        console.log(subArr)
        count++;
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
      if(!checkForWilds) return false                  
      }
    }
  }
  return true;

  // for(let i = 0; i < hand.length - 1; i++) {
  //   let cardVal = hand[i].value;
  //   let nextCard = hand[i+1];
  //   if(hand[i].type !== "divider") {
  //     // check if wild
  //     let nextCardCheckIsWild = nextCard.value === wildcard || nextCard.id === "SPADES 2" || nextCard.id === "CLUBS 2"
  //     if(cardVal === wildcard || hand[i].id === "SPADES 2" || hand[i].id === "CLUBS 2") {
  //     } else {
  //       if(hand[i].suit === nextCard.suit) {
  //         // same suit, CHECK FOR RUN
  //         let compare = valueOrder.indexOf(cardVal);
           
  //         if(cardVal + nextCard.value !== valueOrder[compare] + valueOrder[compare+1] 
  //           && nextCardCheckIsWild === false && nextCard.type !== "divider") return false;

  //         // check if values are in correct order
  //       } else {
  //         // if values are different, return. 
  //         if(cardVal !== nextCard.value && nextCardCheckIsWild === false && nextCard.type !== "divider") return false
  //       }
  //     }
  //   }
  // }
  // return true
}


// value: 5
// suit : "HEARTS"
// id: "HEARTS 5"
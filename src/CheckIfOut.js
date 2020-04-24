export default function DivideHand(hand) {
  
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
  return subArr;
}


export function CheckIfOut(subArr, wildcard) {
  // INSTEAD OF DIRECTILY CHANGING SUBARRAY DO ARR = SUBARRAY, THEN REPLACE SUBARRAY WITH ARR BELOW
  let arr = subArr;

  console.log("currently wild: ", wildcard)
  const valueOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q"];
  for(let i = 0; i < arr.length; i++) {
    let checkForWilds = arr[i].filter(card => card.value !== wildcard)
    .filter(card => card.id !== "SPADES 2")
    .filter(card => card.id !== "CLUBS 2")
    
    // create array with cards that do not have same suit as first card.
    console.log("--REMOVING ALL WILDS--")
    console.log(checkForWilds)
    console.log("--REMOVING ALL WILDS--")
    let check = checkForWilds.every(card => card.suit === checkForWilds[0].suit);
    
    if(check) {
      console.log("run")
     
      // we have a run
      if(checkForWilds.length !== check.length) {
        // we have wild cards that need to be replaced
       
        for(let j = 0; j < arr[i].length; j++) {
          if(arr[i][j].value === wildcard || arr[i][j].id === "SPADES 2" || arr[i][j].id === "CLUBS 2") {
            let replaceWith;
            if(j === 0) {
              replaceWith = valueOrder.indexOf(arr[i][j + 1].value);
              replaceWith--
            } else {
              replaceWith = valueOrder.indexOf(arr[i][j - 1].value);
              replaceWith++;
            }
            // replace wild with proper card
            arr[i][j].value = valueOrder[replaceWith]
          }
        }
  
        let compare = valueOrder.indexOf(arr[i][0].value)
        
        for(let j = 0; j < arr[i].length; j++) {
          // console.log(subArr[i][j].value , valueOrder[compare])
          
          if(arr[i][j].value !== valueOrder[compare]) return false;
          compare++
        }
      }
    } else {
      console.log("value")
      let j;
      if(arr[i][0].value === wildcard || arr[i][0].id === "SPADES 2" || arr[i][0].id === "CLUBS 2") j = 1;
      else j = 0;
      
      // we are looking at the values
  
      let sameValues = arr[i].every(card => card.value === arr[i][j].value)
  
      if(!sameValues) {
        // we want to filter out wild cards
        let checkForWilds = arr[i].filter(card => card.value !== wildcard)
                                     .filter(card => card.id !== "SPADES 2")
                                     .filter(card => card.id !== "CLUBS 2")
                                     
      checkForWilds = checkForWilds.every(card => card.value === arr[i][j].value)
      if(!checkForWilds) return false;                  
      }
    }
  }
  return true;  
}
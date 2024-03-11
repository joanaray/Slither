const buttons = document.querySelectorAll(".board-dots button");
let userTurn = 0;
let inactiveButtonsList = [];
let availableInactiveButtons = [];
//const adjacencyList = [  ["R1C2", "R1C3"],  ["R1C2", "R2C2"],  ["R1C3", "R2C3"],  ["R2C1", "R2C2"],  ["R2C1", "R3C1"],  ["R2C2", "R2C3"],  ["R2C2", "R3C2"],  ["R2C3", "R2C4"],  ["R2C3", "R3C3"],  ["R2C4", "R3C4"],  ["R3C1", "R3C2"],  ["R3C2", "R3C3"],  ["R3C2", "R4C2"],  ["R3C3", "R3C4"],  ["R3C3", "R4C3"],];

const adjacencies = [
  ["R1C2", "R1C3"],
  ["R1C2", "R2C2"],
  ["R1C3", "R2C3"],
  ["R2C1", "R2C2"],
  ["R2C1", "R3C1"],
  ["R2C2", "R2C3"],
  ["R2C2", "R3C2"],
  ["R2C3", "R2C4"],
  ["R2C3", "R3C3"],
  ["R2C4", "R3C4"],
  ["R3C1", "R3C2"],
  ["R3C2", "R3C3"],
  ["R3C2", "R4C2"],
  ["R3C3", "R3C4"],
  ["R3C3", "R4C3"],
];

//const adjacencies = ["R1C2 R1C3","R1C2 R2C2", "R1C3 R2C3", "R2C1 R2C2", "R2C1 R3C1", "R2C2 R2C3", "R2C2 R3C2", "R2C3 R2C4", "R2C3 R3C3", "R2C4 R3C4", "R3C1 R3C2", "R3C2 R3C3", "R3C2 R4C2", "R3C3 R3C4", "R3C3 R4C3"];

computerTurn = () => {
  let activeButtons = document.querySelectorAll("button.active");
  let inactiveButtons = document.querySelectorAll("button:not(.active)");
  let possibleMatches = [];
  console.log(inactiveButtons.length);

  inactiveButtons.forEach((inactiveButton) => {
    let inactiveButtonID = inactiveButton.getAttribute("id");
    for (i = 0; i < adjacencies.length; i++) {
      if (adjacencies[i].includes(inactiveButtonID)) {
        activeButtons.forEach((activeButton) => {
          let activeButtonID = activeButton.getAttribute('id');
          if (adjacencies[i].includes(activeButtonID)) {
            console.log(adjacencies[i] + " includes " + inactiveButtonID + ' and ' + activeButtonID);
            possibleMatches.push(inactiveButtonID);
          }
        });
      }
    }
  });
  console.log(possibleMatches);
  let randomMatch = possibleMatches[Math.floor(Math.random()*possibleMatches.length)];
  inactiveButtons.forEach((inactiveButton) => {
    let inactiveButtonID = inactiveButton.getAttribute("id");
  if(inactiveButtonID === randomMatch){
    inactiveButton.classList.add('active');
  }

  })
};
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    //if (userTurn === 0) {
    userTurn++;
    button.classList.add("active");
    computerTurn();
    //}
  });
});

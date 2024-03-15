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
    for (let i = 0; i < adjacencies.length; i++) {
      if (adjacencies[i].includes(inactiveButtonID)) {
        activeButtons.forEach((activeButton) => {
          let activeButtonID = activeButton.getAttribute("id");
          if (adjacencies[i].includes(activeButtonID)) {
            console.log(
              adjacencies[i] +
                " includes " +
                inactiveButtonID +
                " and " +
                activeButtonID
            );
            possibleMatches.push(inactiveButtonID);
          }
        });
      }
    }
  });
  console.log(possibleMatches);
  let randomMatch =
    possibleMatches[Math.floor(Math.random() * possibleMatches.length)];
  inactiveButtons.forEach((inactiveButton) => {
    let inactiveButtonID = inactiveButton.getAttribute("id");
    if (inactiveButtonID === randomMatch) {
      inactiveButton.classList.add("active");
      inactiveButton.classList.add("pc");
    }
  });
};

checkAdjacencies = (el, ef) => {
  let matching = 0;
  for (let i = 0; i < adjacencies.length; i++) {
    //if adjacency entry includes this button
    if (adjacencies[i].includes(el)) {
      //get all active buttons
      let activeButtons = document.querySelectorAll("button.active");
      activeButtons.forEach((activeButton) => {
        let activeButtonID = activeButton.getAttribute("id");
        //if adjacency entry includes any active button

        if (adjacencies[i].includes(activeButtonID)) {
          console.log("there is a match in " + adjacencies[i]);
          matching = 1;
        }
      });
    }
  }
  if (matching === 1) {
    ef.classList.add("active");
  } else {
    alert("Please choose a point connected to an already active one.");
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let currentButtonID = button.getAttribute("id");
    if (userTurn === 0) {
      userTurn++;
      button.classList.add("active");
      computerTurn();
    } else {
      if (button.classList.contains("active")) {
        console.log("This is already active");
      } else {
        console.log("this button's ID: " + currentButtonID);
        checkAdjacencies(currentButtonID, button);
        if (button.classList.contains("active")) {
          computerTurn();
        }
      }
    }
  });
});

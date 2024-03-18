const buttons = document.querySelectorAll(".board-dots button");
const lines = document.querySelectorAll(".line");
let firstTurn = true;
let userWin = false;
let lastPickedID = "";
let messageBoard = document.getElementById("message-board");
let resetButton = document.getElementById("reset-btn");

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
  ["R4C2", "R4C3"],
];

// reset / restart the game
resetButton.addEventListener("click", () => {
  buttons.forEach((button) => {
    button.classList.remove("user");
    button.classList.remove("pc");
    button.dataset.status = "";
    lastPickedID = "";
    messageBoard.innerHTML = "Your turn!";
    userWin = false;
    firstTurn = true;
  });
  lines.forEach((line) => {
    line.classList.remove("active");
  });
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    messageBoard.innerHTML = "Your turn!";
    let currentButtonID = button.getAttribute("id");

    // if it's the first turn, any vertex can be picked;
    if (firstTurn == 1) {
      firstTurn = false;
      button.classList.add("user"); // add user colour;
      button.dataset.status = "last-picked"; // mark it as the last picked vertex;
      computerTurn(currentButtonID); // computer takes its turn;
      button.dataset.status = ""; // remove "last-picked" status;
    } else {
      // check if that vertex was already picked;
      if (
        button.classList.contains("pc") ||
        button.classList.contains("user") ||
        button.dataset.status === "last-picked"
      ) {
        messageBoard.innerHTML =
          "This vertex was already picked. <br/> Choose an adjacent to the last one picked.";
      } else {
        let match = false;
        // check adjacencies list for one that matches the current button and the last picked one;
        let lastPicked = document.querySelector('[data-status="last-picked"]');
        for (let i = 0; i < adjacencies.length; i++) {
          if (
            adjacencies[i].includes(currentButtonID) &&
            adjacencies[i].includes(lastPickedID)
          ) {
            match = true;
            lastPicked.dataset.status = "";
          }
        }
        if (match === true) {
          button.classList.add("user"); // add user colour;
          button.dataset.status = "last-picked"; // mark it as the last picked vertex;
          connectVertexes(currentButtonID); // activate connecting line;

          computerTurn(currentButtonID); //let computer play;

          // Check who wins;
          if (userWin === false) {
            button.dataset.status = "";
            checkUserPlays();
          }
        } else {
          messageBoard.innerHTML =
            "Choose a vertex adjacent to the last one picked.";
        }
      }
    }
  });
});

//let computer play;
computerTurn = (e) => {
  let availableVertexes = document.querySelectorAll("[data-status]");
  let possibleMatches = [];
  lastPickedID = e;
  availableVertexes.forEach((availableVertex) => {
    // filter available vertexes;
    if (
      availableVertex.dataset.status === "" &&
      !(
        availableVertex.classList.contains("pc") ||
        availableVertex.classList.contains("user")
      )
    ) {
      let availableVertexID = availableVertex.getAttribute("id");
      // verify adjacencies with available the vertexes for possible matches;
      for (let i = 0; i < adjacencies.length; i++) {
        if (
          adjacencies[i].includes(availableVertexID) &&
          adjacencies[i].includes(e)
        ) {
          possibleMatches.push(availableVertexID);
        }
      }
    }
  });

  //check for available matches
  if (possibleMatches.length >= 1) {
    // pick a random match for the last picked vertex;
    let randomMatch =
      possibleMatches[Math.floor(Math.random() * possibleMatches.length)];
    availableVertexes.forEach((availableVertex) => {
      let availableVertexID = availableVertex.getAttribute("id");
      if (availableVertexID === randomMatch) {
        availableVertex.dataset.status = "last-picked";
        availableVertex.classList.add("pc");
        console.log("available random vertex: " + availableVertexID);
        console.log("last picked vertex: " + lastPickedID);

        // activate connecting line;
        connectVertexes(availableVertexID);

        // update the last picked vertex;
        lastPickedID = availableVertexID;
      }
    });
  } else {
    userWin = true;
    messageBoard.innerHTML = "User wins!";
  }
};

// Check if there are available vertexes for the user to play;
checkUserPlays = () => {
  let remainingUserPlays = 0;
  let availableVertexes = document.querySelectorAll("[data-status]");
  availableVertexes.forEach((availableVertex) => {
    if (
      !(
        availableVertex.classList.contains("user") ||
        availableVertex.classList.contains("pc") ||
        availableVertex.dataset.status === "last-picked"
      )
    ) {
      let availableVertexID = availableVertex.getAttribute("id");
      for (let j = 0; j < adjacencies.length; j++) {
        if (adjacencies[j].includes(availableVertexID)) {
          if (adjacencies[j].includes(lastPickedID)) {
            remainingUserPlays++;
          }
        }
      }
    }
  });

  // if not, then computer wins;
  if (remainingUserPlays === 0) {
    messageBoard.innerHTML = "Computer wins!";
  }
};

connectVertexes = (cid) => {
  lines.forEach((line) => {
    if (line.classList.contains(cid) && line.classList.contains(lastPickedID)) {
      console.log("it connects!");
      line.classList.add("active");
    }
  });
};

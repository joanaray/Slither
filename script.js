const buttons = document.querySelectorAll(".board-dots button");
let firstTurn = true;
let userWin = false;
let lastPickedID = "";

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

buttons.forEach((button) => {
  button.addEventListener("click", () => {
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
        alert(
          "This vertex was already picked. Choose an adjacent to the last one picked."
        );
      } else {
        let match = false;
        // check adjacencies list for one that matches the button and the last picked one;
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
          button.dataset.status = "last-picked";
          button.classList.add("user");
          computerTurn(currentButtonID, button);
          if ((userWin === false)) {
            button.dataset.status = "";
            checkUserPlays();
          }
        } else {
          alert("Choose a vertex adjacent to the last one picked.");
        }
      }
    }
  });
});

computerTurn = (e) => {
  let availableVertexes = document.querySelectorAll("[data-status]");
  let possibleMatches = [];
  availableVertexes.forEach((availableVertex) => {
    if (
      availableVertex.dataset.status === "" &&
      !(
        availableVertex.classList.contains("pc") ||
        availableVertex.classList.contains("user")
      )
    ) {
      let availableVertexID = availableVertex.getAttribute("id");
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
  if (possibleMatches.length >= 1) {
    let randomMatch =
      possibleMatches[Math.floor(Math.random() * possibleMatches.length)];
    availableVertexes.forEach((availableVertex) => {
      let availableVertexID = availableVertex.getAttribute("id");
      if (availableVertexID === randomMatch) {
        availableVertex.dataset.status = "last-picked";
        availableVertex.classList.add("pc");
        lastPickedID = availableVertexID;
      }
    });
  } else {
    userWin = true;
    alert("User wins!");
  }
};

checkUserPlays = () => {
  // Check if there are available vertexes for the user to play
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
  if (remainingUserPlays === 0) {
    alert("Computer wins!");
  }
};

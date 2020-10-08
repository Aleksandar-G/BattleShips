let grid = document.getElementById("container");

let hitAtemptCounter = 0;
let boatsSinked = 0;

class cell {
  hit = false;
  position = 0;
  size = 1;
  id = 0;
  boat = false;
}
class Boats {
  hit = false;
  size = 1;
  direction = "horizontal";
  boatpositions = [];
  hittedpositions = [];
}
let cells = [];
let boats = [];
function Onload() {
  CreateGrid();
  CreateBoats();
}
function CreateGrid() {
  let obj = new cell();
  grid = document.getElementById("container");
  var blocks = document.getElementById("container").children;
  var pad = 0,
    cols = 20,
    newleft,
    newtop;
  for (let j = 0; j < 400; j++) {
    cells[j] = new cell();
    let div = document.createElement("div");
    div.style.position = "absolute";
    div.style.height = "30px";
    div.style.width = "30px";
    div.style.outline = "1px solid #000";
    div.style.backgroundColor = "#e0e0eb";
    div.id = j;

    grid.appendChild(div);
    cells[j].id = j;
  }
  for (var i = 1; i < blocks.length; i++) {
    if (i % cols == 0) {
      newtop = blocks[i - cols].offsetTop + blocks[i - cols].offsetHeight + pad;
      blocks[i].style.top = newtop + "px";
    } else {
      if (blocks[i - cols]) {
        newtop =
          blocks[i - cols].offsetTop + blocks[i - cols].offsetHeight + pad;
        blocks[i].style.top = newtop + "px";
      }
      newleft = blocks[i - 1].offsetLeft + blocks[i - 1].offsetWidth + pad;
      blocks[i].style.left = newleft + "px";
    }
  }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function CreateBoats() {
  for (let i = 0; i < 15; i++) {
    let boatdirection = getRandomInt(2);
    let boatPosition = getRandomInt(400);
    boats[i] = new Boats();
    cells[boatPosition].boat = true;
    if (boatdirection == 1) {
      boats[i].direction = "vertical";
    }

    console.log(boatPosition);
    boats[i].boatpositions.push(boatPosition);
    boats[i].hittedpositions.push(false);

    boats[i].size = getRandomInt(4);
    while (boats[i].size == 0) {
      boats[i].size = getRandomInt(4);
    }

    if (boats[i].direction == "vertical") {
      for (let k = 1; k < boats[i].size; k++) {
        boats[i].boatpositions.push((boatPosition += 20));
        boats[i].hittedpositions.push(false);
      }
    } else {
      for (let k = 1; k < boats[i].size; k++) {
        boats[i].boatpositions.push(boatPosition - k);
        boats[i].hittedpositions.push(false);
      }
    }
  }
  console.log(boats);
}
function BoatHit(position) {
  console.log(position);
  console.log(cells[position].boat);
  let hit = false;
  for (let index = 0; index < boats.length; index++) {
    let curBoat = boats[index];
    console.log(curBoat);
    for (let i = 0; i < curBoat.size; i++) {
      if (curBoat.boatpositions[i] == position) {
        hit = true;
        curBoat.hittedpositions[i] = true;
      }
    }
  }
  if (hit == true) {
    return true;
  } else {
    return false;
  }
}
function WholeboatHittedCheacker() {
  let boatSinked = false;

  for (let i = 0; i < boats.length; i++) {
    for (let a = 0; a < boats[i].size; a++) {
      if (boats[i].hittedpositions[a] == true && boats[i].hit == false) {
        boatSinked = true;
      } else {
        boatSinked = false;
        break;
      }
    }
    if (boatSinked == true) {
      boatsSinked++;
      document.getElementById("infoHits").innerHTML =
        "Boats Sinked: " + boatsSinked.toString();
      boats[i].hit = true;
    }
    //boatSinked = true;
  }
}

window.addEventListener("load", Onload, false);
grid.addEventListener(
  "mouseover",
  function (event) {
    if (cells[event.target.id].hit == false) {
      event.target.style.backgroundColor = "#cce0ff";
    }
  },
  false
);
grid.addEventListener(
  "mouseout",
  function (event) {
    if (cells[event.target.id].hit == false) {
      event.target.style.backgroundColor = "#e0e0eb";
    }
  },
  false
);
grid.addEventListener(
  "mousedown",
  function (event) {
    hitAtemptCounter++;
    if (hitAtemptCounter >= 10) {
      GameOver(hitAtemptCounter);
      return;
    }
    //debugger;
    document.getElementById("infoTries").innerHTML =
      "Tries: " + hitAtemptCounter.toString();
    let hitted = BoatHit(event.target.id);
    WholeboatHittedCheacker();
    console.log(hitted);
    if (hitted == true) {
      event.target.style.backgroundColor = "red";
    } else {
      event.target.style.backgroundColor = "yellow";
    }
    cells[event.target.id].hit = true;
  },
  false
);

function GameOver(boatsSinkedGame) {
  alert(
    "Game over You Sinked " +
      boatsSinkedGame +
      " There are " +
      (15 - boatsSinkedGame) +
      " boats left"
  );
  window.location.reload();
}

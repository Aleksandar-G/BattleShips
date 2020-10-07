let grid = document.getElementById("container");
//const socket = io('http://localhost:5000');

/*socket.on('newConnection', data => {
    console.log(data);
})*/

let hitAtemptCounter = 0;
let boatsSinked = 0;
// debugger;
//var grid = document.getElementById("container"); 
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
    // debugger;
    let obj = new cell();
    grid = document.getElementById("container");
    var blocks = document.getElementById("container").children;
    var pad = 0, cols = 20, newleft, newtop;
    for (let j = 0; j < 400; j++) {
        cells[j] = new cell();
        let div = document.createElement("div");
        div.style.position = "absolute";
        div.style.height = "30px";
        div.style.width = "30px";
        div.style.outline = "1px solid #000";
        div.style.backgroundColor = "#e0e0eb";
        div.id = j;
        //div.textContent = j;
        grid.appendChild(div);
        cells[j].id = j;
        //if(j == 19){console.log("hahahahh"); debugger;}
    }
    for (var i = 1; i < blocks.length; i++) {
        if (i % cols == 0) {
            newtop = (blocks[i - cols].offsetTop + blocks[i - cols].offsetHeight) + pad;
            blocks[i].style.top = newtop + "px";
        } else {
            if (blocks[i - cols]) {
                newtop = (blocks[i - cols].offsetTop + blocks[i - cols].offsetHeight) + pad;
                blocks[i].style.top = newtop + "px";
            }
            newleft = (blocks[i - 1].offsetLeft + blocks[i - 1].offsetWidth) + pad;
            blocks[i].style.left = newleft + "px";
        }
    }
    // debugger;
    // CreateBoats();
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function CreateBoats() {

    //debugger;
    for (let i = 0; i < 15; i++) {
        let boatdirection = getRandomInt(2);
        let boatPosition = getRandomInt(400);
        boats[i] = new Boats();
        cells[boatPosition].boat = true;
        if (boatdirection == 1) {
            boats[i].direction = "vertical";
        }
        // console.log(cells[boatPosition].boat)
        //boats[i].boatpositions = boatPosition;
        console.log(boatPosition);
        boats[i].boatpositions.push(boatPosition);
        boats[i].hittedpositions.push(false);
        // boats[i].boatpositions = boatPosition;
        boats[i].size = getRandomInt(4);
        while (boats[i].size == 0) {
            boats[i].size = getRandomInt(4);
        }
        //debugger;
        if (boats[i].direction == "vertical") {
            for (let k = 1; k < boats[i].size; k++) {
                boats[i].boatpositions.push(boatPosition += 20);
                boats[i].hittedpositions.push(false);
            }
        }
        else {
            for (let k = 1; k < boats[i].size; k++) {
                boats[i].boatpositions.push(boatPosition - k);
                boats[i].hittedpositions.push(false);
            }
        }
        //cells[boatPosition].boat = true;
        //console.log(boats[i].boatpositions);
        //console.log(boats[i].size);
    }
    console.log(boats)
}
function BoatHit(position) {
    console.log(position);
    console.log(cells[position].boat);
    /* if( cells[position].boat === true){
         console.log("gg");
         return true;
     }
     else{
         return false;
     }
     boats.forEach(element => {
         for (let index = 0; index < element.boatpositions.length; index++) {

            if(element.boatpositions[index] == position){
             console.log("gg");
                return true;
            }               
             
         }
         return false;
     });*/
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
    }
    else {
        return false;
    }
}
function WholeboatHittedCheacker() {
    //debugger;
    let boatSinked = false;

    for (let i = 0; i < boats.length; i++) {
        for (let a = 0; a < boats[i].size; a++) {

            /*if (boats[i].hittedpositions[a] == false || boats[i].hit == true) {
                boatSinked = false;
                break;
            }*/

            if(boats[i].hittedpositions[a] == true && boats[i].hit == false){
                boatSinked = true;
            }
            else{
                boatSinked = false;
                break;
            }
        }
        if (boatSinked == true) {
            boatsSinked++;
            document.getElementById("infoHits").innerHTML ="Boats Sinked: " + boatsSinked.toString();
            boats[i].hit = true;
            
        }
        //boatSinked = true;
    }
}
///let grid1 = document.getElementById("container");
// grid = document.getElementById("container");
window.addEventListener("load", Onload, false);
grid.addEventListener("mouseover", function (event) {
    if (cells[event.target.id].hit == false) {
        event.target.style.backgroundColor = "#cce0ff";
    }
}, false);
grid.addEventListener("mouseout", function (event) {
    if (cells[event.target.id].hit == false) {
        event.target.style.backgroundColor = "#e0e0eb";
    }
}, false);
grid.addEventListener("mousedown", function (event) {
    //event.target.style.backgroundColor = "red";
    hitAtemptCounter++;
    if(hitAtemptCounter >= 10){
        GameOver(hitAtemptCounter);
        return;
    }
    //debugger;
    document.getElementById("infoTries").innerHTML ="Tries: " + hitAtemptCounter.toString();
    let hitted = BoatHit(event.target.id);
    WholeboatHittedCheacker();
    console.log(hitted);
    if (hitted == true) {
        event.target.style.backgroundColor = "red";
    }
    else {
        event.target.style.backgroundColor = "yellow";
    }
    cells[event.target.id].hit = true;

}, false)

function GameOver(boatsSinkedGame){
    alert("Game over You Sinked " + boatsSinkedGame + " There are "+(15-boatsSinkedGame) + " boats left");
    window.location.reload();
}
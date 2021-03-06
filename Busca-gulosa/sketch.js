// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Part 1: https://youtu.be/aKYlikFAV4k
// Part 2: https://youtu.be/EaZxUCWAjb0
// Part 3: https://youtu.be/jwRT4PCT6RU

// Modified by  Equipe 3 - Moisés, Ricardo and Reydne

// Function to delete element from the array
function removeFromArray(arr, elt) {
  // Could use indexOf here instead to be more efficient
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

// An educated guess of how far it is between two points
function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}

// How many columns and rows?
var cols = 50;
var rows = 50;


// This will be the 2D array
var grid = new Array(cols);

// Open and closed set
var openSet = [];
var closedSet = [];
var total = 0;

// Start and end
var start;
var end;

// Width and height of each cell of grid
var w, h;

// The road taken
var path = [];

function setup() {
  createCanvas(500, 500);
  console.log('Busca gulosa');

  // Grid cell size
  w = width / cols;
  h = height / rows;

  // Making a 2D array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  // All the neighbors
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }


  // Start and end
  start = grid[0][0];
  var c_end = Math.floor(random(cols));
  var r_end = Math.floor(random(rows));
  end = grid[c_end][r_end];
  start.wall = false;
  end.wall = false;

  // openSet starts with beginning only
  openSet.push(start);
}

function draw() {

  // Am I still searching?
  if (openSet.length > 0) {
    
    // Best next option
    var winner = 0;
    current = openSet[0];
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    // registration
    console.log(openSet);
    removeFromArray(openSet, current);
    closedSet.push(current);

    // Check all the neighbors
    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      // Valid next spot?
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = heuristic(neighbor, current);

        // Is this a better path than before?
        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        // Yes, it's a better path
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.h;
          neighbor.previous = current;
        }
      }
    }

  // Uh oh, no solution
  } else {
    var total_food = document.getElementById('total_food');
    total_food.textContent = "No solution";

    console.log('no solution');
    noLoop();
    return;
  }

  // Draw current state of everything
  background(255);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0, 50));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0, 50));
  }


  // Find the path by working backwards
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  // Drawing path as continuous line
  noFill();
  stroke(255, 0, 200);
  strokeWeight(w / 2);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();

  // Vehicle
  noFill();
  beginShape();
  stroke(255, 0, 0);
  strokeWeight(w / 2);
  vertex(start.i * w + w / 2, start.j * h + h / 2);
  vertex(start.i * w + w / 2, start.j * h + h / 2);
  endShape();

  // food
  beginShape();
  stroke(0, 255, 0);
  vertex(end.i * w + w / 2, end.j * h + h / 2);
  vertex(end.i * w + w / 2, end.j * h + h / 2);
  endShape();

  if (current === end) {
    var c_start = Math.floor(random(cols));
    var r_start = Math.floor(random(rows));
    start = grid[c_start][r_start];

    total++;
    openSet = []
    openSet.push(start);
    closedSet = [];

    var c_end = Math.floor(random(cols));
    var r_end = Math.floor(random(rows));
    end = grid[c_end][r_end];
    while (end.wall){
      c_end = Math.floor(random(cols));
      r_end = Math.floor(random(rows));
      end = grid[c_end][r_end];
    }

    // capture the element of HTML
    var total_food = document.getElementById('total_food');
    console.log(total_food)
    total_food.textContent = "Total: " + total
    
    console.log("DONE!");
  }
}

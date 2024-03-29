// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;

// Define your ghosts here
var inky = {
  name: 'Inky',
  menu_option: '1',
  color: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  name: 'Blinky',
  menu_option: '2',
  color: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  name: 'Pinky',
  menu_option: '3',
  color: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  name: 'Clyde',
  menu_option: '4',
  color: 'Red',
  character: 'Pokey',
  edible: false
};

// var ghosts = new Object;
var ghosts = [inky, blinky, pinky, clyde];


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');``
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '\n' + '\n' +  '\n' + 'Power Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if  (powerPellets > 0){
    console.log('(p) Eat Power-Pellet');
  }
  // console.log('(1) Eat Inky');
  // console.log('(2) Eat Blinky');
  // console.log('(3) Eat Pinky');
  // console.log('(1) Eat Clyde');
  displayGhosts();

  console.log('(q) Quit');

}
function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

function displayGhosts(){
 for (i = 0; i < ghosts.length; i++){
   var ghost = ghosts[i];
   if (ghost['edible'] === true) {
     ghost.text = '(edible)';
   } else {
     ghost.text = '(Inedible)';
   }
   console.log("(" + (i + 1) + ") " + ghost["name"] + " " + ghost.text);
 }
}
// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost){
  if (ghost["edible"] === false) {
    lives--;
    console.log('\n' + "Your dead! Killed by " + ghost["name"] + " of the color " + ghost["color"]);
    checkLife();
} else if (ghost["edible"] === true) {
    console.log('\n' + "You have just eaten " + ghost["name"] + " whose color is " + ghost["color"] + " , and chracter is " + ghost["character"])
    score += 200
    ghost['edible'] = false
  }

}

// function gameOver
// need explanation on this
function eatPowerPellet(){
    score += 50;
    ghosts.forEach(function(ghost){
     ghost.edible = true;
   })
   powerPellets--;
 }

// function powerPelletCheck{
//   if (powerPellets <= 0)
// }

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    case 'p':
    if (powerPellets >= 0){
      eatPowerPellet();
      console.log('\n' + "You have " + powerPellets + " left")
    } else {
      console.log('\n' + "You have No Power-Pellets left!")}
      break;
    default:
      console.log('\nInvalid Command!');
  }
}
// After pacman eats ghost, apply gameover.
function checkLife() {
  if (lives <= 0) {
    process.exit();
  }
}


// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300);
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});

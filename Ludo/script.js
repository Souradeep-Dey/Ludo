let z = 0;
let pos = [
  [[10, 10], [10, 22.4], [21, 10], [21, 22.4]],
  [40, 6.7], [40, 13.3], [40, 20], [40, 26.7], [40, 33.3],
  [33.3, 40], [26.7, 40], [20, 40], [13.3, 40], [6.7, 40], [0, 40],
  [0, 46.7], [0, 53.3],
  [6.7, 53.3], [13.3, 53.3], [20, 53.3], [26.7, 53.3], [33.3, 53.3],
  [40, 60], [40, 66.7], [40, 73.3], [40, 80], [40, 86.7], [40, 93.3],
  [46.7, 93.3], [53.3, 93.3],
  [53.3, 86.7], [53.3, 80], [53.3, 73.3], [53.3, 66.7], [53.3, 60],
  [60, 53.3], [66.7, 53.3], [73.3, 53.3], [80, 53.3], [86.7, 53.3], [93.3, 53.3],
  [93.3, 46.7], [93.3, 40],
  [86.7, 40], [80, 40], [73.3, 40], [66.7, 40], [60, 40],
  [53.3, 33.3], [53.3, 26.7], [53.3, 20], [53.3, 13.3], [53.3, 6.7], [53.3, 0],
  [46.7, 0], [46.7, 6.7], [46.7, 13.3], [46.7, 20], [46.7, 26.7], [46.7, 33.33], [46.7, 40.0]

]

// Declaring the pieces
let pr = document.querySelectorAll(".red");
let pb = document.querySelectorAll(".blue");
let pg = document.querySelectorAll(".green");
let py = document.querySelectorAll(".yellow");
let dice = document.querySelector(".dice");

// creating flags
let flag = [0, 0, 0, 0];

// Declaring the in out blocks
let inOut = document.querySelectorAll(".in-out");
inOut = Array.from(inOut);
inOut.forEach((i) => {
  i.addEventListener("click", (e) => {
    let j = inOut.indexOf(e.target);
    p[j].forEach(i => {
      i.style.display = 'none';
    })
    flag[j] = 4;
    e.target.innerHTML = "O";
    e.target.style.setProperty(`color`, 'red');

  }, { once: true })
})
// combining the elemnts into an array
let p = [Array.from(pr), Array.from(pb), Array.from(pg), Array.from(py)];

var position = [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]];

// color code
// 0-red 1-blue 2-green 3-yellow
let colour = [0, 2, 3, 1];

// position setting function
function setPos(a, p, i) {
  // red
  if (i == 0) {
    p.style.top = `${a[0]}%`;
    p.style.left = `${a[1]}%`;
  }
  // blue
  else if (i == 1) {
    p.style.left = `${a[0]}%`;
    p.style.bottom = `${a[1]}%`;
  }
  // green
  else if (i == 2) {
    p.style.right = `${a[0]}%`;
    p.style.top = `${a[1]}%`;
  }
  // yellow
  else {
    p.style.bottom = `${a[0]}%`;
    p.style.right = `${a[1]}%`;
  }
}
function beforeSetPos(piece, colour, nextPos, pieceNumber) {
  if (nextPos == 0) {
    setPos(pos[nextPos][pieceNumber], piece, colour);
  }
  else
    setPos(pos[nextPos], piece, colour);
}

// setting initial position
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    position[i][j] = 0;
    beforeSetPos(p[i][j], i, 0, j);
  }
}
// for (let j = 0; j < 4; j++) {
//   position[0][j] = pos.length - 2;
//   beforeSetPos(p[0][j], 0, pos.length - 2, j);
// }
//some variable initialization
let k, d, turns;//colour[k] denotes whose turn it is presently
k = 0;
let countOfSix = 1;
// play function
async function play(e) {
  // Removing event listeners
  p[colour[k]].filter(j => { return (flag[colour[k]] < 4 && !(d == 6 && countOfSix == 3) && (position[colour[k]][p[colour[k]].indexOf(j)] + d) <= (pos.length - 1) && ((position[colour[k]][p[colour[k]].indexOf(j)] == 0 && d == 6) || (position[colour[k]][p[colour[k]].indexOf(j)] != 0))) }).forEach(j => { j.removeEventListener('click', play, { once: true }) });

  let j = p[colour[k]].indexOf(e.target);
  if (d == 6 && position[colour[k]][j] == 0) {
    beforeSetPos(e.target, colour[k], ++position[colour[k]][j], j);
  }
  else {
    for (let l = 0; l < d; l++) {
      position[colour[k]][j] += 1;
      console.log(colour[k] + "" + position[colour[k]][j]);
      await sleep(200);
      beforeSetPos(e.target, colour[k], position[colour[k]][j], j);

    }
    if (position[colour[k]][j] == pos.length - 1)
      flag[colour[k]]++;
  }
  let reMove = check(j);
  if ((d == 6 || reMove == 1) && countOfSix < 3) {
    dice.addEventListener('click', diceRoll);
    if (d == 6)
      countOfSix++;
    else
      countOfSix = 1;
  }
  else {
    do {
      k = (k + 1) % colour.length;
    } while (flag[colour[k]] == 4);
    countOfSix = 1;
  }

  setColour(dice, colour[k]);
  dice.innerHTML = "Roll";
  dice.addEventListener('click', diceRoll);
}
// game function
async function startGame() {
  dice.removeEventListener('click', diceRoll);
  // p[colour[k]].forEach(j => { j.style.border = '2px solid blue' });
  p[colour[k]].filter(j => { return (flag[colour[k]] < 4 && !(d == 6 && countOfSix == 3) && (position[colour[k]][p[colour[k]].indexOf(j)] + d) <= (pos.length - 1) && ((position[colour[k]][p[colour[k]].indexOf(j)] == 0 && d == 6) || (position[colour[k]][p[colour[k]].indexOf(j)] != 0))) }).forEach(j => { j.addEventListener('click', play, { once: true }); j.style.setProperty(`z-index`, `${z}`) });

  // if the player has no move
  if (p[colour[k]].filter(j => { return (flag[colour[k]] < 4 && !(d == 6 && countOfSix == 3) && (position[colour[k]][p[colour[k]].indexOf(j)] + d) <= (pos.length - 1) && ((position[colour[k]][p[colour[k]].indexOf(j)] == 0 && d == 6) || (position[colour[k]][p[colour[k]].indexOf(j)] != 0))) }).length == 0) {
    console.log("length=0")
    do {
      k = (k + 1) % colour.length;
    } while (flag[colour[k]] == 4);

    if (d == 6 && countOfSix == 3) {
      countOfSix = 1;
      // console.log("3 sixes");
      await sleep(2300);
      setColour(dice, colour[k]);
      dice.innerHTML = "Roll";
    }
    dice.addEventListener('click', diceRoll);
  }


}
// dice function
function diceRoll() {
  z++;
  setColour(dice, colour[k]);
  setTimeout(() => { dice.innerHTML = "." }, 300);
  setTimeout(() => { dice.innerHTML = ".." }, 600);
  setTimeout(() => { dice.innerHTML = "..." }, 900);
  setTimeout(() => { dice.innerHTML = `${d}` }, 1200);
  d = Math.trunc(1 + 6 * Math.random());
  // d = 1;
  startGame();
}
// set colour function
function setColour(p, i) {
  if (i == 0) {
    p.style.color = `red`;
  }
  // blue
  else if (i == 1) {
    p.style.color = `blue`;
  }
  // green
  else if (i == 2) {
    p.style.color = `green`;
  }
  // yellow
  else {
    p.style.color = `yellow`;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//  function check for same piece in a single box
async function check(j) {
  let flag1 = 0;
  if (position[colour[k]][j] != 1 && position[colour[k]][j] <= pos.length - 7)
    for (let i = 0; i < colour.length; i++) {
      // if same colour then ignore
      if (i == colour[k] || flag[i] == 4)
        continue;
      for (l = 0; l < colour.length; l++) {
        if (position[i][l] == 0 || position[i][l] == 1 || position[colour[k]][j] - position[i][l] == 0 || position[i][l] > pos.length - 7);
        else if (Math.abs(position[colour[k]][j] - position[i][l]) % 13 == 0) {
          for (let m = position[i][l]; m > 0; m--) {
            position[i][l]--;
            // console.log(colour[k] + "" + position[colour[k]][j]);
            await sleep(70);
            beforeSetPos(p[i][l], i, position[i][l], l);

          }
          if (flag1 == 0)
            flag1 = 1;
        }

      }
    }
  return flag1;
}
// start game
// dice.addEventListener('click',diceRoll,{ once: true });
setColour(dice, colour[k]);
dice.addEventListener('click', diceRoll);

// for Testing purpose
// position[1][0] = 8;
// beforeSetPos(p[1][0], 1, position[1][0], 0);


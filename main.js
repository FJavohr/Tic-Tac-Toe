const cellElem = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const popup  = document.querySelector('.winning-popup')
const restart = document.querySelector('button') 
const Oscore = document.querySelector('.X')
const Xscore = document.querySelector('.O')
const x = 'x';
const y = 'y';
let XsWins = 0;
let OsWins = 0;


Xscore.innerHTML = `${XsWins}`;
Oscore.innerHTML = `${OsWins}`;

let turner;
const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6]
]
// console.log(cell)

const winnigMessageTextElement = document.querySelector('[data-winning-message-text]')

startGame()

function startGame() {
  turner = false;
  popup.classList.remove('show')
  cellElem.forEach(cell => {
    cell.classList.remove('x')
    cell.classList.remove('y')
    cell.removeEventListener('click', handleClick, {once: true})
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass();
  winnigMessageTextElement.classList.remove('show')

}

function handleClick(event) {
  const cell = event.target
  const currentClass = turner ? y : x
  placeMark(cell, currentClass)

  if(checkWin(currentClass)){
    endGame(false)
  }
  else if(isDraw()) {
    endGame(true)
  }
  else {
    switchMark()
    setBoardHoverClass()  
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}
function switchMark() {
  turner = !turner
}
function setBoardHoverClass() {
  board.classList.remove(x)
  board.classList.remove(y)
}

function setBoardHoverClass() {
  board.classList.remove(x)
  board.classList.remove(y)
  if (turner) {
    board.classList.add(y)
  } else {
    board.classList.add(x)
  }
}


function checkWin(currentClass) {
 return combinations.some(combination => {
  return combination.every(index => {
    return cellElem[index].classList.contains(currentClass);
  })
 })
}

function isDraw() {
  return [...cellElem].every(cell => {
    return cell.classList.contains(x) || cell.classList.contains(y)  
  })
}

function endGame(draw) {
  if(draw) {
    winnigMessageTextElement.innerText = '! Draw !'
  }else {
    winnigMessageTextElement.innerText = `${turner ? "O's Wins" : "X's Wins!" }`
    // XsWins = turner ? XsWins + 1 : XsWins + 0;
    // OsWins = turner ?  OsWins +  0 : OsWins + 1;

    if(turner) {
      OsWins += 1;
      Oscore.innerHTML = `${OsWins}`
    }else {
      XsWins += 1;
      Xscore.innerHTML = `${XsWins}`
    }
  }
  popup.classList.add('show')
}

restart.addEventListener('click', startGame)



// restart.addEventListener('click', () => {
//   board.classList.remove('x')
//   board.classList.remove('y')
  
//   for(let hurma of cellElem ){
//     return hurma.classList.remove('x') 
//   }
  
//   startGame()
// }) 

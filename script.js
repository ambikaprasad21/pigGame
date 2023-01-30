'use strict';

//Selecting elements
const score0El = document.querySelector('#score--0'); //This is one way of selecting Element by using #idname in querySelector
const score1El = document.getElementById('score--1'); //This is another way of selecting Element by using getElementById
const diceEl = document.querySelector('.dice');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore, playing; //we can declare bunch of variables by seperating them with comma.
const init = function () {
  //state variables
  scores = [0, 0]; //score of both players. We store them in array because we will use them afterward to increase their score when there chance comes.
  activePlayer = 0; //at start player 0 is playing so we declare currentPlayer as 0. and if second player chance came then we will update currentPlayer as 1
  currentScore = 0; //currentscore ko bahar isliye initialise kiya taki jab bhi roll dice button click ho to currentscore update ho jaye
   playing = true;

  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner'); //if this class is not present in this element then javascript do nothing and if it is present then it will simpy remove it
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

//New button functionality
btnNew.addEventListener('click', function () {
  init();
});

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active'); //The toggle method adds the class if it is not there and it remove the class if it is present.
  player1.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      //Add dice to currentscore
      currentScore += dice;
      // currentScore0.textContent = currentScore;  This was putting the value of current score to player 0 current area only, so we want to dynamically change the storing site ..
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

//Hold button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

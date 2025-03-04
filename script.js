'use strict';
// Selectors
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const dice = document.querySelector('.dice');
const scoreCurrent = document.querySelectorAll(`.current-score`);
const score = document.querySelectorAll(`.score`);
const player = document.querySelectorAll('.player');

const state = {
  current: 0,
  score: [0, 0],
  player:0,
  isPlaying: true
};

/////////////////////////////////////////////////
// functions
const newGame = () => {
  state.current = 0;
  state.score = [0, 0];
  state.player = 0;
  score.forEach(el => el.textContent = 0);
  scoreCurrent.forEach(el => el.textContent = 0);
  dice.style.display = 'none';
  player.forEach(el => el.classList.remove('player--winner'));
  state.isPlaying = true;
}

const playerChange = () => {
  scoreCurrent[state.player].textContent = 0;
  player.forEach(el => el.classList.toggle('player--active'));
  state.player === 0 ? state.player = 1 : state.player = 0;
  state.current = 0;
}

/////////////////////////////////////////////////////////////////////////////////
// Events
btnRoll.addEventListener('click', function () {
  if(state.isPlaying) {
    const currentPlayer = state.player;
    const diceNumber = Math.trunc(Math.random() * 6) + 0;
  
    if (diceNumber === 0){
      playerChange()
      return
    };
  
    state.current += diceNumber;
    scoreCurrent[currentPlayer].textContent = state.current;
    dice.setAttribute("src", `dice-${diceNumber}.png`);
  }
});

btnHold.addEventListener('click', function() {
  if(state.isPlaying) {
    const currentPlayer = state.player;
  
    state.score[currentPlayer] += state.current;
    score[currentPlayer].textContent = state.score[currentPlayer];
    
    if (state.score[currentPlayer] >= 100) {
      player[currentPlayer].classList.add('player--winner');
      state.isPlaying = false;
    }
  
    playerChange();
    return
  }
})

btnNew.addEventListener('click', newGame);

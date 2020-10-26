let currentGame;
let currentCards; /* = [];  to escalate*/ 

document.getElementById('game-board').style.display='none';
    const myCanvas=document.getElementById('canvas');
    const ctx = myCanvas.getContext('2d');
    document.getElementById("start-button").onclick = () => {
        startGame();
  };

  function startGame() {
    document.getElementById('game-board').style.display='block';

    currentGame = new Game();
    currentCards = new Cards();
    currentGame.cards = currentCards.cards;

    currentGame.shuffleCards();

    updateCanvas();
        
  }

  function updateCanvas() {
      ctx.clearRect(0, 0, 600, 600);
      currentGame.cards.drawCards();

  }

  cards.onclick = (e) => {
    //show image
  }
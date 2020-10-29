let currentGame;
let currentLevel = 1;
let intervalId;

const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');

document.getElementById('canvas').style.display ='none';
document.getElementById("start-button").onclick = () => {
    startGame();
   intervalId = printSeconds();
};
function startGame() {
    document.getElementById('start-button').style.display ='none';
    document.getElementById('canvas').style.display ='block';
    currentGame = new Game();
    // create new Array, copy of teh collection to be abel to empty it (splice) without emptiying the original
    let copyArray = [];

    if (currentLevel === 1) {
        copyArray = [...cardsCollection];
    } else if (currentLevel === 2) {
        copyArray = [...levelTwoCardsCollection];
    } 
    
    for (let i = 1; i < 17; i++) {
        //suffle pictures
        let rndIndex = Math.floor(Math.random() * copyArray.length);
        // assign Image to card
        if(i < 5) {
        currentGame.cards.push(new Cards((i -1) * 150, 0, copyArray[rndIndex].name, copyArray[rndIndex].img));
            copyArray.splice(rndIndex, 1);
        } else if (i < 9) {
        currentGame.cards.push(new Cards((i - 5) * 150, 150, copyArray[rndIndex].name, copyArray[rndIndex].img));
            copyArray.splice(rndIndex, 1);
        } else if (i < 13) {
            currentGame.cards.push(new Cards((i - 9) * 150, 300, copyArray[rndIndex].name, copyArray[rndIndex].img));
            copyArray.splice(rndIndex, 1);
        } else {
            currentGame.cards.push(new Cards((i - 13) * 150, 450, copyArray[rndIndex].name, copyArray[rndIndex].img));
            copyArray.splice(rndIndex, 1);
        }
    }
    updateCanvas();            
}

function updateCanvas() {
    ctx.clearRect(0, 0, 600, 600);
      // draw each Card
    currentGame.cards.forEach (card => {
        card.drawCards();   
    })
}
myCanvas.addEventListener('click', e =>{
    currentGame.cards.forEach(card => {  
        if(e.layerX > card.x && e.layerX < (card.x + card.width) &&
        e.layerY > card.y && e.layerY < (card.y + card.heigth)) {
            // Max of 2 cards at a time has a BUG
            // If you click 2 on your image accepts it as valid 
            if (currentGame.pickedCards.length < 2) {  
                card.picture(card.x, card.y, card.width, card.heigth);
                currentGame.pickedCards.push(card);
            }
            checkPickedCards();
        }      
    })
})

function checkPickedCards() {
    if (currentGame.pickedCards.length === 2) {
        const card1 = currentGame.pickedCards[0];
        const card2 = currentGame.pickedCards[1];
        if(currentGame.checkIfPair(card1, card2)) {
            document.getElementById('pairs-guessed').innerHTML = currentGame.pairsGuessed;
            let pickedAudio = new Audio('styles/images/gamepickupobject.mp3');
                pickedAudio.play();
            currentGame.pickedCards = [];
            currentGame.isFinished();
        } else {
            setTimeout(() => {
                currentGame.pickedCards.forEach(card => { 
                   ctx.clearRect(card.x, card.y, card.width, card.heigth);
                   card.drawCards(); 
                });
                currentGame.pickedCards = [];
            }, 1100)   
        };
        document.getElementById('pairs-clicked').innerHTML = currentGame.pairsClicked;   
    }

    //WIN 
    if (currentGame.isFinished()) {
        clearInterval(intervalId);

        let winAudio = new Audio('styles/images/cheering.mp3');
        winAudio.play();
        
        setTimeout(() =>  {
            document.getElementById('canvas').style.display ='none';
            document.getElementById("level").innerHTML = `2`;

            if(currentLevel === 1) {
                clearInterval(intervalId);
                document.getElementById('next-level').innerHTML += 
                    `<div id="next-level"> LEVEL  <span class="number">2</span> <div>`;
                currentLevel = 2;                            
                clock = 50;
            } else if (currentLevel === 2) {
                clearInterval(intervalId);
                document.getElementById('canvas').style.display ='none';
                document.getElementById('over').innerHTML += `<div id="you-won">           
                <span id="gif"><img src="../project1/styles/images/fireworks.gif"/><span><br/>
                YOU WON! <div>`;  
                currentLevel = 'finish';
                setTimeout (() => {
                    document.getElementById('gif').innerHTML = "";
                    reStart();  
                }, 5000)                        
            } 

            if (currentLevel !== 'finish') {
                currentGame.pairsClicked = 0; 
                currentGame.pairsGuessed = 0;
                document.getElementById('pairs-clicked').innerHTML = 0;
                document.getElementById('pairs-guessed').innerHTML = 0;

                setTimeout (() => {
                    document.getElementById('next-level').innerHTML = "";                   
                    document.getElementById('canvas').style.display ='block';
                    intervalId = printSeconds();
                    startGame();
                }, 3000)
             }
        }, 300)
    }
}
//TIMER = GAME OVER 
let clock = 60;
function printSeconds(){
    intervalId = setInterval(() => {
        clock -= 1;
        if (clock < 1) {
            clearInterval(intervalId);
            let overAudio = new Audio('styles/images/oldstylegamesound.mp3');
                    overAudio.play();
                document.getElementById('canvas').style.display ='none';
                document.getElementById('over').innerHTML += `<div id="game-over"> GAME OVER! <div>`;
            setTimeout(() => {                               
                reStart();  
            }, 3000);
        };
        if (clock < 10) {
            return document.getElementById('time').innerHTML = `0${clock}`;
        } else { 
            return document.getElementById('time').innerHTML = `${clock}`;
        };
    }, 1000);
    return intervalId;
}; 
//RESTART Level 1 & 2 = working 
function reStart() {
    document.getElementById('start-button').innerHTML = `<strong> AGAIN? </strong>`;
    document.getElementById('start-button').style.display = 'block';
    currentGame.pickedCards = [];
    currentGame.pairsClicked = 0; 
    currentGame.pairsGuessed = 0;
    currentLevel = 1;
    document.getElementById('pairs-clicked').innerHTML = 0;
    document.getElementById('pairs-guessed').innerHTML = 0;
    document.getElementById("level").innerHTML = `1`;
    
    document.getElementById("start-button").onclick = () => {
        document.getElementById('over').style.display = 'none'; 
        startGame();
        clock = 60;
        printSeconds();
    };
}

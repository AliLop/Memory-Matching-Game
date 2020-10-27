let currentGame;

const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');

document.getElementById('canvas').style.display ='none';
//document.getElementById('game-board').style.background ='none';

document.getElementById("start-button").onclick = () => {
    startGame();
    printSeconds();
  };

function startGame() {
    
    document.getElementById('start-button').style.display ='none';
    //document.getElementById('game-board').style.background = 'transparent';
    document.getElementById('canvas').style.display ='block';

    currentGame = new Game();
    let copyArray = [...cardsCollection];

    for (let i = 1; i < 17; i++) {
    
        let rndIndex = Math.floor(Math.random() * copyArray.length);
        if(i < 5) {
        currentGame.cards.push(new Cards((i -1) * 155, 0, copyArray[rndIndex].name, copyArray[rndIndex].img));
            copyArray.splice(rndIndex, 1);
        } else if (i < 9) {
        currentGame.cards.push(new Cards((i - 5) * 155, 155, copyArray[rndIndex].name, copyArray[rndIndex].img));
            copyArray.splice(rndIndex, 1);
        } else if (i < 13) {
            currentGame.cards.push(new Cards((i - 9) * 155, 310, copyArray[rndIndex].name, copyArray[rndIndex].img));
            copyArray.splice(rndIndex, 1);
        } else {
            currentGame.cards.push(new Cards((i - 13) * 155, 465, copyArray[rndIndex].name, copyArray[rndIndex].img));
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
            let pickedAudio = new Audio('../project1/styles/images/gamepickupobject.mp3');
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

            }, 1250)   
        };
        document.getElementById('pairs-clicked').innerHTML = currentGame.pairsClicked;   
    }

    if (currentGame.isFinished()) {
        //clearInterval(intervalId);
        
        setTimeout(() => {
          window.alert('YOU WON!');
          console.log(`WIIINN`)
            let winAudio = new Audio('../project1/styles/images/cheering.mp3');
            winAudio.play();

        }, 1000)
                
                           /*     printSeconds();
                            
                                level1Game = new Game();
                                let copyLevel1Array = [...cardsCollection];

                                for (let i = 1; i < 17; i++) {
                                
                                    let rndIndex = Math.floor(Math.random() * copyLevel1Array.length);
                                    if(i < 5) {
                                    currentGame.cards.push(new Cards((i -1) * 155, 0, copyLevel1Array[rndIndex].name, copyLevel1Array[rndIndex].img));
                                        copyArray.splice(rndIndex, 1);
                                    } else if (i < 9) {
                                    currentGame.cards.push(new Cards((i - 5) * 155, 155, copyLevel1Array[rndIndex].name, copyLevel1Array[rndIndex].img));
                                        copyArray.splice(rndIndex, 1);
                                    } else if (i < 13) {
                                        currentGame.cards.push(new Cards((i - 9) * 155, 310, copyLevel1Array[rndIndex].name, copyLevel1Array[rndIndex].img));
                                        copyArray.splice(rndIndex, 1);
                                    } else {
                                        currentGame.cards.push(new Cards((i - 13) * 155, 465, copyLevel1Array[rndIndex].name, copyLevel1Array[rndIndex].img));
                                        copyArray.splice(rndIndex, 1);
                                    }
                                }

                                updateCanvas();            
                            
                        */



    }
}

let clock = 60;
function printSeconds(){
    let intervalId = setInterval(() => {
        clock -= 1;
        
        if (clock < 1) {
            let overAudio = new Audio('../project1/styles/images/oldstylegamesound.mp3');
            overAudio.play();
            document.getElementById('canvas').style.display ='none';
            
            clearInterval(intervalId);

                setTimeout(() => {
                    document.getElementById("start").innerHTML += `<div class="game-over"> GAME OVER! <div>`;
                    //document.getElementById("start").innerHTML += `<img class="over" src='../project1/styles/images/Game-over.jpg'/>`;
                    document.getElementById('start-button').innerHTML = `<strong> CONTINUE? </strong>`;
                    document.getElementById('start-button').style.display = 'block';
                })
                //document.getElementById('game-board').style.background ='none';
        }

            if (clock < 10) {
                    return document.getElementById('time').innerHTML = `0${clock}`;
                } else { 
                 return document.getElementById('time').innerHTML = `${clock}`;
            }
        
    }, 1000);
}          
        
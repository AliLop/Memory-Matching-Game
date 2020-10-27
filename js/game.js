class Game {
    constructor() {
        this.cards = []; 
        this.score = 0;
        //this.canUserPick = true;
        //this.pickedPictures = [];
        //
        this.pickedCards = [];
        this.pairsClicked = 0; 
        this.pairsGuessed = 0;
    }

  checkIfPair(card1, card2) {
    this.pairsClicked++;


    if (card1.name === card2.name) {
 
      this.pairsGuessed++;
      return true;
    } else {
      return false;

    }
  }

  isFinished() {
    if (this.pairsGuessed < this.cards.length / 2) {
        return false; 
    } else {
        
        return true;
    }
  }
}

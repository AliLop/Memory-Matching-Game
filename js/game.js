class Game {
    constructor() {
        this.cards = []; 
        this.score = 0;
        this.pickedCards = []; 
        this.pairsClicked = 0; 
        this.pairsGuessed = 0;
    }

   shuffleCards(cards) {
    if (!cards) {   // if tehre is no array
      return undefined
    } else {
        let len = this.cards.length;
        while (len > 0) {
            len--;
            let mixed = this.cards[len];
            let rdmInd = Math.floor(Math.random() * len);
            this.cards[len] = this.cards[rdmInd];
            this.cards[rdmInd] = mixed;
        }
      return mixed; 
    }
  } 

 

  checkIfPair(card1, card2) {
    this.pairsClicked++;
    
    if (card1.getAttribute('data-card-name') === card2.getAttribute('data-card-name')) {
      this.pairsGuessed++;
      return true;
    } else {
      return false;
    }
  }
  isFinished() {
    if (this.pairsGuessed === 0 || this.pairsGuessed < this.cards.length / 2) {
        return false; 
    } else {
        return true;
    }
  }
}

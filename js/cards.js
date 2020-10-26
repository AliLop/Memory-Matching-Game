class Cards {
    constructor() {
        this.cards = [
            { name: 'aquaman', img: 'aquaman.jpg' },
            { name: 'batman', img: 'batman.jpg' },
            { name: 'captain america', img: 'captain-america.jpg' },
            { name: 'fantastic four', img: 'fantastic-four.jpg' },
            { name: 'flash', img: 'flash.jpg' },
            { name: 'green arrow', img: 'green-arrow.jpg' },
            { name: 'green lantern', img: 'green-lantern.jpg' },
            { name: 'ironman', img: 'ironman.jpg' },
            { name: 'spiderman', img: 'spiderman.jpg' },
            { name: 'superman', img: 'superman.jpg' },
            { name: 'the avengers', img: 'the-avengers.jpg' },
            { name: 'thor', img: 'thor.jpg' },
                //Repeat
            { name: 'aquaman', img: 'aquaman.jpg' },
            { name: 'batman', img: 'batman.jpg' },
            { name: 'captain america', img: 'captain-america.jpg' },
            { name: 'fantastic four', img: 'fantastic-four.jpg' },
            { name: 'flash', img: 'flash.jpg' },
            { name: 'green arrow', img: 'green-arrow.jpg' },
            { name: 'green lantern', img: 'green-lantern.jpg' },
            { name: 'ironman', img: 'ironman.jpg' },
            { name: 'spiderman', img: 'spiderman.jpg' },
            { name: 'superman', img: 'superman.jpg' },
            { name: 'the avengers', img: 'the-avengers.jpg' },
            { name: 'thor', img: 'thor.jpg' }
            ];

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
}
         
drawCards() {
        
        ctx.strokeStyle = 'blue';
        this.cards = [];

        for (let i = 0; i < this.cards.lenght; i++) {
        if( i > 50  & 100) {
            
            ctx.strokeRect(x, y, width, height);
        }
        this.cards.push (new Cards(i+50, 50, 50, 50 ))
        
        }


    //let html = '';
    this.cards.forEach((pic) => { 
    html += `<div class="card" data-card-name="${pic.name}">`;
    html += `<div class="back" name="${pic.img}"></div>`;
    html += `<div class="front" style="background: url(img/${pic.img}) no-repeat"></div>`;
    html += `</div>`;
    console.log(pic);
  });

    //document.querySelector('#memory-board').innerHTML = html;

    

       
} 
}

class Cards {
    constructor(x, y, name, img) {
        this.x = x;
        this.y = y;
        this.width = 135;
        this.heigth = 135;
        this.name = name;
        this.image = img;
    }
    drawCards() {
        ctx.fillStyle = '#214252';
        ctx.shadowColor = 'rgba(97, 89, 97, 1)';
        ctx.shadowBlur = 9;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 3;
        ctx.fillRect(this.x, this.y, this.width, this.heigth)
    }
    picture(x, y, width, heigth) {
        let picture = new Image();
        picture.src = this.image;
        picture.addEventListener('load', () => {
            ctx.drawImage(picture, x, y, width, heigth);
        }) 
    }
};

 

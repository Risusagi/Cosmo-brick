export default class Live {
    constructor(img, x, i, game) {
        this.img = img;
        this.x = x;
        this.y = 0;
        this.size = 50;
        this.game = game;
        this.index = i;
    }
    draw(c) {
        c.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
    update(deltaTime) {
        // hide live out of canvas
        if(this.index >= this.game.lives) {
            this.y = -this.size;
        } else {
            this.y = 0;
        }
    }
}
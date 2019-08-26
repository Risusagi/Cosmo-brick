export default class Live {
    constructor(img, x, index, game) {
        this.img = img;
        this.x = x;
        this.y = 0;
        this.size = 50;
        this.index = index;
        this.game = game;
    }
    draw(c) {
        c.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
    update() {
        if(this.index >= this.game.lives) {
            this.markForDeletion = true;
        }
    }
}
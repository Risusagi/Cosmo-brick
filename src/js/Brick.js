import {detectCollision} from './detectCollision.js';

export default class Brick {
    constructor(game, x, y) {
        this.width = 52;
        this.height = 24;
        this.x = x;
        this.y = y;
        this.game = game;

    }
    update() {
        if(detectCollision(this.game.ball, this)) {
            this.game.ball.speedY = -this.game.ball.speedY;
            
            if(this.game.ball.y + this.game.ball.radius <= this.y) {
                this.game.ball.y = this.y - this.game.ball.radius;
            } else if(this.game.ball.y - this.game.ball.radius >= this.y) {
                this.game.ball.y = this.y + this.height + this.game.ball.radius;
            }
            
            this.markForDeletion = true;
        }
    }
    draw(c) {
        c.fillStyle = "black";
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}

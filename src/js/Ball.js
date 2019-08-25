import {detectCollision} from './detectCollision.js';

export default class Ball {
    constructor(game) {
        this.radius = 10;

        this.game = game;
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        this.reset();
    }
    reset() {
        this.x = 80;
        this.y = 50;
        this.speedX = 15;
        this.speedY = 50;
    }
    draw(c) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.fillStyle = "black";
        c.stroke();
        c.fill();
    }
    update(deltaTime) {
        this.x += this.speedX / deltaTime;
        this.y += this.speedY / deltaTime;

        // not cross left and right borders
        if (this.x + this.radius > this.gameWidth || this.x - this.radius < 0) this.speedX = -this.speedX;
        // not cross top and bottom borders
        if (this.y - this.radius < 0) this.speedY = -this.speedY;
        if (this.y - this.radius > this.gameHeight) {
            this.game.lives--;
            this.reset();
        } 

        // touch with paddle
        if (detectCollision(this, this.game.paddle)) {
            this.speedY = -this.speedY;
            this.y = this.game.paddle.y - this.radius;
        }

        // hit brick
        

    }
}
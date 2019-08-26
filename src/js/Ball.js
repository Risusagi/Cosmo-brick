import {detectCollision} from './detectCollision.js';

export default class Ball {
    constructor(game) {
        this.radius = 10;

        this.game = game;
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        this.reset();
    }
    // set ball's start position
    reset() {
        this.x = this.countX();
        this.y = this.game.paddle.y - this.radius;
    }
    // separated to allow user to change position of the paddle after live loss
    setSpeed() {
        this.speedX = -15;
        this.speedY = -50;
    }
    // count whre is a center of the paddle
    countX() {
        return this.game.paddle.x + this.game.paddle.width / 2;
    }
    draw(c) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.fillStyle = "black";
        c.stroke();
        c.fill();
    }
    update(deltaTime) {
        if (this.game.gameState === 'running') {
            this.x += this.speedX / deltaTime;
            this.y += this.speedY / deltaTime;
        }

        // not cross left and right borders
        if (this.x + this.radius > this.gameWidth || this.x - this.radius < 0) this.speedX = -this.speedX;
        // not cross top border
        if (this.y - this.radius < 0) this.speedY = -this.speedY;
        // if ball falls down subtract one live and change the ball's and the paddle's position to the start one 
        if (this.y - this.radius > this.gameHeight) {
            this.game.lives--;
            this.game.gameState = 'paused';
            this.reset();
            this.game.paddle.reset();
            this.speedX = 0;
            this.speedY = 0;
        } 

        // if the ball lies on paddle change its possition respectively to the paddle's position, start-page, start after live loss
        const ballBottom = this.y + this.radius;
        const paddleTop = this.game.paddle.y;
        if(ballBottom === paddleTop) {
            this.x = this.countX();
        }
        
        // if ball touches smth reverse its movement direction
        if (detectCollision(this, this.game.paddle)) {
            this.speedY = -this.speedY;
            this.y = this.game.paddle.y - this.radius;
        }
    }
}
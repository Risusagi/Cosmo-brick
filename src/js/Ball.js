import {detectCollision} from './detectCollision.js';

export default class Ball {
    constructor(game) {
        this.img = document.querySelector('.ball');
        this.size = 26;

        this.game = game;
        this.gameWidth = game.width;
        this.gameHeight = game.height;

        this.reset();
    }
    // set ball's start position
    reset() {
        this.x = this.countX();
        this.y = this.game.paddle.y - this.size;
    }
    // separated to allow user to change position of the paddle after live loss
    setSpeed() {
        // if previous speeds exist use them otherwise use default values
        if (this.previousSpeedX) {
            this.speedX = this.previousSpeedX;
            this.speedY = this.previousSpeedY;
        } else {
            this.speedX = -15;
            this.speedY = -50;
        }
    }
    // count whre is a center of the paddle
    countX() {
        return this.game.paddle.x + this.game.paddle.width / 2 - this.size / 2;
    }
    stop() {
        this.speedX = 0;
        this.speedY = 0;
    }
    draw(c) {
        // c.drawImage(this.img, 0, 213, 200, 200, this.x, this.y, this.size, this.size);
        c.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
    update(deltaTime) {
        if (this.game.gameState === 'running') {
            this.x += this.speedX / deltaTime;
            this.y += this.speedY / deltaTime;
        }

        // not cross left and right borders
        if (this.x + this.size > this.gameWidth || this.x < 0) this.speedX = -this.speedX;

        // not cross top border
        if (this.y < 0) this.speedY = -this.speedY;

        // if ball falls down subtract one live and change the ball's and the paddle's position to the start one 
        if (this.y > this.gameHeight) {
            this.game.handleLiveLoss();
        } 

        // if the ball lies on paddle change its possition respectively to the paddle's position, start-page, start after live loss
        const ballBottom = this.y + this.size;
        const paddleTop = this.game.paddle.y;
        if(ballBottom === paddleTop) {
            this.x = this.countX();
        }
        
        // if ball touches paddle reverse its vertical movement direction
        if (detectCollision(this, this.game.paddle)) {
            this.speedY = -this.speedY;
            this.y = this.game.paddle.y - this.size;
        }
    }
    // END OF UPDATE METHOD

    decreaseSpeed() {
        const timeChange = 0.6;

        if(Math.abs(this.speedY) >= 25) {
            this.speedX *= timeChange;
            this.speedY *= timeChange;
            
            this.cancelChange(timeChange);
        }
    }
    increaseSpeed() {
        const timeChange = 1.4;
        if (Math.abs(this.speedY) <= 85) {
            this.speedX *= timeChange;
            this.speedY *= timeChange;

            this.cancelChange(timeChange);
        }
    }
    // cancel change of speed
    cancelChange(timeChange) {
        setTimeout(() => {
            this.speedY /= timeChange;
            this.speedX /= timeChange;
        }, 5000);
    }

    getSpeed() {
        this.previousSpeedX = this.speedX;
        this.previousSpeedY = this.speedY;
    }
}
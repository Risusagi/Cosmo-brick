import Paddle from './Paddle.js'
import InputHandler from './InputHandler.js';
import Ball from './Ball.js';
import Live from './Live.js';
import FallingLive from './FallingLive.js';
import Additions from './Additions.js';
import {buildLevel, levels} from './levels.js';

export default class Game {
    constructor(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.gameState = 'start-page';
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.lives = 3;
        this.points = 0;
        this.level = 4;
        this.hitter = 0;
        this.fallingLive = new FallingLive(this);
        this.addition = new Additions(this);
        new InputHandler(this.paddle, this);
    }

    start() {
        
        this.bricks = buildLevel(this, levels[this.level % 6]);
        const heart = document.querySelector('.live');
        const lives = [];
        for(let i = 0; i < 3; i++) {
            const x = this.width - 50 * (i + 1);
            lives.push(new Live(heart, x, i, this));
        }

        this.addition.change();
        
        this.gameObjects = [
            this.paddle,
            this.ball,
            ...lives
        ];
    }
    update(deltaTime) {
        if(this.lives === 0) this.gameState = 'game-over';

        // do nothing if game is paused or failed
        if (
            this.gameState === 'paused' ||
            this.gameState === 'game-over'
        ) return;
        // for start page and running
        [...this.gameObjects, ...this.bricks].forEach(obj => obj.update(deltaTime));

        // if ball hitted more than one brick at ones, reverse its vertical movement, because otherwise it will fly in the wrong direction (minus minus gives plus so we need one more minus)
        if(this.hitted > 1) {
            this.ball.speedY = -this.ball.speedY;
        }
        this.hitted = 0;

        this.bricks = this.bricks.filter(brick => !brick.markForDeletion);

        // only for running
        if (this.gameState === 'running' && this.ball.speedY !== 0) {
            this.fallingLive.update(deltaTime);
            this.addition.update(deltaTime);
        }
        
        if(this.bricks.length === 0) {
            this.ball.reset();
            this.ball.stop();
            this.level++;
            this.bricks = buildLevel(this, levels[this.level % 6]);
        }
    }
    draw(c) {
        [...this.gameObjects, ...this.bricks].forEach(obj => obj.draw(c));

        this.updatePoints(c);
        
        // draw falling objects only if game is running and user don't hold ball(after live loss, before first start)
        if (this.gameState === 'running' && this.ball.speedY) {
            this.fallingLive.draw(c);
            this.addition.draw(c);
        }

        c.font = "30px Roboto Mono";
        c.textAlign = "center";

        if (this.gameState === 'game-over') {
            this.coverScreen("rgba(0, 0, 0, 0.6)", c);

            this.writeText("GAME OVER", c);
            c.font = c.font = "16px Roboto Mono";
            c.fillText(`Earned points: ${this.points}`, this.width / 2, this.height / 2 + 10);

        } else if (this.gameState === 'start-page') {
            this.coverScreen("rgba(0, 0, 0, 0.3)", c);

            this.writeText("Press Enter to start a game", c);

        } else if (this.gameState === 'paused') {
            this.coverScreen("rgba(0, 0, 0, 0.5)", c);

            this.writeText("Press spacebar to continue", c);
        }
    }

    writeText(text, c) {
        c.fillStyle = 'white';
        c.fillText(text, this.width / 2, this.height / 2 - 30);
    }
    coverScreen(color, c) {
        c.fillStyle = color;
        c.fillRect(0, 0, this.width, this.height);
    }

    togglePause() {
        if (this.gameState === 'paused') {
            this.gameState = 'running';
        } else {
            this.gameState = 'paused';
        }
    }
    updatePoints(c) {
        c.textAlign = 'left';
        c.font = 'bold 20px Roboto Mono';
        c.fillStyle = 'white';
    
        c.fillText(`Points: ${this.points}`, 10, 30);
    }

    startDropping() {
        setInterval(() =>{
            if(this.fallingLive.speedY === 0) {
                this.fallingLive.reset()
            }
        }, 90000);

        setInterval(() => {
            if(this.addition.speedY === 0) {
                this.addition.change();
                this.addition.reset();
            }
        }, 40000);
    }
    handleLiveLoss() {
        this.lives--;

        if(this.lives > 0) this.gameState = 'paused';

        this.paddle.reset();

        this.ball.reset();
        this.ball.stop();

        // hide falling live, addition and prevent their falling down
        this.fallingLive.stop();
        this.addition.stop();
    }
}
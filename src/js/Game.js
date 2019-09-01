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
        this.fallingLive = new FallingLive(this);
        this.addition = new Additions(this);
        new InputHandler(this.paddle, this);
    }

    start() {
        const bricks = buildLevel(this, levels[1]);

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
            ...bricks,
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
        this.gameObjects.forEach(obj => obj.update(deltaTime));
        this.gameObjects = this.gameObjects.filter(obj => !obj.markForDeletion);

        // only for running
        if (this.gameState === 'running' && this.ball.speedY !== 0) {
            this.fallingLive.update(deltaTime);
            this.addition.update(deltaTime);
        }
        
        
    }
    draw(c) {
        this.gameObjects.forEach(obj => obj.draw(c));

        this.updatePoints(c);
        
        // draw falling objects only if game is running and user don't hold ball(after live loss, before first start)
        if (this.gameState === 'running' && this.ball.speedY) {
            this.fallingLive.draw(c);
            this.addition.draw(c);
        }

        c.font = "30px Roboto Mono";
        c.textAlign = "center";

        if (this.gameState === 'game-over') {
            this.coverScreen("rgba(0, 0, 0, 0.8)", c);

            this.writeText("GAME OVER", c);

        } else if (this.gameState === 'start-page') {
            this.coverScreen("rgba(0, 0, 0, 0.3)", c);

            this.writeText("Press Enter to start a game", c);

        } else if (this.gameState === 'paused') {
            this.coverScreen("rgba(0, 0, 0, 0.5)", c);

            this.writeText("Press spacebar to continue", c);
        }
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
        setInterval(() => this.fallingLive.reset(), 10000);

        setInterval(() => {
            this.addition.change();
            this.addition.reset();
        }, 10000);
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
    writeText(text, c) {
        c.fillStyle = 'white';
        c.fillText(text, this.width / 2, this.height / 2);
    }
    coverScreen(color, c) {
        c.fillStyle = color;
        c.fillRect(0, 0, this.width, this.height);
    }
}
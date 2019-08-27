import Paddle from './Paddle.js'
import InputHandler from './InputHandler.js';
import Ball from './Ball.js';
import Brick from './Brick.js';
import Live from './Live.js';
import FallingLive from './FallingLive.js';

export default class Game {
    constructor(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.gameState = 'start-page';
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.lives = 3;
        this.fallingLive = new FallingLive(this);
        new InputHandler(this.paddle, this);
        
    }
    start() {
        const bricks = [];
        const amount = Math.floor(this.width / 56);
        for(let i = 0; i < amount; i++) {
            bricks.push(new Brick(this, 8 + 56 * i, 80))
        }

        const heart = document.querySelector('.live');
        const lives = [];
        for(let i = 0; i < 3; i++) {
            const x = this.width - 50 * (i + 1);
            lives.push(new Live(heart, x, i, this));
        }

        
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
        this.gameObjects.forEach(obj => obj.update(deltaTime));
        this.gameObjects = this.gameObjects.filter(obj => !obj.markForDeletion);
        if (this.gameState === 'running') {
            this.fallingLive.update(deltaTime);
        }
    }
    draw(c) {
        this.gameObjects.forEach(obj => obj.draw(c));
        if (this.gameState === 'running') {
            this.fallingLive.draw(c);
        }

        if (this.gameState === 'paused') {
            c.rect(0, 0, this.width, this.height);
            c.fillStyle = "rgba(0, 0, 0, 0.5)";
            c.fill();
            c.font = "30px Arial";
            c.fillStyle = 'white';
            c.textAlign = "center";
            c.fillText("Press spacebar to continue", this.width / 2, this.height / 2);
        } else if (this.gameState === 'start-page') {
            c.rect(0, 0, this.width, this.height);
            c.fillStyle = "rgba(0, 0, 0, 0.1)";
            c.fill();
            c.font = "30px Arial";
            c.fillStyle = 'white';
            c.textAlign = "center";
            c.fillText("Press Enter to start a game", this.width / 2, this.height / 2);
        } else if (this.gameState === 'game-over') {
            c.rect(0, 0, this.width, this.height);
            c.fillStyle = "rgba(0, 0, 0, 0.8)";
            c.fill();
            c.font = "30px Arial";
            c.fillStyle = 'white';
            c.textAlign = "center";
            c.fillText("GAME OVER", this.width / 2, this.height / 2);
        }
    }
    togglePause() {
        if (this.gameState === 'paused') {
            this.gameState = 'running';
        } else {
            this.gameState = 'paused';
        }
    }
}
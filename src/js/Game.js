import Paddle from './Paddle.js'
import InputHandler from './InputHandler.js';
import Ball from './Ball.js';
import Brick from './Brick.js';


const gameState = {
    paused: 0,
    running: 1,
    menu: 2,
    gameover: 3
}

export default class Game {
    constructor(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.gameState = gameState.menu;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.lives = 3;
        new InputHandler(this.paddle, this);
    }
    start() {
        if(this.gameState !== gameState.menu) return;
        this.gameState = gameState.running;
        const bricks = [];
        const amount = Math.floor(this.width / 56);
        for(let i = 0; i < amount; i++) {
            bricks.push(new Brick(this, 8 + 56 * i, 5))
        }

        this.gameObjects = [
            this.paddle,
            this.ball,
            ...bricks
        ]
    }
    update(deltaTime) {
        if(this.lives === 0) this.gameState = gameState.gameover;

        if (
            this.gameState === gameState.paused ||
            this.gameState === gameState.gameover
        ) return;
        this.gameObjects.forEach(obj => obj.update(deltaTime));
        this.gameObjects = this.gameObjects.filter(obj => !obj.knockedOut);
    }
    draw(c) {
        this.gameObjects.forEach(obj => obj.draw(c));

        if (this.gameState === gameState.paused) {
            c.rect(0, 0, this.width, this.height);
            c.fillStyle = "rgba(0, 0, 0, 0.5)";
            c.fill();
            c.font = "30px Arial";
            c.fillStyle = 'white';
            c.textAlign = "center";
            c.fillText("Paused", this.width / 2, this.height / 2);
        } else if (this.gameState === gameState.menu) {
            c.rect(0, 0, this.width, this.height);
            c.fillStyle = "rgba(0, 0, 0, 0.8)";
            c.fill();
            c.font = "30px Arial";
            c.fillStyle = 'white';
            c.textAlign = "center";
            c.fillText("Press Enter to start a game", this.width / 2, this.height / 2);
        } else if (this.gameState === gameState.gameover) {
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
        if (
            this.gameState === gameState.paused ||
            this.gameState === gameState.menu
        ) {
            this.gameState = gameState.running;
        } else {
            this.gameState = gameState.paused;
        }
    }
}
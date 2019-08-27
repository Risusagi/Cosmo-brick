export default class FallingLive {
    constructor(game) {
        this.img = document.querySelector('.live');
        this.size = 30;
        this.x = -this.size;
        this.y = 100;
        this.speedY = 0;
        this.game = game;
    }
    reset() {
        this.x = Math.floor(Math.random() * (this.game.width - 60)) + 30;
        this.y = 100;
        this.speedY = 15;
    }
    draw(c) { 
        c.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
    update(deltaTime) {
        this.y += this.speedY / deltaTime;

        const liveBottom = this.y + this.size;
        const paddleTop = this.game.paddle.y;
        const paddleLeftSide = this.game.paddle.x;
        const paddleRightSide = paddleLeftSide + this.game.paddle.width;

        // increase amount of lives if paddle caught flling live and amount of lives is less than 3
        if (
            liveBottom >= paddleTop &&
            this.x >= paddleLeftSide &&
            this.x + this.size <= paddleRightSide
        ) {
            if(this.game.lives < 3) {
                this.game.lives++;
            }
            this.x = -this.size;
        }
    }
}
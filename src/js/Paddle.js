export default class Paddle {
    constructor(game) {
        this.width = 150;
        this.height = 30;
        this.x = game.width / 2 - this.width / 2;
        this.y = game.height - this.height;
        this.maxSpeed = 40;
        this.speed = 0;
        this.gameWidth = game.width;
    }

    draw(c) {
        c.fillStyle = "black";
        c.fillRect(this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {
        this.x += this.speed / deltaTime;
        if(this.x < 0) this.x = 0;
        if (this.x + this.width > this.gameWidth) this.x = this.gameWidth - this.width;
    }
    moveLeft() {
        this.speed = -this.maxSpeed;
    }
    moveRight() {
        this.speed = this.maxSpeed;
    }
    stop() {
        this.speed = 0;
    }
}

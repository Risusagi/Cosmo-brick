export default class Paddle {
    constructor(game) {
        this.width = 200;
        this.height = 18;
        this.y = game.height - this.height;
        this.maxSpeed = 40;
        this.speed = 0;
        this.gameWidth = game.width;
        this.game = game;
        this.reset();
    }

    draw(c) {
        c.fillStyle = "#ddd";
        c.fillRect(this.x, this.y, this.width, this.height);
        c.fillStyle = 'black';
        c.fillRect(this.x + 10, this.y + 5, this.width - 20, this.height - 10);
    }
    reset() {
        this.x = this.game.width / 2 - this.width / 2;
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

    shrink() {
        if (this.width > 110) {
            this.width -= 30;
            this.x += 10;
        }
    }
    expand() {
        if (this.width < 350) {
            this.width += 30;
            this.x -= 10;
        }
    }
}

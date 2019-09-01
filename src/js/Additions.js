export default class Additions {
    constructor(game) {
        this.kinds = ['snow', 'fire', 'shrink', 'expand'];
        this.game = game;
    }
    draw(c) {
        c.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    reset() {
        this.x = Math.floor(Math.random() * (this.game.width - 2 * this.width)) + this.width;
        this.y = 100;
        this.speedY = 10;
    }
    stop() {
        this.x = -this.width;
        this.speedY = 0;
    }
    update(deltaTime) {
        this.y += this.speedY / deltaTime;

        const addBottom = this.y + this.height;
        const paddleTop = this.game.paddle.y;
        const paddleBottom = paddleTop + this.game.paddle.height;
        const paddleLeftSide = this.game.paddle.x;
        const paddleRightSide = paddleLeftSide + this.game.paddle.width;

        if (
            addBottom >= paddleTop &&
            addBottom < paddleBottom + this.height &&
            this.x >= paddleLeftSide &&
            this.x + this.width <= paddleRightSide
        ) {
            switch (this.type) {
                case 'snow':
                    this.game.ball.decreaseSpeed();
                    break;
                case 'fire':
                    this.game.ball.increaseSpeed();
                    break;
                case 'shrink':
                    this.game.paddle.shrink();
                    break;
                case 'expand':
                    this.game.paddle.expand();
                    break;
            }
            // hide addition
            this.x = -this.width;
        }
    }
    change() {
        const index = Math.floor(Math.random() * 4);
        // this.type = this.kinds[index];
        this.type = 'snow';
        const size = 34;
        switch (this.type) {
            case 'snow':
                this.img = document.querySelector('.snow');
                break;
            case 'fire':
                this.img = document.querySelector('.fire');
                break;
            case 'shrink':
                this.img = document.querySelector('.shrink');
                break;
            case 'expand':
                this.img = document.querySelector('.expand');
                break;
        }
        switch(this.type) {
            case 'snow':
            case 'fire':
                this.height = size;
                this.width = size;
                break;
            case 'shrink':
            case 'expand':
                this.height = 24;
                this.width = 60;
            break;
        }
    }

}
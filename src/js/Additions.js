export default class Additions {
    constructor(game) {
        this.kinds = ['snow', 'fire', 'shrink', 'expand'];
        this.x = 50;
        this.y = 50;
        this.size = 50;
        this.speedY = 10;
        this.game = game;
    }
    draw(c) {
        c.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
    reset() {
        Math.floor(Math.random() * (this.game.width - 60)) + 30;
        this.y = 100;
        this.speedY = 15;
    }
    update(deltaTime) {
        this.y += this.speedY / deltaTime;

        const addBottom = this.y + this.size;
        const paddleTop = this.game.paddle.y;
        const paddleLeftSide = this.game.paddle.x;
        const paddleRightSide = paddleLeftSide + this.game.paddle.width;

        // increase amount of lives if paddle caught flling live and amount of lives is less than 3
        if (
            addBottom >= paddleTop &&
            this.x >= paddleLeftSide &&
            this.x + this.size <= paddleRightSide
        ) {
            switch(this.type) {
                case 'snow':
                    this.game.ball.speedX *= 0.9;
                    this.game.ball.speedY *= 0.9;
                    // this.game.ball.setSpeed()
                    break;
                case 'fire':
                    this.game.ball.speedX *= 1.1;
                    this.game.ball.speedY *= 1.1;
                    break;
                case 'shrink':
                    this.game.paddle.width -= 10;
                    break;
                case 'expand':
                    this.game.paddle.width += 10;
                    break;
            }
        }
    }
    change() {
        const index = Math.floor(Math.random() * 4);
        this.type = this.kinds[index];
        // this.sp

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
    }
}
// TO DO
// MAX AND MIN WIDTH
// TIME LIMIT FOR SPEED CHANGE
// increse
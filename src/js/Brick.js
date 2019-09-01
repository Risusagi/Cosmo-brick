import {detectCollision} from './detectCollision.js';

export default class Brick {
    constructor(game, x, y, strength) {
        this.width = 75;
        this.height = 35;
        this.x = x;
        this.y = y;
        this.game = game;
        this.strength = strength;
    }
    update() {
        if(detectCollision(this.game.ball, this)) {
            this.game.ball.speedY = -this.game.ball.speedY;
            this.game.points += 1;

            this.strength -= 1;
            if (!this.strength) this.markForDeletion = true;
        }
    }
    draw(c) {
        c.fillStyle = "black";
        switch (this.strength) {
            case 5:
                c.fillStyle = '#f90000';
                break;
            case 4:
                c.fillStyle = '#f600ff';
                
                break;
            case 3:
                c.fillStyle = '#f15500';
                break;
            case 2:
                c.fillStyle = '#fff000';
                break;
            case 1:
                c.fillStyle = '#00aa11';
                break;
        }

        
        c.fillRect(this.x, this.y, this.width, this.height);

        c.fillStyle = '#3fff00';
        c.fillRect(this.x + 3, this.y + 3, this.width - 6, this.height - 6);

        c.strokeStyle = '#007d0c';
        c.strokeRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
        c.lineWidth = 1;
    }
}

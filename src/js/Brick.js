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
            this.game.hitted++;
            this.game.ball.speedY = -this.game.ball.speedY;
            this.game.points += 1;

            this.strength -= 1;
            if (!this.strength) this.markForDeletion = true;
        }
    }
    draw(c) {
        switch (this.strength) {
            case 5:
                c.fillStyle = '#c70202';
                c.strokeStyle = '#830202';
                this.innerStyle = '#f90000';
                break;
            case 4:
                c.fillStyle = '#c100c8';
                c.strokeStyle = '#930098';
                this.innerStyle = '#f600ff';
                break;
            case 3:
                c.fillStyle = '#d86702';
                c.strokeStyle = '#a83b00';
                this.innerStyle = '#ff7800';
                break;
            case 2:
                c.fillStyle = '#e6d600';
                c.strokeStyle = '#b1a201';
                this.innerStyle = '#ffff1a';
                break;
            case 1:
                c.fillStyle = '#00aa11';
                c.strokeStyle = '#007d0c';
                this.innerStyle = '#3fff00';
                break;
        }

        
        c.fillRect(this.x, this.y, this.width, this.height);

        c.fillStyle = this.innerStyle;
        c.fillRect(this.x + 3, this.y + 3, this.width - 6, this.height - 6);
        
        c.strokeRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
        c.lineWidth = 1;
    }
}

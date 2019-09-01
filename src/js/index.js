import '../scss/style.scss';
import Game from './Game';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const boardWidth = canvas.width;
const boardHeight = canvas.height;

const game = new Game(boardWidth, boardHeight);
game.start();

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    c.clearRect(0, 0, boardWidth, boardHeight);
    
    

    c.drawImage(document.querySelector('.background'), 0, 0, game.width, game.height);

    c.fillStyle = "rgba(0, 0, 0, .3)";
    c.fillRect(0, 0, game.width, game.height);
    
    game.update(deltaTime);
    game.draw(c);
    
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
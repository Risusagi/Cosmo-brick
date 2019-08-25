import Paddle from "./Paddle";

export default class InputHandler {
    constructor(paddle, game) {
        window.addEventListener('keydown', (e) => {
            const key = e.keyCode;
            if (key === 37) {
                paddle.moveLeft();
            } else if ( key === 39) {
                paddle.moveRight();
            } else if (key === 32 && game.gameState !== 2) {
                game.togglePause();
            } else if (key === 13) {
                game.start(); 
            }
        });
        window.addEventListener('keyup', (e) => {
            const key = e.keyCode;
            // if left was pressed and paddle moves to left
            if (key === 37 || paddle.speed < 0) {
                paddle.stop();
            } else if (key === 39 || paddle.speed > 0) {
                paddle.stop();
            }
        });
    }
}
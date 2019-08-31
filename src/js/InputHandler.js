export default class InputHandler {
    constructor(paddle, game) {
        window.addEventListener('keydown', (e) => {
            const key = e.keyCode;
            if (key === 37) {
                paddle.moveLeft();
            } else if ( key === 39) {
                paddle.moveRight();
            } else if (key === 32 && game.gameState !== 'start-page') {
                game.togglePause();
            } else if (key === 13) {
                if (game.gameState === 'running') return;
                
                game.gameState = 'running';
                game.ball.getSpeed();
                game.ball.setSpeed();
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
export function detectCollision(ball, gameObject) {
    const ballBottom = ball.y + ball.radius;
    const ballTop = ball.y - ball.radius;

    const objectTop = gameObject.y;
    const objectBottom = gameObject.y + gameObject.height;

    const objectLeftSide = gameObject.x;
    const objectRightSide = objectLeftSide + gameObject.width;

    if (
        ballBottom >= objectTop &&
        ballTop <= objectBottom &&
        ball.x >= objectLeftSide &&
        ball.x - ball.radius <= objectRightSide
    ) {
        return true;
    } else {
        return false;
    }

}
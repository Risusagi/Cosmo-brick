export function detectCollision(ball, gameObject) {
    const ballBottom = ball.y + ball.size;
    const ballTop = ball.y;

    const objectTop = gameObject.y;
    const objectBottom = gameObject.y + gameObject.height;

    const objectLeftSide = gameObject.x;
    const objectRightSide = objectLeftSide + gameObject.width;

    if (
        ballBottom >= objectTop &&
        ballTop <= objectBottom &&
        ball.x + ball.size >= objectLeftSide &&
        ball.x <= objectRightSide
    ) {
        return true;
    } else {
        return false;
    }

}
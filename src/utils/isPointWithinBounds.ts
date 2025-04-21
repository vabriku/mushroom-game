export function isPointWithinBounds(
    point: Phaser.Math.Vector2,
    bounds: { width: number; height: number }
) {
    if (point.x < 0 || point.y < 0 || point.x >= bounds.width || point.y >= bounds.height) {
        return false;
    }

    return true;
}

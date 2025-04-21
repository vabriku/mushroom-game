import { EVENT, EventData, TILE_SIZE } from '../constants';
import { isPointWithinBounds } from '../utils/isPointWithinBounds';

export class Highlight {
    scene: Phaser.Scene;
    highlight: Phaser.GameObjects.Graphics;
    private mapWidth: number;
    private mapHeight: number;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.scene.events.on(
            EVENT.MAP_INITIALIZED,
            ({ width, height }: EventData['MAP_INITIALIZED']) => {
                this.mapWidth = width;
                this.mapHeight = height;
            },
            this
        );
    }

    create() {
        this.highlight = this.scene.add.graphics();
        this.highlight.lineStyle(2, 0xffff00, 1); // yellow border
        this.highlight.strokeRect(0, 0, TILE_SIZE, TILE_SIZE);
        this.highlight.setVisible(false); // initially hidden

        return this;
    }

    // update(mapSize: { width: number; height: number }) {
    update() {
        if (!this.mapWidth || !this.mapHeight) {
            return;
        }

        const pointer = this.scene.input.activePointer;
        const worldPoint = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;
        const tileX = Math.floor(worldPoint.x / TILE_SIZE);
        const tileY = Math.floor(worldPoint.y / TILE_SIZE);
        const snappedX = tileX * TILE_SIZE;
        const snappedY = tileY * TILE_SIZE;

        this.highlight.setPosition(snappedX, snappedY);
        this.highlight.setDepth(1);

        const mapWidth = this.mapWidth * TILE_SIZE;
        const mapHeight = this.mapHeight * TILE_SIZE;

        // Check if the highlight is within the bounds of the map
        this.highlight.setVisible(
            isPointWithinBounds(worldPoint, { width: mapWidth, height: mapHeight })
        );

        if (isPointWithinBounds(worldPoint, { width: mapWidth, height: mapHeight })) {
            this.scene.events.emit(EVENT.TILE_HIGHLIGHTED, {
                x: tileX,
                y: tileY,
            });
        }
    }
}

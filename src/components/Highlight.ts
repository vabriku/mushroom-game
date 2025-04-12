import { TILE_SIZE } from '../constants';

export class Highlight {
    scene: Phaser.Scene;
    highlight: Phaser.GameObjects.Graphics;
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create() {
        this.highlight = this.scene.add.graphics();
        this.highlight.lineStyle(2, 0xffff00, 1); // yellow border
        this.highlight.strokeRect(0, 0, TILE_SIZE, TILE_SIZE);
        this.highlight.setVisible(false); // initially hidden

        return this;
    }

    update(mapSize: { width: number; height: number }) {
        const pointer = this.scene.input.activePointer;
        const worldPoint = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;
        const tileX = Math.floor(worldPoint.x / TILE_SIZE);
        const tileY = Math.floor(worldPoint.y / TILE_SIZE);
        const snappedX = tileX * TILE_SIZE;
        const snappedY = tileY * TILE_SIZE;

        this.highlight.setPosition(snappedX, snappedY);
        this.highlight.setDepth(1);

        const mapWidth = mapSize.width * TILE_SIZE;
        const mapHeight = mapSize.height * TILE_SIZE;

        // Check if the highlight is within the bounds of the map
        if (
            worldPoint.x < 0 ||
            worldPoint.y < 0 ||
            worldPoint.x >= mapWidth ||
            worldPoint.y >= mapHeight
        ) {
            this.highlight.setVisible(false);
        } else {
            this.highlight.setVisible(true);
        }
    }
}

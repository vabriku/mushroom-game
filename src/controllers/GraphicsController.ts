import type { Size } from '@/types';
import type { EventData } from '../constants';
import { EVENT, TILE_SIZE } from '../constants';

export class GraphicsController {
    camera: Phaser.Cameras.Scene2D.Camera;
    private mapSize: Size;
    private background: Phaser.GameObjects.Image;
    highlight: Phaser.GameObjects.Graphics;

    constructor(private scene: Phaser.Scene) {
        this.camera = this.scene.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        // highlight
        this.highlight = this.scene.add.graphics();
        this.highlight.lineStyle(2, 0xffff00, 1); // yellow border
        this.highlight.strokeRect(0, 0, TILE_SIZE, TILE_SIZE);
        this.highlight.setVisible(false); // initially hidden

        this.background = this.scene.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        console.log('graphics controller initializing');

        this.scene.events.on(EVENT.MAP_INITIALIZED, this.onMapInitialized, this);
        this.scene.events.on(EVENT.TILE_SELECTED, this.onTileSelected, this);
        this.scene.events.on(EVENT.TILE_HIGHLIGHTED, this.onTileHighlighted, this);
        this.scene.events.on(EVENT.TILE_UNHIGHLIGHTED, this.onTileUnHighlighted, this);
    }

    private onMapInitialized(data: EventData[EVENT.MAP_INITIALIZED]) {
        this.mapSize = data;
        // Rendering setup logic
        console.log(
            `Map initialized with width: ${this.mapSize.width}, height: ${this.mapSize.height}`
        );
    }

    private onTileSelected(data: { x: number; y: number }) {
        const { x, y } = data;
        // Handle tile selection logic
        console.log(`Tile selected at (${x}, ${y})`);
    }

    private onTileHighlighted(data: EventData['TILE_HIGHLIGHTED']) {
        const { x, y } = data;
        const snappedX = x * TILE_SIZE;
        const snappedY = y * TILE_SIZE;

        this.highlight.setPosition(snappedX, snappedY);
        this.highlight.setDepth(1);
        this.highlight.setVisible(true);
    }

    private onTileUnHighlighted(_data: EventData['TILE_UNHIGHLIGHTED']) {
        this.highlight.setVisible(false);
    }
}

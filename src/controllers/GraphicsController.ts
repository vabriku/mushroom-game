import type { EventData } from '../constants';
import { EVENT, TILE_SIZE } from '../constants';

export class GraphicsController {
    camera: Phaser.Cameras.Scene2D.Camera;
    private background: Phaser.GameObjects.Image;
    highlight: Phaser.GameObjects.Graphics;

    constructor(private scene: Phaser.Scene) {
        console.log('GraphicsController initializing');
        this.camera = this.scene.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        // highlight
        this.highlight = this.scene.add.graphics();
        this.highlight.lineStyle(2, 0xffff00, 1); // yellow border
        // slightly darked yellow for the fill
        this.highlight.fillStyle(0xffff00, 0.3);
        this.highlight.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
        this.highlight.strokeRect(0, 0, TILE_SIZE, TILE_SIZE);
        this.highlight.setVisible(false); // initially hidden

        this.background = this.scene.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.scene.events.on(EVENT.TILE_SELECTED, this.onTileSelected, this);
        this.scene.events.on(EVENT.TILE_HIGHLIGHTED, this.onTileHighlighted, this);
        this.scene.events.on(EVENT.TILE_UNHIGHLIGHTED, this.onTileUnHighlighted, this);
        this.scene.events.on(EVENT.POINTER_DOWN, this.onPointerDown, this);

        // this.scene.registry.events.on('changedata', this.updateScore, this);
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

    private onPointerDown(pointer: Phaser.Input.Pointer) {
        const snappedX = Math.floor(pointer.worldX / TILE_SIZE) * TILE_SIZE;
        const snappedY = Math.floor(pointer.worldY / TILE_SIZE) * TILE_SIZE;

        this.highlight.setPosition(snappedX, snappedY);
        this.highlight.setDepth(1);
        this.highlight.setVisible(true);
    }
}

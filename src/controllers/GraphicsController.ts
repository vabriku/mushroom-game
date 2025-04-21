import { EVENT, EventData } from '../constants';

export class GraphicsController {
    camera: Phaser.Cameras.Scene2D.Camera;
    private background: Phaser.GameObjects.Image;
    private mapWidth: number;
    private mapHeight: number;

    constructor(private scene: Phaser.Scene) {
        this.camera = this.scene.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.scene.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        console.log('tere');

        this.scene.events.on(EVENT.MAP_INITIALIZED, this.onMapInitialized, this);
        this.scene.events.on(EVENT.TILE_SELECTED, this.onTileSelected, this);
    }

    private onMapInitialized(data: EventData[EVENT.MAP_INITIALIZED]) {
        this.mapWidth = data.width;
        this.mapHeight = data.height;
        // Rendering setup logic
        console.log(`Map initialized with width: ${this.mapWidth}, height: ${this.mapHeight}`);
    }

    private onTileSelected(data: { x: number; y: number }) {
        const { x, y } = data;
        // Handle tile selection logic
        console.log(`Tile selected at (${x}, ${y})`);
    }
}

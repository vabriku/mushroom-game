import { Scene } from 'phaser';
import { Highlight } from '../components/Highlight';
import { addTilemapToScene } from '../utils/addTilemapToScene';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    messageText: Phaser.GameObjects.Text;
    highlight: Highlight;
    mapGround: Phaser.Tilemaps.Tilemap;
    mapItems: Phaser.Tilemaps.Tilemap;
    selectedTileText: Phaser.GameObjects.Text;

    constructor() {
        super('Game');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        this.highlight = new Highlight(this).create();

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        const [mapGround, mapItems] = addTilemapToScene.call(this);
        this.mapGround = mapGround;
        this.mapItems = mapItems;

        this.selectedTileText = this.add.text(16, 16, 'Selected Tile: None', {
            fontSize: '18px',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 },
        });
        this.selectedTileText.setScrollFactor(0); // Keeps text fixed on the screen

        this.input.once('pointerdown', () => {
            console.log('Pointer clicked');
        });

        this.input.keyboard?.on('keydown-ESC', () => {
            this.scene.start('GameOver');
        });

        this.input.on('pointerdown', () => {
            const pointer = this.input.activePointer;
            const worldPoint = pointer.positionToCamera(this.cameras.main);

            if (!(worldPoint instanceof Phaser.Math.Vector2)) {
                console.error('worldPoint is not an object');

                return;
            }

            const tileX = this.mapGround.worldToTileX(worldPoint.x);
            const tileY = this.mapGround.worldToTileY(worldPoint.y);

            if (!tileX || !tileY) {
                console.error('tileX or tileY is not defined');

                return;
            }

            const tile = this.mapGround.getTileAt(tileX, tileY, true);

            if (tile) {
                console.log(tile);
                // Perform action, such as updating score or changing tile properties
            }
        });
    }

    update(): void {
        this.highlight.update({
            width: this.mapGround.width,
            height: this.mapGround.height,
        });

        const pointer = this.input.activePointer;
        const worldPoint = pointer.positionToCamera(this.cameras.main);

        if (!(worldPoint instanceof Phaser.Math.Vector2)) {
            console.error('worldPoint is not an object');

            return;
        }

        const tileX = this.mapGround.worldToTileX(worldPoint.x);
        const tileY = this.mapGround.worldToTileY(worldPoint.y);

        if (!tileX || !tileY) {
            console.error('tileX or tileY is not defined');

            return;
        }

        const tile = this.mapGround.getTileAt(tileX, tileY, true, 0);

        if (tile) {
            this.selectedTileText.setText(`Selected Tile: (${tileX}, ${tileY})`);
            // You can also update a score or perform other actions here
        } else {
            this.selectedTileText.setText('Selected Tile: None');
        }
    }
}

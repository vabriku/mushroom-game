import { Scene } from 'phaser';
import { addTilemapToScene } from '../utils/addTilemapToScene';
import { Highlight } from '../components/Highlight';
import { ClickTextPopup } from '../components/ClickTextPopup.ts';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    messageText: Phaser.GameObjects.Text;
    highlight: Highlight;
    mapGround: Phaser.Tilemaps.Tilemap;
    mapItems: Phaser.Tilemaps.Tilemap;

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

        const clickPopup = new ClickTextPopup(this);

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            clickPopup.show(pointer, this.camera, this.mapGround, 'You clicked!');
        });

        this.input.keyboard?.on('keydown-ESC', () => {
            this.scene.start('GameOver');
        });
    }

    update(): void {
        this.highlight.update({
            width: this.mapGround.width,
            height: this.mapGround.height,
        });
    }
}

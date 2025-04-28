import { Scene } from 'phaser';
import Pointer = Phaser.Input.Pointer;
import Camera = Phaser.Cameras.Scene2D.Camera;
import Tilemap = Phaser.Tilemaps.Tilemap;

export class ClickTextPopup {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    show(pointer: Pointer, camera: Camera, mapGround: Tilemap, message: string): void {
        const worldPoint = pointer.positionToCamera(camera) as Phaser.Math.Vector2;

        const tile = mapGround.layers[0].tilemapLayer.getTileAtWorldXY(worldPoint.x, worldPoint.y);

        if (tile) {
            const tileString = `You clicked tile at row=${tile.y}, col=${tile.x}, index=${tile.index}`;
            message = message.concat(' ' + tileString);
        } else {
            console.log('No tile at that position');
        }

        const text = this.scene.add.text(pointer.x, pointer.y - 20, message, {
            font: '16px Arial',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 5, y: 3 },
        });

        text.setOrigin(0.5);

        this.scene.tweens.add({
            targets: text,
            alpha: 0,
            duration: 3000,
            ease: 'Power1',
            onComplete: () => text.destroy(),
        });
    }
}

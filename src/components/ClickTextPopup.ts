import type { EventData } from '@/constants';
import { EVENT, SCENE_DATA } from '@/constants';
import { getSceneData } from '@/utils/getSceneData';
import type { Scene } from 'phaser';

export class ClickTextPopup {
    constructor(private scene: Scene) {
        this.scene = scene;

        this.scene.events.on(EVENT.POINTER_DOWN, this.onPointerDown, this);
    }

    private onPointerDown({ pointer, worldPoint }: EventData[EVENT.POINTER_DOWN]) {
        const mapGround = getSceneData(this.scene, SCENE_DATA.TILEMAP_GROUND);

        if (!mapGround) {
            console.error('Map ground not found');

            return;
        }

        const tile = mapGround.layers
            .at(0)
            ?.tilemapLayer.getTileAtWorldXY(worldPoint.x, worldPoint.y);

        if (!tile) {
            console.log('No tile at that position');

            return;
        }

        const message = `You clicked tile at row=${tile.y}, col=${tile.x}, index=${tile.index}`;

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

import { EVENT } from '@/constants';
import { emitToScene } from '@/utils/emitToScene';

export class InputController {
    constructor(private scene: Phaser.Scene) {
        console.log('InputController initializing');

        this.scene.input.keyboard?.on('keydown-ESC', () => {
            this.scene.scene.start('GameOver');
        });

        this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            emitToScene(this.scene, EVENT.POINTER_DOWN, {
                pointer,
                worldPoint: pointer.positionToCamera(
                    this.scene.cameras.main
                ) as Phaser.Math.Vector2,
            });
        });
    }
}

export class InputController {
    constructor(private scene: Phaser.Scene) {
        console.log('InputController initializing');

        this.scene.input.once('pointerdown', () => {
            console.log('Pointer clicked');
        });

        this.scene.input.keyboard?.on('keydown-ESC', () => {
            this.scene.scene.start('GameOver');
        });
    }
}

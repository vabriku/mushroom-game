import type { GameObjects } from 'phaser';
import { Scene } from 'phaser';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    subTitle: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.image(512, 300, 'logo');

        this.title = this.add
            .text(512, 460, 'Tere, SEENED!', {
                fontFamily: 'Arial Black',
                fontSize: 38,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            })
            .setOrigin(0.5);

        this.subTitle = this.add
            .text(512, 530, 'Kliki, et edasi minna', {
                fontFamily: 'Arial Black',
                fontSize: 28,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 2,
                align: 'center',
            })
            .setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}

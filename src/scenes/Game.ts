import { Scene } from 'phaser';
import { Highlight } from '../components/Highlight';
import { MapController } from '../controllers/MapController';
import { GraphicsController } from '../controllers/GraphicsController';
import { InputController } from '../controllers/InputController';

export class Game extends Scene {
    messageText: Phaser.GameObjects.Text;
    highlight: Highlight;
    mapController?: MapController;
    graphicsController?: GraphicsController;
    inputcontroller?: InputController;

    constructor() {
        super('Game');
    }

    create() {
        // controllers
        this.mapController = new MapController(this);
        this.graphicsController = new GraphicsController(this);
        this.inputcontroller = new InputController(this);

        // TODO refactor logic into Selector and pass rendering to GraphicsController
        this.highlight = new Highlight(this).create();
    }

    update(): void {
        this.highlight.update();
    }
}

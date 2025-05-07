import { Scene } from 'phaser';
import { Highlight } from '../components/Highlight';
import { MapController } from '../controllers/MapController';
import { GraphicsController } from '../controllers/GraphicsController';
import { InputController } from '../controllers/InputController';
import { ClickTextPopup } from '@/components/ClickTextPopup';

export class Game extends Scene {
    highlight?: Highlight;
    clickPopup?: ClickTextPopup;
    mapController?: MapController;
    graphicsController?: GraphicsController;
    inputcontroller?: InputController;

    constructor() {
        super('Game');
    }

    create() {
        /**
         * NB order is important here for events sent in constructors.
         * Start listening before emitting events.
         */
        // controllers
        this.highlight = new Highlight(this);
        this.graphicsController = new GraphicsController(this);
        this.mapController = new MapController(this);
        this.inputcontroller = new InputController(this);
        this.clickPopup = new ClickTextPopup(this);
    }

    update(): void {
        this.highlight?.update();
    }
}

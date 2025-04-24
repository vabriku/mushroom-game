import type { Point, Size } from '@/types';
import type { EventData } from '../constants';
import { EVENT, TILE_SIZE } from '../constants';
import { getIsPointWithinBounds } from '../utils/getIsPointWithinBounds';

export class Highlight {
    private mapSize: Size;
    private isTileHighlighted = false;
    private point: Point | null = null;

    constructor(private scene: Phaser.Scene) {
        this.scene = scene;

        this.scene.events.on(EVENT.MAP_INITIALIZED, this.onMapInitialized, this);
    }

    private onMapInitialized(data: EventData[EVENT.MAP_INITIALIZED]) {
        this.mapSize = data;
    }

    private getTilePointFromWorldPoint(wordlPoint: Phaser.Math.Vector2): Point {
        const tileX = Math.floor(wordlPoint.x / TILE_SIZE);
        const tileY = Math.floor(wordlPoint.y / TILE_SIZE);

        return { x: tileX, y: tileY };
    }

    update() {
        // nothing to do if map size is not set
        if (!this.mapSize) {
            return;
        }

        const pointer = this.scene.input.activePointer;
        const worldPoint = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;

        const tilePoint = this.getTilePointFromWorldPoint(worldPoint);
        const mapWidth = this.mapSize.width * TILE_SIZE;
        const mapHeight = this.mapSize.height * TILE_SIZE;
        const isPointWithinBounds = getIsPointWithinBounds(worldPoint, {
            width: mapWidth,
            height: mapHeight,
        });
        const hasPointChanged = this.point?.x !== tilePoint.x || this.point?.y !== tilePoint.y;

        // console.log({
        //     isTileHighlighted: this.isTileHighlighted,
        //     point: this.point,
        //     tilePoint,
        //     hasPointChanged,
        //     isPointWithinBounds,
        // });

        if (!this.isTileHighlighted && isPointWithinBounds && hasPointChanged) {
            console.log('TILE_HIGHLIGHTED event');
            this.point = tilePoint;
            this.isTileHighlighted = true;
            this.scene.events.emit(EVENT.TILE_HIGHLIGHTED, {
                x: tilePoint.x,
                y: tilePoint.y,
            });

            return;
        }

        if (this.isTileHighlighted && hasPointChanged) {
            console.log('TILE_UNHIGHLIGHTED event');
            this.point = null;
            this.isTileHighlighted = false;
            this.scene.events.emit(EVENT.TILE_UNHIGHLIGHTED, {
                x: tilePoint.x,
                y: tilePoint.y,
            });
        }

        // this.highlight.setPosition(snappedX, snappedY);
        // this.highlight.setDepth(1);

        // // Check if the highlight is within the bounds of the map
        // this.highlight.setVisible(
        //     isPointWithinBounds(worldPoint, { width: mapWidth, height: mapHeight })
        // );

        // if (isPointWithinBounds(worldPoint, { width: mapWidth, height: mapHeight })) {
        //     this.scene.events.emit(EVENT.TILE_HIGHLIGHTED, {
        //         x: tileX,
        //         y: tileY,
        //     });
        // }
    }
}

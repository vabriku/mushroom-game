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

        if (!this.isTileHighlighted && isPointWithinBounds && hasPointChanged) {
            this.point = tilePoint;
            this.isTileHighlighted = true;
            this.scene.events.emit(EVENT.TILE_HIGHLIGHTED, {
                x: tilePoint.x,
                y: tilePoint.y,
            });

            return;
        }

        if (this.isTileHighlighted && hasPointChanged) {
            this.point = null;
            this.isTileHighlighted = false;
            this.scene.events.emit(EVENT.TILE_UNHIGHLIGHTED, {
                x: tilePoint.x,
                y: tilePoint.y,
            });
        }
    }
}

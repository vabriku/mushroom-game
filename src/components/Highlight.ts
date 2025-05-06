import type { Point } from '@/types';
import { getSceneData } from '@/utils/getSceneData';
import { EVENT, SCENE_DATA, TILE_SIZE } from '../constants';
import { getIsPointWithinBounds } from '../utils/getIsPointWithinBounds';

export class Highlight {
    private isTileHighlighted = false;
    private point: Point | null = null;

    constructor(private scene: Phaser.Scene) {
        this.scene = scene;
    }

    private getTilePointFromWorldPoint(wordlPoint: Phaser.Math.Vector2): Point {
        const tileX = Math.floor(wordlPoint.x / TILE_SIZE);
        const tileY = Math.floor(wordlPoint.y / TILE_SIZE);

        return { x: tileX, y: tileY };
    }

    update() {
        const mapSize = getSceneData(this.scene, SCENE_DATA.MAP_SIZE);
        // nothing to do if map size is not set
        if (!mapSize) {
            return;
        }

        const pointer = this.scene.input.activePointer;
        const worldPoint = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;

        const tilePoint = this.getTilePointFromWorldPoint(worldPoint);
        const mapWidth = mapSize.width * TILE_SIZE;
        const mapHeight = mapSize.height * TILE_SIZE;
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

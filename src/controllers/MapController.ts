import type { Size } from '@/types';
import { SCENE_DATA, IMAGE, MAP, TILE_SIZE, TILE, MAP_SIZE } from '../constants';
import { Tile } from '../entities/Tile';

export class MapController {
    private scene: Phaser.Scene;
    private mapGround: Phaser.Tilemaps.Tilemap;
    private mapItems: Phaser.Tilemaps.Tilemap;
    private tileMap: Tile[][];
    private mapSize: Size;
    private centerTile: Tile;

    constructor(scene: Phaser.Scene) {
        console.log('MapController initializing');

        this.scene = scene;
        this.tileMap = [];
        this.initializeMap();
    }

    private initializeMap() {
        // TODO: use Tiled tmx format to get tags with layer for easier tile interaction

        // Create the ground layer
        this.mapGround = this.scene.make.tilemap({
            // key: MAP.LEVEL_1_GROUND,
            key: 'custom',
            data: this.createMapData(),
            tileWidth: TILE_SIZE,
            tileHeight: TILE_SIZE,
        });
        const tileset = this.mapGround.addTilesetImage(IMAGE.TILESET);
        this.mapGround.createLayer(0, tileset ?? '');

        // Create the items layer
        this.mapItems = this.scene.make.tilemap({
            key: MAP.LEVEL_1_ITEMS,
            tileWidth: TILE_SIZE,
            tileHeight: TILE_SIZE,
        });
        this.mapItems.addTilesetImage(IMAGE.TILESET);
        this.mapItems.createLayer(0, tileset ?? '');

        this.mapSize = {
            width: this.mapGround.width,
            height: this.mapGround.height,
        };

        // set map data for other consumers
        this.scene.data.set(SCENE_DATA.MAP_SIZE, this.mapSize);
        this.scene.data.set(SCENE_DATA.TILEMAP_ITEMS, this.mapItems);
        this.scene.data.set(SCENE_DATA.TILEMAP_GROUND, this.mapGround);

        this.createTileMap();

        // create center player shroom. Maybe for GameController?
        this.centerTile =
            this.tileMap[Math.floor(this.mapSize.width / 2)][Math.floor(this.mapSize.height / 2)];

        this.centerTile.createShroomNode();
    }

    public createTileMap() {
        const map: Tile[] = [];
        this.mapGround.forEachTile((tile: Phaser.Tilemaps.Tile) => {
            const tileEntity = new Tile(tile);
            // console.log('Tile:', tileEntity);
            map.push(tileEntity);
        });

        for (let y = 0; y < this.mapSize.height; y++) {
            const row: Tile[] = [];
            for (let x = 0; x < this.mapSize.width; x++) {
                const groundTile = this.mapGround.getTileAt(x, y, true);

                // console.log(`Tile at (${x}, ${y}):`, tile);
                if (!groundTile) {
                    throw new Error(`Tile not found at (${x}, ${y})`);
                }

                const tileEntity = new Tile(groundTile);
                row.push(tileEntity);
            }
            this.tileMap.push(row);
        }
    }

    private createMapData() {
        // const mapData = [];
        // for (let y = 0; y < MAP_SIZE.height; y++) {
        //     const row = [];
        //     for (let x = 0; x < MAP_SIZE.width; x++) {
        //         row.push(TILE.GRASS);
        //     }
        //     mapData.push(row);
        // }

        // return mapData;

        return [
            [TILE.GRASS, TILE.GRASS, TILE.GRASS, TILE.GRASS, TILE.SAND],
            [TILE.GRASS, TILE.GRASS, TILE.GRASS, TILE.SAND, TILE.SAND],
            [TILE.GRASS, TILE.GRASS, TILE.GRASS, TILE.GRASS, TILE.SAND],
            [TILE.SAND, TILE.GRASS, TILE.GRASS, TILE.GRASS, TILE.GRASS],
            [TILE.SAND, TILE.SAND, TILE.GRASS, TILE.GRASS, TILE.GRASS],
        ];
    }
}

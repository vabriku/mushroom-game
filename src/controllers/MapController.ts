import { EVENT, IMAGE, MAP, TILE_SIZE } from '../constants';

export class MapController {
    private scene: Phaser.Scene;
    // private mapGround: Phaser.Tilemaps.Tilemap;
    // private mapItems: Phaser.Tilemaps.Tilemap;
    // private tileMap: Phaser.Tilemaps.Tilemap;
    private mapWidth: number;
    private mapHeight: number;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.initializeMap();
    }

    private initializeMap() {
        // TODO: use Tiled tmx format to get tags with layer for easier tile interaction

        // Create the ground layer
        const groundMap = this.scene.make.tilemap({
            key: MAP.LEVEL_1_GROUND,
            tileWidth: TILE_SIZE,
            tileHeight: TILE_SIZE,
        });
        const tileset = groundMap.addTilesetImage(IMAGE.TILESET);
        groundMap.createLayer(0, tileset ?? '', 0, 0);

        // Create the items layer
        const itemsMap = this.scene.make.tilemap({
            key: MAP.LEVEL_1_ITEMS,
            tileWidth: TILE_SIZE,
            tileHeight: TILE_SIZE,
        });
        itemsMap.addTilesetImage(IMAGE.TILESET);
        itemsMap.createLayer(0, tileset ?? '', 0, 0);

        this.mapWidth = groundMap.width;
        this.mapHeight = groundMap.height;

        console.log('DONE');
        this.scene.events.emit(EVENT.MAP_INITIALIZED, {
            width: this.mapWidth,
            height: this.mapHeight,
        });

        // return [groundMap, itemsMap];
    }

    // public create() {
    //     const groundTileset = this.mapGround.addTilesetImage('tileset', 'tileset');
    //     const itemsTileset = this.mapItems.addTilesetImage('tileset', 'tileset');

    //     this.mapGround.createLayer('ground', groundTileset);
    //     this.mapItems.createLayer('items', itemsTileset);
    // }

    // public createTileMap() {
    //     for (let y = 0; y < map.height; y++) {
    //         const row: Tile[] = [];
    //         for (let x = 0; x < map.width; x++) {
    //             const tile = layer.getTileAt(x, y);
    //             if (tile) {
    //                 const customTile = new Tile(tile);
    //                 row.push(customTile);
    //             } else {
    //                 row.push(null); // Handle empty tiles if necessary
    //             }
    //         }
    //         tileMap.push(row);
    //     }
    // }
}

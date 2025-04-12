import { IMAGE, MAP, TILE_SIZE } from '../constants';

export function addTilemapToScene(this: Phaser.Scene) {
    // TODO: use Tiled tmx format to get tags with layer for easier tile interaction

    // Create the ground layer
    const groundMap = this.make.tilemap({
        key: MAP.LEVEL_1_GROUND,
        tileWidth: TILE_SIZE,
        tileHeight: TILE_SIZE,
    });
    const tileset = groundMap.addTilesetImage(IMAGE.TILESET);
    groundMap.createLayer(0, tileset ?? '', 0, 0);

    // Create the items layer
    const itemsMap = this.make.tilemap({
        key: MAP.LEVEL_1_ITEMS,
        tileWidth: TILE_SIZE,
        tileHeight: TILE_SIZE,
    });
    itemsMap.addTilesetImage(IMAGE.TILESET);
    itemsMap.createLayer(0, tileset ?? '', 0, 0);

    return [groundMap, itemsMap];
}

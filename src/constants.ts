export const TILE_SIZE = 64;

export enum MAP {
    LEVEL_1_GROUND = 'LEVEL_1_GROUND',
    LEVEL_1_ITEMS = 'LEVEL_1_ITEMS',
}

export enum IMAGE {
    TILESET = 'TILESET',
}

export enum EVENT {
    MAP_INITIALIZED = 'MAP_INITIALIZED',
    TILE_SELECTED = 'TILE_SELECTED',
    TILE_HIGHLIGHTED = 'TILE_HIGHLIGHTED',
    TILE_UNHIGHLIGHTED = 'TILE_UNHIGHLIGHTED',
    TURN_ENDED = 'TURN_ENDED',
}

export interface EventData {
    [EVENT.MAP_INITIALIZED]: { width: number; height: number };
    [EVENT.TILE_SELECTED]: { x: number; y: number };
    [EVENT.TILE_HIGHLIGHTED]: { x: number; y: number };
    [EVENT.TILE_UNHIGHLIGHTED]: { x: number; y: number };
    [EVENT.TURN_ENDED]: { x: number; y: number };
}

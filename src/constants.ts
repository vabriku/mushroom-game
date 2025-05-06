import type { Point, Size } from '@/types';

export const MAP_SIZE = { width: 21, height: 21 };
export const TILE_SIZE = 64;

export enum MAP {
    LEVEL_1_GROUND = 'LEVEL_1_GROUND',
    LEVEL_1_ITEMS = 'LEVEL_1_ITEMS',
}

export enum IMAGE {
    TILESET = 'TILESET',
}

export enum EVENT {
    TILE_SELECTED = 'TILE_SELECTED',
    TILE_HIGHLIGHTED = 'TILE_HIGHLIGHTED',
    TILE_UNHIGHLIGHTED = 'TILE_UNHIGHLIGHTED',
    TURN_ENDED = 'TURN_ENDED',
    POINTER_DOWN = 'POINTER_DOWN',
}

export interface EventData {
    [EVENT.TILE_SELECTED]: Point;
    [EVENT.TILE_HIGHLIGHTED]: Point;
    [EVENT.TILE_UNHIGHLIGHTED]: Point;
    [EVENT.TURN_ENDED]: Point;
    [EVENT.POINTER_DOWN]: { pointer: Phaser.Input.Pointer; worldPoint: Point; tile?: undefined };
}

// scene data and game registry
export enum GAME_DATA {
    HIGH_SCORE = 'HIGH_SCORE',
}

export enum SCENE_DATA {
    MAP_SIZE = 'MAP_SIZE',
    TILEMAP_GROUND = 'TILEMAP_GROUND',
    TILEMAP_ITEMS = 'TILEMAP_ITEMS',
}

export interface DataType {
    [GAME_DATA.HIGH_SCORE]: number;
    [SCENE_DATA.MAP_SIZE]: Size;
    [SCENE_DATA.TILEMAP_GROUND]: Phaser.Tilemaps.Tilemap;
    [SCENE_DATA.TILEMAP_ITEMS]: Phaser.Tilemaps.Tilemap;
}

export const TILE = {
    MUSHROOM: 132,
    WEB_CENTER: 143,
    ROCK: 42,
    GRASS: 23,
    SAND: 18,
    TREE_1: 43,
    TREE_2: 60,
    TREE_3: 128,
} as const;

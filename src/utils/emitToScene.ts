import type { EventData } from '@/constants';

export function emitToScene<T extends EventData>(
    scene: Phaser.Scene,
    eventKey: keyof T,
    data?: T[keyof T]
) {
    if (typeof eventKey !== 'string') {
        throw new Error(`Event key ${eventKey.toString()} is not a string.`);
    }

    if (scene.events) {
        scene.events.emit(eventKey, data);
    } else {
        console.warn(`Scene ${scene.scene.key} does not have events.`);
    }
}

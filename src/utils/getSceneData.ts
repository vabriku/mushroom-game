import type { DataType } from '@/constants';
import { isNullish } from '@/utils/isNullish';

export function getSceneData<T extends keyof DataType>(scene: Phaser.Scene | undefined, key: T) {
    if (!scene) {
        console.warn('Scene is not available');

        return;
    }

    const data = scene.data.get(key);

    if (isNullish(data)) {
        return;
    }

    return data as DataType[T];
}

import { ImageSprite } from 'tscratch';
import { costumes } from '@/global/preload.ts';

export default class Alien extends ImageSprite<keyof typeof costumes> {

    // Initialization
    constructor({ scene }: { scene: string; }) {
        super({
            scene, costumes,
            costume: 'alien',
            lockAspectRatio: true,
            width: 65
        });
    }
}
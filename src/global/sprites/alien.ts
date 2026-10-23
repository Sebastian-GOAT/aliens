import { ImageSprite } from 'tscratch';
import { costumes } from '@/global/preload.ts';

export const attacks = ['ball', 'laser', 'meteor'] as const;

type State = 'loading' | 'attacking' | 'idle';
type Attack = (typeof attacks)[number];

export default class Alien extends ImageSprite<keyof typeof costumes> {
    public state: State = 'loading';
    public attack: Attack = 'meteor';

    // Initialization
    constructor({ scene }: { scene: string }) {
        super({
            scene,
            costumes,
            costume: 'alien',
            lockAspectRatio: true,
            width: 65
        });
    }
}

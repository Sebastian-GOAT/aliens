import type { Character } from '@/global/characters.ts';

export interface PlayerState {
    angle: number;
    dir: 1 | -1;
    color: string;
    character: Character
}
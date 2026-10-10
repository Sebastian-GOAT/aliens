import type { Character } from '@/global/characters.ts';

export interface PlayerState {
    angle: number;
    color: string;
    character: Character
}
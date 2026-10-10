import type { Vec2 } from 'tscratch';
import alien from '@/characters/alien.ts';

type CharacterData = Record<string, {
    vertices: Vec2[];
    edges: Vec2[];
}>;

const characters = { alien } as const satisfies CharacterData;

export type Character = keyof typeof characters;
export default characters;
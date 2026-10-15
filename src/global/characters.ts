import type { Vec2 } from 'tscratch';
import ufo from '@/characters/ufo.ts';

type CharacterData = Record<string, Vec2[]>;

const characters = { ufo } as const satisfies CharacterData;

export type Character = keyof typeof characters;
export default characters;
import type { PlayerState } from '@/types/player-state.ts';
import { RoomManager, Server } from 'tscratch/server';

const server = new Server({ port: Number(process.env.PORT) || 3000 });
const rm = new RoomManager<PlayerState>({
    server,
    defaultPlayerState: { angle: 0, dir: 1, character: 'ufo', color: 'red' },
    allowedPlayerState: ['dir', 'character', 'color']
});
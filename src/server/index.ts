import type { PlayerState } from '@/types/player-state.ts';
import { RoomManager, Server } from 'tscratch/server';

const server = new Server({ port: Number(process.env.PORT) || 3000 });
const rm = new RoomManager<PlayerState>({
    server,
    defaultPlayerState: { angle: 0, character: 'alien', color: 'red' },
    allowedPlayerState: ['character', 'color']
});
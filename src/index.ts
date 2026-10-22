import './global/preload.ts';

import { Engine, setBackground } from 'tscratch';
import './global/sprites/watermark.ts';
import scenes from './global/scenes.ts';
import mainScene from './scenes/main.ts';
import gameSingleplayerScene from './scenes/game-singleplayer.ts';

setBackground('#a322c4');

const engine = Engine.init();
void engine.setMaxFPS(60);

engine.setLoop(scenes.main, mainScene);
engine.setLoop(scenes.game_singleplayer, gameSingleplayerScene);

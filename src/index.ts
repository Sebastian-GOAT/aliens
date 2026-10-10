import './global/preload.ts';

import { Engine } from 'tscratch';
import './global/watermark.ts';
import scenes from './global/scenes.ts';
import mainScene from './scenes/main.ts';
import gameSingleplayerScene from './scenes/game-singleplayer.ts';

const engine = Engine.init();
engine.setMaxFPS(60);

engine.setLoop(scenes.main, mainScene);
engine.setLoop(scenes.game_singleplayer, gameSingleplayerScene);
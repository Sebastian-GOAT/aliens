import { Button, Engine, Text, TSCMath } from 'tscratch';
import scenes from '@/global/scenes.ts';
import { fonts } from '@/global/preload.ts';

const scene = scenes.main;

const title = new Text({
    scene,
    content: 'ALIENS',
    y: 60,
    fontSize: 54,
    fontFamily: fonts.awesome,
    color: 'black',
    outlineWidth: 1,
    outlineColor: 'white'
});
const singleplayer = new Button({
    scene,
    content: 'Singleplayer',
    width: 100,
    x: -75,
    y: -50,
    fontSize: 12,
    buttonOutlineWidth: 1,
    borderRadius: 5
});
const multiplayer = singleplayer.clone({ x: -singleplayer.x, content: 'Multiplayer' });

const engine = Engine.init();
let timeSP = 0;
let timeMP = 0;

export default () => {
    const dt = engine.getDeltaTime() * 180;

    // Button cursor
    if (engine.hovering(singleplayer) || engine.hovering(multiplayer)) engine.setCursor('pointer');
    else engine.setCursor('default');

    // Button hover animations
    if (engine.hovering(singleplayer)) {
        singleplayer.changeSize((1.1 - singleplayer.size) / 3);
        singleplayer.point(3 * TSCMath.sin(timeSP));
        timeSP += dt;
    } else {
        singleplayer.changeSize((1.0 - singleplayer.size) / 3);
        singleplayer.turn(-singleplayer.dir / 3);
        timeSP = 0;
    }

    if (engine.hovering(multiplayer)) {
        multiplayer.changeSize((1.1 - multiplayer.size) / 3);
        multiplayer.point(3 * TSCMath.sin(timeMP));
        timeMP += dt;
    } else {
        multiplayer.changeSize((1.0 - multiplayer.size) / 3);
        multiplayer.turn(-multiplayer.dir / 3);
        timeMP = 0;
    }

    // Title animation
    title.setY(60 + 8 * TSCMath.sin((performance.now() / 10) % 360));
    title.point(3 * TSCMath.cos((performance.now() / 10) % 360));
};

// Button click events
singleplayer.onPress(
    () => {
        engine.setScene(scenes.game_singleplayer);
    },
    { allowHold: false }
);

multiplayer.onPress(
    () => {
        engine.setScene(scenes.rooms);
    },
    { allowHold: false }
);

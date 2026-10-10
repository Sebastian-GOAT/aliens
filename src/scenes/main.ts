import { Button, Engine, Text, TSCMath } from 'tscratch';
import scenes from '@/global/scenes.ts';
import { fonts } from '@/global/preload.ts';

const scene = scenes.main;

const title = new Text({
    scene,
    content: 'ALIENS',
    y: 75,
    fontSize: 28,
    fontFamily: fonts.awesome
});
const singleplayer = new Button({
    scene,
    content: 'Singleplayer',
    width: 100,
    x: -75,
    y: -50,
    fontSize: 12
});
const multiplayer = new Button({
    scene,
    content: 'Multiplayer',
    width: 100,
    x: 75,
    y: -50,
    fontSize: 12
});

const engine = Engine.init();
let timeSP = 0;
let timeMP = 0;

export default () => {

    const dt = engine.getDeltaTime() * 180;

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
    title.setY(75 + 8 * TSCMath.sin((performance.now() / 10) % 360));
    title.point(3 * TSCMath.cos((performance.now() / 10) % 360));
};

// Button click events
singleplayer.onPress(() => {
    engine.setScene(scenes.game_singleplayer);
}, { allowHold: false });

multiplayer.onPress(() => {
    engine.setScene(scenes.rooms);
}, { allowHold: false });
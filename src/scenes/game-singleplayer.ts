import { canvas, Circle, CustomPolygon, Engine, Text } from 'tscratch';
import scenes from '@/global/scenes.ts';
import ufoVertices from '@/characters/ufo.ts';
import Alien from '@/global/alien.ts';

const scene = scenes.game_singleplayer;

const speed = 90;
let dir = -1;

// Circular trajectory outline
const outline = new Circle({
    scene,
    color: 'transparent',
    outlineWidth: 1,
    outlineColor: 'white',
    radius: 135
});

// Player
const player = new CustomPolygon({
    scene,
    vertices: ufoVertices,
    size: 10,
    outlineWidth: 0.1,
    color: 'red'
});

// Alien
const alien = new Alien({ scene });

// Score counter
const counter = new Text({
    scene,
    content: 'Score: 0',
    x: -canvas.width / 2 + 5,
    y: -canvas.height / 2 + 5,
    baseline: 'bottom',
    align: 'left',
    color: 'white'
});

const engine = Engine.init();

engine.onKeyPress('space', switchDirection, { allowHold: false });
engine.onPress(switchDirection, { allowHold: false });

function switchDirection() {
    if (engine.currentScene !== scene) return;

    dir = -dir;
    console.log(dir);
}

export default () => {

    const dt = engine.getDeltaTime();

    // Player movement
    player.goTo(0, 0);
    player.turn(dir * speed * dt);
    player.move(outline.radius);

    // Alien movement
    
};
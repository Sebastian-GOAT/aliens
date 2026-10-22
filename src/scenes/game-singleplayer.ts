import { canvas, Circle, CustomPolygon, Engine, Text } from 'tscratch';
import scenes from '@/global/scenes.ts';
import ufoVertices from '@/characters/ufo.ts';
import Alien, { attacks } from '@/global/sprites/alien.ts';
import Meteor from '@/global/sprites/meteor.ts';

const scene = scenes.game_singleplayer;

const METEORS = 6;
const SPEED = 90;
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
    y: outline.radius,
    vertices: ufoVertices,
    size: 10,
    outlineWidth: 0.1,
    color: 'red'
});

// Alien
const alien = new Alien({ scene });

// Meteors
const meteors: Meteor[] = [];

// Score counter
const _counter = new Text({
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
}

attack();

export default () => {
    const dt = engine.getDeltaTime();

    // Player movement
    player.goTo(0, 0);
    player.turn(dir * SPEED * dt);
    player.move(outline.radius);

    // Alien movement
    switch (alien.state) {
        case 'loading': {
            alien.turn(60 * dt);
            break;
        }

        case 'attacking': {
            const dTheta = (alien.targetDir - alien.dir) * 5 * dt;
            alien.turn(dTheta);

            // Attack
            if (Math.abs(dTheta) % 180 < 0.5) {
                switch (alien.attack) {
                    case 'ball': {
                        break;
                    }

                    case 'laser': {
                        break;
                    }

                    case 'meteor': {
                        const step = 360 / METEORS;

                        for (let i = 0; i < METEORS; i++)
                            meteors.push(new Meteor({ scene, dir: i * step }));

                        break;
                    }
                }

                alien.state = 'loading';
                setTimeout(attack, 3000);
            }

            break;
        }
    }

    // Meteor movement
    for (let i = 0; i < meteors.length; i++) {
        const meteor = meteors[i]!;

        meteor.move(120 * dt);

        if (meteor.distanceTo(0, 0) > 300 + meteor.radius) {
            engine.removeSprite(meteor);
            meteors.splice(i, 1);
        }
    }
};

function attack() {
    alien.state = 'attacking';
    alien.attack = attacks[Math.floor(Math.random() * attacks.length)]!;
    const temp = alien.dir;

    alien.pointTowards(player.x, player.y);
    alien.targetDir = alien.dir - 180;

    alien.point(temp);
}

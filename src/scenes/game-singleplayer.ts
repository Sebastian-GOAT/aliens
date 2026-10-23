import { canvas, Circle, CustomPolygon, Engine, Text } from 'tscratch';
import scenes from '@/global/scenes.ts';
import ufoVertices from '@/characters/ufo.ts';
import Alien, { attacks } from '@/global/sprites/alien.ts';
import Meteor from '@/global/sprites/meteor.ts';
import Laser from '@/global/sprites/laser.ts';
import Ball from '@/global/sprites/ball.ts';

const scene = scenes.game_singleplayer;

const METEORS = 6;
const LASERS = 5;
const BALLS = 3;
const SPEED = 90;
const LOADING_MS = 3000;
const ATTACK_MS = 4000;
let dir = -1;
let score = 0;

let firstTimeIdle = false;
let firstLoading = true;

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

// Weapons
const meteors: Meteor[] = [];
const lasers: Laser[] = [];
const balls: Ball[] = [];

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

// Controls
const engine = Engine.init();

engine.onKeyPress('space', switchDirection, { allowHold: false });
engine.onPress(switchDirection, { allowHold: false });

function switchDirection() {
    if (engine.currentScene !== scene) return;
    dir = -dir;
}

// Attack function
function attack() {
    alien.state = 'attacking';
    alien.attack = attacks[Math.floor(Math.random() * attacks.length)]!;
}

// Game loop
export default () => {
    const dt = engine.getDeltaTime();

    // First attack
    if (firstLoading) {
        firstLoading = false;
        setTimeout(attack, LOADING_MS);
    }

    // Player movement
    player.goTo(0, 0);
    player.turn(dir * SPEED * dt);
    player.move(outline.radius);

    // Alien movement
    switch (alien.state) {
        case 'loading': {
            alien.turn((360 / LOADING_MS) * 1500 * dt);
            break;
        }

        case 'attacking': {
            const dTheta = -alien.dir * 5 * dt;
            alien.turn(dTheta);

            // Attack
            if (Math.abs(dTheta) % 180 < 0.1) {
                switch (alien.attack) {
                    case 'ball': {
                        for (let i = 0; i < BALLS; i++) {
                            const angle = Math.random() * 360;
                            balls.push(new Ball({ scene, angle }));
                        }
                        break;
                    }

                    case 'laser': {
                        const step = 360 / LASERS;

                        for (let i = 0; i < LASERS; i++) {
                            lasers.push(
                                new Laser({
                                    scene,
                                    dir: i * step,
                                    length: outline.radius,
                                    layer: -1
                                })
                            );
                        }

                        break;
                    }

                    case 'meteor': {
                        const step = 360 / METEORS;

                        for (let i = 0; i < METEORS; i++)
                            meteors.push(new Meteor({ scene, dir: i * step }));

                        break;
                    }
                }

                alien.state = 'idle';
                firstTimeIdle = true;
            }

            break;
        }

        case 'idle': {
            if (!firstTimeIdle) break;
            firstTimeIdle = false;

            setTimeout(() => {
                alien.state = 'loading';

                score++;
                counter.setContent(`Score: ${score}`);

                // Clear all weapons
                for (const meteor of meteors) engine.removeSprite(meteor);
                for (const laser of lasers) engine.removeSprite(laser);
                for (const ball of balls) engine.removeSprite(ball);
                meteors.length = 0;
                lasers.length = 0;
                balls.length = 0;
            }, ATTACK_MS);
            setTimeout(attack, ATTACK_MS + LOADING_MS);

            break;
        }
    }

    // Meteor movement
    for (let i = 0; i < meteors.length; i++) {
        const meteor = meteors[i]!;
        meteor.move(120 * dt);
    }

    // Ball movement
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i]!;
        ball.move(180 * dt);
    }
};

import { Circle, TSCMath } from 'tscratch';

export default class Ball extends Circle {
    constructor({ scene, angle }: { scene: string; angle: number }) {
        const radius = 15;

        super({
            scene,
            x: (300 + radius) * TSCMath.sin(angle),
            y: (300 + radius) * TSCMath.cos(angle),
            dir: angle - 180,
            radius,
            color: 'green',
            outlineColor: 'white',
            outlineWidth: 3
        });
    }
}

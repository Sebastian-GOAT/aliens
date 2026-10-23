import { Rectangle } from 'tscratch';

interface LaserOptions {
    scene: string;
    length: number;
    dir: number;
    layer: number;
}

export default class Laser extends Rectangle {
    constructor({ scene, length, dir, layer }: LaserOptions) {
        super({
            scene,
            dir,
            layer,
            width: 5,
            height: length,
            pivot: [0, -length / 2],
            color: 'white',
            outlineColor: 'red',
            outlineWidth: 2
        });
    }
}

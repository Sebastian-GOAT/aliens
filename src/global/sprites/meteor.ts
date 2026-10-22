import { Circle } from 'tscratch';

export default class Meteor extends Circle {
    constructor({ scene, dir }: { scene: string; dir: number }) {
        super({
            scene,
            dir,
            radius: 15,
            outlineWidth: 3,
            color: 'gray'
        });
    }
}

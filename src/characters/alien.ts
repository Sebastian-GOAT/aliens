import type { Vec2 } from 'tscratch';

const vertices: Vec2[] = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1]
];

const edges: Vec2[] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0]
];

export default { vertices, edges };
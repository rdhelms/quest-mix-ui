import { World } from '../classes/world';
import { Player } from '../classes/player';

export interface IGameOptions {
    canvas: CanvasRenderingContext2D;
    player?: Player;
    world?: World;
}

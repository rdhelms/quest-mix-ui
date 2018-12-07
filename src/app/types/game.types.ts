import { World } from '../classes/world';
import { IWorldState } from './world.types';

export interface IGameState {
    world: IWorldState;
}

export interface IGameOptions {
    canvas: CanvasRenderingContext2D;
    world: World;
}

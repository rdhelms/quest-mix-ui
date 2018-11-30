import { World } from '../classes/world';
import { Player } from '../classes/player';
import { IPlayerState } from './player.types';
import { IWorldState } from './world.types';

export interface IGameState {
    player: IPlayerState;
    world: IWorldState;
}

export interface IGameOptions {
    canvas: CanvasRenderingContext2D;
    player: Player;
    world: World;
}

import { Scene } from '../classes/scene';
import { IPlayerState } from './player.types';
import { Player } from '../classes/player';
import { ISceneState } from './scene.types';

export interface IWorldState {
    name: string;
    player: IPlayerState;
    scenes: ISceneState[];
}

export interface IWorldOptions {
    name: string;
    player: Player;
    scenes: Scene[];
}

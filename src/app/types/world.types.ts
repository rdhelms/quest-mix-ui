import { Scene } from '../classes/scene';
import { IPlayerState } from './player.types';
import { ISceneState } from './scene.types';

export interface IWorldSettings {
    speed: number;
}

export interface IWorldState {
    name: string;
    player: IPlayerState;
    settings: IWorldSettings;
    scenes: ISceneState[];
    currentSceneId: number;
}

export interface IWorldOptions {
    name: string;
    player: IPlayerState;
    settings: IWorldSettings;
    scenes: ISceneState[];
    currentSceneId: number;
}

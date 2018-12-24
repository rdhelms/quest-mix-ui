import { Scene } from '../classes/scene';
import { IPlayerState } from './player.types';
import { ISceneState } from './scene.types';

export interface IWorldSettings {
    speed: number;
}

export interface IWorldState {
    id: number;
    name: string;
    player: IPlayerState;
    settings: IWorldSettings;
    scenes: ISceneState[];
    currentSceneId: number;
}

export interface IWorldOptions {
    id: number;
    name: string;
    player: IPlayerState;
    settings: IWorldSettings;
    scenes: ISceneState[];
    currentSceneId: number;
}

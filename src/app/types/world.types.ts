import { IPlayerState } from './player.types';
import { ISceneState } from './scene.types';
import { IUser } from './user.types';

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
    owner: IUser;
}

export interface IWorldOptions {
    id: number;
    name: string;
    player: IPlayerState;
    settings: IWorldSettings;
    scenes: ISceneState[];
    currentSceneId: number;
}

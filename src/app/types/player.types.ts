import { IAsset } from './asset.types';

export interface IPlayerSize {
    width: number;
    height: number;
}

export interface IPosition {
    x: number;
    y: number;
}

export type TPlayerAction = 'walkUp' | 'walkRight' | 'walkDown' | 'walkLeft';

export interface IPlayerState {
    pos: IPosition;
    action: TPlayerAction;
    size: IPlayerSize;
    avatar: IAsset;
}

export interface IPlayerOptions {
    pos: IPosition;
    action: TPlayerAction;
    size: IPlayerSize;
    avatar: IAsset;
}

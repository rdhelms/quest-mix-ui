export interface IPlayerSize {
    width: number;
    height: number;
}

export interface IPosition {
    x: number;
    y: number;
}

export type TDirection = 'left' | 'right' | 'up' | 'down';

export interface IPlayerState {
    pos: IPosition;
    direction: TDirection;
    speed: number;
    size: IPlayerSize;
    color: string;
}

export interface IPlayerOptions {
    pos: IPosition;
    direction: TDirection;
    speed: number;
    size: IPlayerSize;
    color: string;
}

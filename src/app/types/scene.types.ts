export interface ISceneObj {
    pos: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    color: string;
}

export interface ISceneState {
    id?: number;
    objects: ISceneObj[];
}

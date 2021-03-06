export type TDrawType = 'brush' | 'eraser' | 'colorPicker';

export interface IPixel {
    pos: {
        x: number;
        y: number;
    };
    size: number;
    color: string;
}

export type TFrame = IPixel[][];

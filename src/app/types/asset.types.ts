import { TFrame } from './editor.types';

export type TAssetType = 'background' | 'foreground' | 'avatar' | 'entity' | 'object';

export interface IAsset {
    id: number;
    name: string;
    frames: TFrame[];
}

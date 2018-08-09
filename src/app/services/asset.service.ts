import { Injectable } from '@angular/core';
import { IAsset, TAssetType } from '../types/asset.types';
import { TFrame } from '../types/editor.types';

@Injectable({
    providedIn: 'root'
})
export class AssetService {

    currentType: TAssetType = 'background';
    currentAsset?: IAsset;

    constructor() { }

    async getAssetsByType(assetType: TAssetType): Promise<IAsset[]> {
        const assets = JSON.parse(localStorage.getItem(`${assetType}List`) || '[]');
        return (assets || []);
    }

    async getAssets(): Promise<IAsset[]> {
        const assets = JSON.parse(localStorage.getItem(`${this.currentType}List`) || '[]');
        return (assets || []);
    }

    async createAsset(type: TAssetType) {
        const newAsset: IAsset = {
            id: Date.now(),
            name: '',
            frames: (type === 'background' || type === 'foreground') ? [[]] : Array(4).fill(null).map(() => [])
        };
        const assets = await this.getAssets();
        assets.push(newAsset);
        localStorage.setItem(`${this.currentType}List`, JSON.stringify(assets));
        return newAsset;
    }

    async saveAsset(newAsset: IAsset) {
        localStorage.setItem(this.currentType, JSON.stringify(newAsset));
        const assets = await this.getAssets();
        let oldAssetIndex = assets.findIndex((asset) => {
            return asset.id === newAsset.id;
        });
        if (oldAssetIndex !== -1) {
            assets[oldAssetIndex] = newAsset;
        } else {
            assets.push(newAsset);
        }
        localStorage.setItem(`${this.currentType}List`, JSON.stringify(assets));
    }

    async getAssetById(id: number) {
        const assets = await this.getAssets();
        return assets.find((asset) => asset.id === id) || null;
    }

    async getCurrentAsset() {
        const loadedAssetString = localStorage.getItem(this.currentType);
        if (!loadedAssetString) {
            return null;
        } else {
            return JSON.parse(loadedAssetString) as IAsset;
        }
    }

    copyFrame(frame: TFrame) {
        const clipboard = JSON.parse(localStorage.getItem('clipboard') || '{}');
        clipboard.assetFrame = frame;
        localStorage.setItem('clipboard', JSON.stringify(clipboard));
    }

    pasteFrame() {
        const clipboard = JSON.parse(localStorage.getItem('clipboard') || '{}');
        return clipboard.assetFrame as TFrame;
    }
}

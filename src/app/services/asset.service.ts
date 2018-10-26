import { Injectable } from '@angular/core';
import { IAsset, TAssetType } from '../types/asset.types';
import { TFrame } from '../types/editor.types';
import { BackgroundService } from './background.service';
import { ForegroundService } from './foreground.service';
import { AvatarService } from './avatar.service';
import { EntityService } from './entity.service';
import { ObjectService } from './object.service';

@Injectable({
    providedIn: 'root'
})
export class AssetService {

    currentType: TAssetType = 'background';
    currentAsset?: IAsset;

    constructor(
        private backgroundService: BackgroundService,
        private foregroundService: ForegroundService,
        private avatarService: AvatarService,
        private entityService: EntityService,
        private objectService: ObjectService
    ) { }

    async getAssetsByType(assetType: TAssetType): Promise<IAsset[]> {
        const assets =
            assetType === 'background' ? this.backgroundService.getBackgrounds() :
            assetType === 'foreground' ? this.foregroundService.getForegrounds() :
            assetType === 'avatar' ? this.avatarService.getAvatars() :
            assetType === 'entity' ? this.entityService.getEntities() :
            this.objectService.getObjects();

        return await assets.toPromise() || [];
    }

    async getAssets(): Promise<IAsset[]> {
        const assets =
            this.currentType === 'background' ? this.backgroundService.getBackgrounds() :
            this.currentType === 'foreground' ? this.foregroundService.getForegrounds() :
            this.currentType === 'avatar' ? this.avatarService.getAvatars() :
            this.currentType === 'entity' ? this.entityService.getEntities() :
            this.objectService.getObjects();
        return await assets.toPromise() || [];
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
        try {
            console.log('trying');
            const existingAssetRequest =
            this.currentType === 'background' ? this.backgroundService.getBackgroundById(newAsset.id) :
            this.currentType === 'foreground' ? this.foregroundService.getForegroundById(newAsset.id) :
            this.currentType === 'avatar' ? this.avatarService.getAvatarById(newAsset.id) :
            this.currentType === 'entity' ? this.entityService.getEntityById(newAsset.id) :
            this.objectService.getObjectById(newAsset.id);
            await existingAssetRequest.toPromise();
            this.currentType === 'background' ? this.backgroundService.updateBackground(newAsset) :
            this.currentType === 'foreground' ? this.foregroundService.updateForeground(newAsset) :
            this.currentType === 'avatar' ? this.avatarService.updateAvatar(newAsset) :
            this.currentType === 'entity' ? this.entityService.updateEntity(newAsset) :
            this.objectService.updateObject(newAsset);
            console.log('end of trying');
        } catch (err) {
            console.log('catching');
            const createRequest =
                this.currentType === 'background' ? this.backgroundService.createBackground(newAsset) :
                this.currentType === 'foreground' ? this.foregroundService.createForeground(newAsset) :
                this.currentType === 'avatar' ? this.avatarService.createAvatar(newAsset) :
                this.currentType === 'entity' ? this.entityService.createEntity(newAsset) :
                this.objectService.createObject(newAsset);
            const result = await createRequest.toPromise();
            console.log(result);
            console.log('end of catching');
        }
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

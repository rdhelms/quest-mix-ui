import { Component, OnInit, Input } from '@angular/core';
import { TAssetType, IAsset } from '../../types/asset.types';
import { IUser } from '../../types/user.types';
import { UserService } from '../../services/user.service';
import { AssetService } from '../../services/asset.service';

export type TViewState = 'public' | 'private' | 'edit' | 'loading';

@Component({
    selector: 'app-assets',
    templateUrl: './assets.component.html',
    styleUrls: ['./assets.component.css'],
})
export class AssetsComponent implements OnInit {
    @Input() canvasSize!: number;
    @Input() assetType!: TAssetType;
    @Input() assetId?: number;

    user?: IUser;
    viewState: TViewState = 'loading';
    assetList: IAsset[] = [];
    myAssets: IAsset[] = [];
    asset?: IAsset;

    constructor(
        private userService: UserService,
        private assetService: AssetService,
    ) { }

    async ngOnInit() {
        this.assetService.currentType = this.assetType;
        this.getCurrentUser();
        await this.updateAssetLists();
        await this.loadAsset();
        this.setViewState('public');
    }

    getCurrentUser() {
        this.user = this.userService.currentUser;
    }

    async updateAssetLists() {
        this.assetList = await this.assetService.getAssets();
        const user = this.user;
        if (user && user.id !== undefined) {
            this.myAssets = this.assetList.filter((asset) => asset.ownerId === user.id);
        } else {
            this.myAssets = [];
        }
    }

    async loadAsset() {
        let loadedAsset: IAsset | null | undefined;
        if (this.assetId !== undefined) {
            loadedAsset = await this.assetService.getAssetById(this.assetId);
        }
        if (!loadedAsset) {
            loadedAsset = await this.assetService.getCurrentAsset();
        }

        this.asset = loadedAsset || undefined;
    }

    async selectAssetType(type: TAssetType) {
        const originalViewState = this.viewState;
        this.setViewState('loading');
        this.assetService.currentType = type;
        this.assetType = type;
        await this.updateAssetLists();
        await this.loadAsset();
        this.setViewState(originalViewState);
    }

    setViewState(state: TViewState) {
        this.viewState = state;
    }

    selectAsset(asset: IAsset) {
        this.asset = asset;
        this.setViewState('edit');
    }

    pluralizeAssetType(assetType: TAssetType) {
        return assetType === 'background' ? 'backgrounds'
            : assetType === 'foreground' ? 'foregrounds'
            : assetType === 'object' ? 'objects'
            : assetType === 'entity' ? 'entities'
            : 'avatars';
    }

    async createAsset() {
        this.setViewState('loading');
        const newAsset = await this.assetService.createAsset(this.assetType);
        this.asset = newAsset;
        this.setViewState('edit');
    }

}

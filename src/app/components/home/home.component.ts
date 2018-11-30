import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { IAsset } from '../../types/asset.types';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    @Output() selectedAssetType = new EventEmitter<any>();
    @Output() selectedAsset = new EventEmitter<any>();

    backgrounds: IAsset[] = [];
    foregrounds: IAsset[] = [];
    objects: IAsset[] = [];
    entities: IAsset[] = [];
    avatars: IAsset[] = [];
    loading = true;

    constructor(
        private assetService: AssetService
    ) { }

    async ngOnInit() {
        // Backgrounds
        const loadedBackgrounds = this.assetService.getAssetsByType('background');
        const loadedForegrounds = this.assetService.getAssetsByType('foreground');
        const loadedObjects = this.assetService.getAssetsByType('object');
        const loadedEntities = this.assetService.getAssetsByType('entity');
        const loadedAvatars = this.assetService.getAssetsByType('avatar');

        const result = await Promise.all([
            loadedBackgrounds,
            loadedForegrounds,
            loadedObjects,
            loadedEntities,
            loadedAvatars
        ]);

        if (result[0]) {
            this.backgrounds = result[0];
        }

        // Foregrounds
        if (result[1]) {
            this.foregrounds = result[1];
        }

        // Objects
        if (result[2]) {
            this.objects = result[2];
        }

        // Entities
        if (result[3]) {
            this.entities = result[3];
        }

        // Avatars
        if (result[4]) {
            this.avatars = result[4];
        }

        this.loading = false;
    }

    selectAsset(assetType: string, asset: any) {
        const nowEditing = {
            type: (assetType === 'quests') ? 'quest'
                : (assetType === 'worlds') ? 'world'
                : (assetType === 'backgrounds') ? 'background'
                : (assetType === 'foregrounds') ? 'foreground'
                : (assetType === 'objects') ? 'object'
                : (assetType === 'entities') ? 'entity'
                : (assetType === 'avatars') ? 'avatar'
                : 'background',
            info: asset ? asset : undefined
        };
        this.selectedAsset.emit(nowEditing);
    }

}

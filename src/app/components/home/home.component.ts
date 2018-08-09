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

    constructor(
        private assetService: AssetService
    ) { }

    async ngOnInit() {
        // Backgrounds
        const loadedBackgrounds = await this.assetService.getAssetsByType('background');
        if (loadedBackgrounds) {
            this.backgrounds = loadedBackgrounds;
        }
        
        // Foregrounds
        const loadedForegrounds = await this.assetService.getAssetsByType('foreground');
        if (loadedForegrounds) {
            this.foregrounds = loadedForegrounds;
        }

        // Objects
        const loadedObjects = await this.assetService.getAssetsByType('object');
        if (loadedObjects) {
            this.objects = loadedObjects;
        }

        // Entities
        const loadedEntities = await this.assetService.getAssetsByType('entity');
        if (loadedEntities) {
            this.entities = loadedEntities;
        }

        // Avatars
        const loadedAvatars = await this.assetService.getAssetsByType('avatar');
        if (loadedAvatars) {
            this.avatars = loadedAvatars;
        }

    }

    selectAsset(assetType: string, asset: any) {
        const nowEditing = {
            type: (assetType === 'backgrounds') ? 'background' 
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

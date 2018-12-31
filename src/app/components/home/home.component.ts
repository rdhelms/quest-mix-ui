import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { IAsset } from '../../types/asset.types';
import { WorldService } from '../../services/world.service';
import { IWorldState } from '../../types/world.types';

export type TSelectedAssetEvent = {
    type: 'quest' | 'world';
    info: IWorldState;
} | {
    type: 'background' | 'foreground' | 'object' | 'entity' | 'avatar';
    info: IAsset | undefined;
};

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    @Output() selectedAsset = new EventEmitter<TSelectedAssetEvent>();

    worlds: IWorldState[] = [];
    backgrounds: IAsset[] = [];
    foregrounds: IAsset[] = [];
    objects: IAsset[] = [];
    entities: IAsset[] = [];
    avatars: IAsset[] = [];
    loading = true;

    constructor(
        private worldService: WorldService,
        private assetService: AssetService,
    ) { }

    async ngOnInit() {
        // Worlds
        const loadedWorlds = this.worldService.getAllWorlds().toPromise();

        // Backgrounds
        const loadedBackgrounds = this.assetService.getAssetsByType('background');
        const loadedForegrounds = this.assetService.getAssetsByType('foreground');
        const loadedObjects = this.assetService.getAssetsByType('object');
        const loadedEntities = this.assetService.getAssetsByType('entity');
        const loadedAvatars = this.assetService.getAssetsByType('avatar');

        const result = await Promise.all([
            loadedWorlds,
            loadedBackgrounds,
            loadedForegrounds,
            loadedObjects,
            loadedEntities,
            loadedAvatars,
        ]);

        if (result[0]) {
            this.worlds = result[0];
        }

        if (result[1]) {
            this.backgrounds = result[1];
        }

        // Foregrounds
        if (result[2]) {
            this.foregrounds = result[2];
        }

        // Objects
        if (result[3]) {
            this.objects = result[3];
        }

        // Entities
        if (result[4]) {
            this.entities = result[4];
        }

        // Avatars
        if (result[5]) {
            this.avatars = result[5];
        }

        this.loading = false;
    }

    selectAsset(assetType: string, asset: IAsset | IWorldState) {
        const nowEditing = {
            type: (assetType === 'quests') ? 'quest'
                : (assetType === 'worlds') ? 'world'
                : (assetType === 'backgrounds') ? 'background'
                : (assetType === 'foregrounds') ? 'foreground'
                : (assetType === 'objects') ? 'object'
                : (assetType === 'entities') ? 'entity'
                : (assetType === 'avatars') ? 'avatar'
                : 'background',
            info: asset ? asset : undefined,
        } as TSelectedAssetEvent;
        this.selectedAsset.emit(nowEditing);
    }

}

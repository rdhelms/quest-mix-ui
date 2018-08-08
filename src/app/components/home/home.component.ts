import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BackgroundService } from '../../services/background.service';
import { IBackground } from '../../types/background.types';
import { IAvatar } from '../../types/avatar.types';
import { AvatarService } from '../../services/avatar.service';
import { ForegroundService } from '../../services/foreground.service';
import { IForeground } from '../../types/foreground.types';
import { ObjectService } from '../../services/object.service';
import { IObject } from '../../types/object.types';
import { EntityService } from '../../services/entity.service';
import { IEntity } from '../../types/entity.types';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    @Output() selectedAssetType = new EventEmitter<any>();
    @Output() selectedAsset = new EventEmitter<any>();

    backgrounds: IBackground[] = [];
    foregrounds: IForeground[] = [];
    objects: IObject[] = [];
    entities: IEntity[] = [];
    avatars: IAvatar[] = [];

    constructor(
        private backgroundService: BackgroundService,
        private foregroundService: ForegroundService,
        private objectService: ObjectService,
        private entityService: EntityService,
        private avatarService: AvatarService
    ) { }

    async ngOnInit() {
        // TODO: Get ALL the assets, instead of just the current ones in local storage

        // Backgrounds
        const loadedBackground = await this.backgroundService.getBackground();
        if (loadedBackground) {
            this.backgrounds.push(loadedBackground);
        }

        // Foregrounds
        const loadedForeground = await this.foregroundService.getForeground();
        if (loadedForeground) {
            this.foregrounds.push(loadedForeground);
        }

        // Objects
        const loadedObject = await this.objectService.getObject();
        if (loadedObject) {
            this.objects.push(loadedObject);
        }

        // Entities
        const loadedEntity = await this.entityService.getEntity();
        if (loadedEntity) {
            this.entities.push(loadedEntity);
        }

        // Avatars
        const loadedAvatar = await this.avatarService.getAvatar();
        if (loadedAvatar) {
            this.avatars.push(loadedAvatar);
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

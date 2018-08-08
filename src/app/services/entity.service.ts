import { Injectable } from '@angular/core';
import { IEntity } from '../types/entity.types';
import { TFrame } from '../types/editor.types';

@Injectable({
    providedIn: 'root'
})
export class EntityService {

    currentEntity?: IEntity;

    constructor() { }

    async saveEntity(entity: IEntity) {
        localStorage.setItem('entity', JSON.stringify(entity));
    }

    async getEntity(/*id: number*/) {
        const loadedEntityString = localStorage.getItem('entity');
        if (!loadedEntityString) {
            return null;
        } else {
            return JSON.parse(loadedEntityString) as IEntity;
        }
    }

    copyFrame(frame: TFrame) {
        const clipboard = JSON.parse(localStorage.getItem('clipboard') || '{}');
        clipboard.entityFrame = frame;
        localStorage.setItem('clipboard', JSON.stringify(clipboard));
    }

    pasteFrame() {
        const clipboard = JSON.parse(localStorage.getItem('clipboard') || '{}');
        return clipboard.entityFrame as TFrame;
    }
}

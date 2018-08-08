import { Injectable } from '@angular/core';
import { IObject } from '../types/object.types';
import { TFrame } from '../types/editor.types';

@Injectable({
    providedIn: 'root'
})
export class ObjectService {

    currentObject?: IObject;

    constructor() { }

    async saveObject(object: IObject) {
        localStorage.setItem('object', JSON.stringify(object));
    }

    async getObject(/*id: number*/) {
        const loadedObjectString = localStorage.getItem('object');
        if (!loadedObjectString) {
            return null;
        } else {
            return JSON.parse(loadedObjectString) as IObject;
        }
    }

    copyFrame(frame: TFrame) {
        const clipboard = JSON.parse(localStorage.getItem('clipboard') || '{}');
        clipboard.objectFrame = frame;
        localStorage.setItem('clipboard', JSON.stringify(clipboard));
    }

    pasteFrame() {
        const clipboard = JSON.parse(localStorage.getItem('clipboard') || '{}');
        return clipboard.objectFrame as TFrame;
    }
}

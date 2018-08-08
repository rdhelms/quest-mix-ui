import { Injectable } from '@angular/core';
import { IAvatar } from '../types/avatar.types';
import { TFrame } from '../types/editor.types';

@Injectable({
    providedIn: 'root'
})
export class AvatarService {

    currentAvatar?: IAvatar;

    constructor() { }

    async saveAvatar(avatar: IAvatar) {
        localStorage.setItem('avatar', JSON.stringify(avatar));
    }

    async getAvatar(/*id: number*/) {
        const loadedAvatarString = localStorage.getItem('avatar');
        if (!loadedAvatarString) {
            return null;
        } else {
            return JSON.parse(loadedAvatarString) as IAvatar;
        }
    }

    copyFrame(frame: TFrame) {
        const clipboard = JSON.parse(localStorage.getItem('clipboard') || '{}');
        clipboard.avatarFrame = frame;
        localStorage.setItem('clipboard', JSON.stringify(clipboard));
    }

    pasteFrame() {
        const clipboard = JSON.parse(localStorage.getItem('clipboard') || '{}');
        return clipboard.avatarFrame as TFrame;
    }
}

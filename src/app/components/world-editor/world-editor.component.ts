import { Component, OnInit } from '@angular/core';
import { WorldService } from '../../services/world.service';
import { IWorldState } from '../../types/world.types';

@Component({
    selector: 'world-editor',
    templateUrl: './world-editor.component.html',
    styleUrls: ['./world-editor.component.css'],
})
export class WorldEditorComponent implements OnInit {
    world?: IWorldState;
    loading = true;

    constructor(
        private worldService: WorldService,
    ) {}

    async ngOnInit() {
        this.loading = true;
        const worldId = this.worldService.currentWorldId;

        this.world = await this.worldService.getWorldById(worldId).toPromise();
        console.log(this.world);
        this.loading = false;
    }
}

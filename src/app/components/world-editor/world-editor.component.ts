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
    snapshot?: IWorldState;
    loading = true;
    editing = false;

    constructor(
        private worldService: WorldService,
    ) {}

    async ngOnInit() {
        this.loading = true;
        const worldId = this.worldService.currentWorldId;

        this.world = await this.worldService.getWorldById(worldId).toPromise();
        this.loading = false;
    }

    startEditing() {
        this.snapshot = JSON.parse(JSON.stringify(this.world));
        this.editing = true;
    }

    cancelEditing() {
        this.world = this.snapshot;
        this.editing = false;
    }

    saveEditing() {
        this.editing = false;
    }
}

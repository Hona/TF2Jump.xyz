import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KanbanAppComponent } from './kanban.app.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: { breadcrumb: 'Board' }, component: KanbanAppComponent }
    ])],
    exports: [RouterModule]
})
export class KanbanAppRoutingModule { }

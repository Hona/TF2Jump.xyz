import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileAppComponent } from './file.app.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FileAppComponent }
    ])],
    exports: [RouterModule]
})
export class FileAppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarAppComponent } from './calendar.app.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CalendarAppComponent }
    ])],
    exports: [RouterModule]
})
export class CalendarAppRoutingModule { }

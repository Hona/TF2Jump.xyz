import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq-routing.module';
import { AccordionModule } from 'primeng/accordion';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        FaqRoutingModule,
        AccordionModule,
        RippleModule
    ],
    declarations: [FaqComponent]
})
export class FaqModule { }
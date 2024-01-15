import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewProductRoutingModule } from './newproduct-routing.module';
import { NewProductComponent } from './newproduct.component';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';

@NgModule({
	imports: [
		CommonModule,
		NewProductRoutingModule,
		InputTextModule,
		ChipModule,
		DropdownModule,
		FormsModule,
		FileUploadModule,
		ButtonModule,
		RippleModule,
		InputSwitchModule,
		EditorModule
	],
	declarations: [NewProductComponent],
})
export class NewProductModule { }

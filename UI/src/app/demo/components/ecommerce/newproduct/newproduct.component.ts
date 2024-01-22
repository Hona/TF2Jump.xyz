import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';

interface Product {
    name: string;
    price: string;
    code: string;
    sku: string;
    status: string;
    tags: string[];
    category: string;
    colors: string[];
    stock: string;
    inStock: boolean;
    description: string;
    images: Image[];
}

interface Image {
    name: string;
    objectURL: string;
}

@Component({
    templateUrl: './newproduct.component.html',
    styleUrls: ['./newproduct.component.scss']
})
export class NewProductComponent {

    @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

    text: string = '';

    categoryOptions = ['Sneakers', 'Apparel', 'Socks'];

    colorOptions: any[] = [
        { name: 'Black', background: "bg-gray-900" },
        { name: 'Orange', background: "bg-orange-500" },
        { name: 'Navy', background: "bg-blue-500" }
    ];

    product: Product = {
        name: '',
        price: '',
        code: '',
        sku: '',
        status: 'Draft',
        tags: ['Nike', 'Sneaker'],
        category: 'Sneakers',
        colors: ['Blue'],
        stock: 'Sneakers',
        inStock: true,
        description: '',
        images: []
    };

    uploadedFiles: any[] = [];

    showRemove: boolean = false;

    onChipRemove(item: string) {
        this.product.tags = this.product.tags.filter(i => i !== item);
    }

    onColorSelect(color: string) {
        this.product.colors.indexOf(color) == -1 ? this.product.colors.push(color) : this.product.colors.splice(this.product.colors.indexOf(color), 1);
    }

    onUpload(event: any) {
        for (let file of event.files) {
            this.product.images.push(file);
        }
    }

    onImageMouseOver(file: Image) {
        this.buttonEl.toArray().forEach(el => {
            el.nativeElement.id === file.name ? el.nativeElement.style.display = 'flex' : null;
        })
    }

    onImageMouseLeave(file: Image) {
        this.buttonEl.toArray().forEach(el => {
            el.nativeElement.id === file.name ? el.nativeElement.style.display = 'none' : null;
        })
    }

    removeImage(file: Image) {
        this.product.images = this.product.images.filter(i => i !== file);
    }

}

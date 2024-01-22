import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {

    items: any[] = [];

    activeIndex: number = 0;

    constructor() { }

    ngOnInit(): void {
        this.items = [{ 
                label: 'General', icon: 'pi pi-fw pi-info-circle', questions: [
                    'Is there a trial period?', 'Do I need to sign up with credit card?', 'Is the subscription monthly or annual?', 'How many tiers are there?'
                ] 
            },
            { 
                label: 'Mailing', icon: 'pi pi-fw pi-envelope', questions: [
                    'How do I setup my account?', 'Is there a limit on mails to send?', 'What is my inbox size?', 'How can I add attachements?'
                ] 
            },
            { 
                label: 'Support', icon: 'pi pi-fw pi-question-circle', questions: [
                    'How can I get support?', 'What is the response time?', 'Is there a community forum?', 'Is live chat available?'
                ] 
            },
            { 
                label: 'Billing', icon: 'pi pi-fw pi-credit-card', questions: [
                    'Will I receive an invoice?', 'How to provide my billing information?', 'Is VAT included?', 'Can I receive PDF invoices?'
                ] 
            }
        ];
    };

    changeItem(i: number) {
        this.activeIndex = i;
    }
}

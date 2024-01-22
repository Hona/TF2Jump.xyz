import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Mail } from 'src/app/demo/api/mail';
import { MailService } from '../service/mail.service';

@Component({
    templateUrl: './mail-compose.component.html'
})
export class MailComposeComponent {

    newMail: Mail = {
        id: '',
        to: '',
        email: '',
        image: '',
        title: '',
        message: '',
        date: '',
        important: false,
        starred: false,
        trash: false,
        spam: false,
        archived: false,
        sent: true
    };

    constructor(private messageService: MessageService, private location: Location, private router: Router, private mailService: MailService) { }

    sendMail() {
        if (this.newMail.message) {
            this.newMail.id = Math.floor(Math.random() * 1000);
            this.mailService.onSend(this.newMail);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Mail sent' });
            this.router.navigate(['apps/mail/inbox']);
        }
    }

    goBack() {
        this.location.back();
    }
    
}

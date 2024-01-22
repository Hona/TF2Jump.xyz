import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Mail } from 'src/app/demo/api/mail';
import { MailService } from '../service/mail.service';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './mail-detail.component.html'
})
export class MailDetailComponent implements OnDestroy {

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

    subscription: Subscription;

    mail: Mail = {};

    id: any;

    constructor(private route: ActivatedRoute, private mailService: MailService, private location: Location, private router: Router, private messageService: MessageService) {
        this.subscription = this.route.params.pipe(
            switchMap(params => {
                this.id = params['id'];
                return this.mailService.mails$
            })
        ).subscribe(data => {
            this.mail = data.filter(d => d.id == this.id)[0];

        });
    }

    goBack() {
        this.location.back();
    }

    sendMail() {
        if (this.newMail.message) {
            this.newMail.to = this.mail.from ? this.mail.from : this.mail.to;
            this.newMail.image = this.mail.image;
            
            this.mailService.onSend(this.newMail);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Mail sent' });
            this.router.navigate(['apps/mail/inbox']);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

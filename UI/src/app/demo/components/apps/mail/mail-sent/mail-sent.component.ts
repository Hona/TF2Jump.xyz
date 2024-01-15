import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mail } from 'src/app/demo/api/mail';
import { MailService } from 'src/app/demo/components/apps/mail/service/mail.service';

@Component({
    templateUrl: './mail-sent.component.html'
})
export class MailSentComponent {

    sentMails: Mail[] = [];

    subscription: Subscription;

    constructor(private mailService: MailService) {
        this.subscription = this.mailService.mails$.subscribe(data => {
            this.sentMails = data.filter(d => d.sent && !d.trash && !d.archived);
        });
    }

}

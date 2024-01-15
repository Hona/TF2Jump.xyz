import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mail } from 'src/app/demo/api/mail';
import { MailService } from 'src/app/demo/components/apps/mail/service/mail.service';

@Component({
    selector: 'app-mail-important',
    templateUrl: './mail-important.component.html',
})
export class MailImportantComponent implements OnDestroy {
    importantMails: Mail[] = [];

    subscription: Subscription;

    constructor(private mailService: MailService) {
        this.subscription = this.mailService.mails$.subscribe((data) => {
            this.importantMails = data.filter(
                (d) => d.important && !d.spam && !d.trash && !d.archived
            );
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

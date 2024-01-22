import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MailAppComponent } from './mail.app.component';
import { MailInboxComponent } from './mail-inbox/mail-inbox.component';
import { MailComposeComponent } from './mail-compose/mail-compose.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';
import { MailArchiveComponent } from './mail-archive/mail-archive.component';
import { MailImportantComponent } from './mail-important/mail-important.component';
import { MailSentComponent } from './mail-sent/mail-sent.component';
import { MailSpamComponent } from './mail-spam/mail-spam.component';
import { MailStarredComponent } from './mail-starred/mail-starred.component';
import { MailTrashComponent } from './mail-trash/mail-trash.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: MailAppComponent, children: [
                { path: '', redirectTo: 'inbox', pathMatch: 'full' },
                { path: 'inbox', data: { breadcrumb: 'Inbox' }, component: MailInboxComponent },
                { path: 'detail/:id', data: { breadcrumb: 'Detail' }, component: MailDetailComponent },
                { path: 'compose', data: { breadcrumb: 'Compose' }, component: MailComposeComponent },
                { path: 'archived', data: { breadcrumb: 'Archived' }, component: MailArchiveComponent },
                { path: 'important', data: { breadcrumb: 'Important' }, component: MailImportantComponent },
                { path: 'sent', data: { breadcrumb: 'Sent' }, component: MailSentComponent },
                { path: 'spam', data: { breadcrumb: 'Spam' }, component: MailSpamComponent },
                { path: 'starred', data: { breadcrumb: 'Starred' }, component: MailStarredComponent },
                { path: 'trash', data: { breadcrumb: 'Trash' }, component: MailTrashComponent }
            ]
        }
    ])],
    exports: [RouterModule]
})
export class MailAppRoutingModule { }

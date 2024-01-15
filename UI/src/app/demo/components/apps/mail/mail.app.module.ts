import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MailAppRoutingModule } from './mail.app-routing.module';
import { MailAppComponent } from './mail.app.component';
import { MailInboxComponent } from './mail-inbox/mail-inbox.component';
import { MailComposeComponent } from './mail-compose/mail-compose.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';
import { MailReplyComponent } from './mail-reply/mail-reply.component';
import { MailSidebarComponent } from './mail-sidebar/mail-sidebar.component';
import { MailTableComponent } from './mail-table/mail-table.component';
import { MailArchiveComponent } from './mail-archive/mail-archive.component';
import { MailImportantComponent } from './mail-important/mail-important.component';
import { MailSentComponent } from './mail-sent/mail-sent.component';
import { MailSpamComponent } from './mail-spam/mail-spam.component';
import { MailStarredComponent } from './mail-starred/mail-starred.component';
import { MailTrashComponent } from './mail-trash/mail-trash.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button'
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { AvatarModule } from 'primeng/avatar';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { MailService } from './service/mail.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MailAppRoutingModule,
        MenuModule,
        ButtonModule,
        RippleModule,
        TableModule,
        InputTextModule,
        CheckboxModule,
        AvatarModule,
        EditorModule,
        ToastModule,
        FileUploadModule,
        DialogModule
    ],
    declarations: [
        MailAppComponent,
        MailInboxComponent,
        MailComposeComponent,
        MailDetailComponent,
        MailSidebarComponent,
        MailReplyComponent,
        MailTableComponent,
        MailArchiveComponent,
        MailImportantComponent,
        MailSentComponent,
        MailSpamComponent,
        MailStarredComponent,
        MailTrashComponent
    ],
    providers: [MessageService, MailService]
})
export class MailAppModule { }

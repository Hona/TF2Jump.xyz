import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Mail } from 'src/app/demo/api/mail';
import { MailService } from 'src/app/demo/components/apps/mail/service/mail.service';

@Component({
    selector: 'app-mail-table',
    templateUrl: './mail-table.component.html'
})
export class MailTableComponent implements OnInit {

    @Input() mails!: Mail[];

    menuItems: MenuItem[] = [];

    selectedMails: Mail[] = [];

    mail: Mail = {};

    dialogVisible: boolean = false;

    constructor(private router: Router, private mailService: MailService, private messageService: MessageService) { }

    ngOnInit(): void {

        this.menuItems = [
            { label: 'Archive', icon: 'pi pi-fw pi-file', command: () => this.onArchiveMultiple() },
            { label: 'Spam', icon: 'pi pi-fw pi-ban', command: () => this.onSpamMultiple() },
            { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => this.onDeleteMultiple() },
        ];
    }

    toggleOptions(event: Event, opt: HTMLElement, date: HTMLElement) {
        if (event.type === 'mouseenter') {
            opt.style.display = 'flex';
            date.style.display = 'none';
        } else {
            opt.style.display = 'none';
            date.style.display = 'flex';
        }
    }

    onRowSelect(id: number) {
        this.router.navigate(['/apps/mail/detail/', id]);
    }

    onStar(event: Event, id: number) {
        event.stopPropagation();
        this.mailService.onStar(id);
    }

    onArchive(event: Event, id: number) {
        event.stopPropagation();
        this.mailService.onArchive(id);
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Mail archived', life: 3000 });
    }

    onBookmark(event: Event, id: number) {
        event.stopPropagation();
        this.mailService.onBookmark(id);
    }

    onDelete(id: number) {
        this.mailService.onDelete(id);
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Mail deleted', life: 3000 });
    }

    onDeleteMultiple() {
        if (this.selectedMails && this.selectedMails.length > 0) {
            this.mailService.onDeleteMultiple(this.selectedMails);
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Mails deleted', life: 3000 });
        }
    }

    onSpamMultiple() {
        if (this.selectedMails && this.selectedMails.length > 0) {
            this.mailService.onSpamMultiple(this.selectedMails);
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Moved to spam', life: 3000 });
        }
    }

    onArchiveMultiple() {
        if (this.selectedMails && this.selectedMails.length > 0) {
            this.mailService.onArchiveMultiple(this.selectedMails);
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Moved to archive', life: 3000 });
        }
    }

    onTrash(event: Event, mail: Mail) {
        event.stopPropagation();
        if (mail.trash) {
            this.onDelete(mail.id)
        }
        this.mailService.onTrash(mail.id);
    }

    onReply(event: Event, mail: Mail) {
        event.stopPropagation();
        this.mail = mail;
        this.dialogVisible = true;
    }
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}

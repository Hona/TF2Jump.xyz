import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from 'src/app/demo/api/mail';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MailService {

    private _mails: Mail[] = [];

    private mails = new BehaviorSubject<Mail[]>(this._mails);

    mails$ = this.mails.asObservable();

    constructor(private http: HttpClient) {
        this.http.get<any>('assets/demo/data/mail.json')
            .toPromise()
            .then(res => res.data as Mail[])
            .then(data => {
                this.updateMails(data);
            });
    }

    updateMails(data: Mail[]) {
        this._mails = data;
        this.mails.next(data);
    }

    onStar(id: number) {
        this._mails = this._mails.map(m => m.id === id ? ({ ...m, starred: !m.starred }) : m);
        this.mails.next(this._mails);
    }

    onArchive(id: number) {
        this._mails = this._mails.map(m => m.id === id ? ({ ...m, archived: !m.archived }) : m);
        this.mails.next(this._mails);
    }

    onBookmark(id: number) {
        this._mails = this._mails.map(m => m.id === id ? ({ ...m, important: !m.important }) : m);
        this.mails.next(this._mails);
    }

    onDelete(id: number) {
        this._mails = this._mails.filter(m => m.id !== id);
        this.mails.next(this._mails);
    }

    onDeleteMultiple(mails: Mail[]) {
        let idArray = mails.map(m => Number(m.id));
        this._mails = this._mails.filter(m => idArray.indexOf(m.id) == -1);
        this.mails.next(this._mails);
    }

    onArchiveMultiple(mails: Mail[]) {
        let idArray = mails.map(m => m.id);

        for (let i = 0; i < this._mails.length; i++) {
            let mail = this._mails[i];

            if (idArray.indexOf(mail.id) !== -1) {
                mail.archived = true;
                this._mails[i] = mail;
            }
        }

        this.mails.next(this._mails);
    }

    onSpamMultiple(mails: Mail[]) {
        let idArray = mails.map(m => m.id);

        for (let i = 0; i < this._mails.length; i++) {
            let mail = this._mails[i];

            if (idArray.indexOf(mail.id) !== -1) {
                mail = { ...mail, spam: true, important: false, starred: false, archived: false };
                this._mails[i] = mail;
            }
        }

        this.mails.next(this._mails);
    }

    onTrash(id: number) {
        this._mails = this._mails.map(m => m.id === id ? ({ ...m, trash: true }) : m);
        this.mails.next(this._mails);
    }

    onSend(mail: Mail) {
        if (!mail.id) {
            mail.id = this.generateId();
        }
        if (!mail.title) {
            mail.title = 'Untitled';
        }

        mail.date = this.generateDate();
        this._mails.push(mail);
        this.mails.next(this._mails);
    }


    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    generateDate() {
        return new Date().toDateString().split(' ').slice(1, 4).join(' ');
    }
}

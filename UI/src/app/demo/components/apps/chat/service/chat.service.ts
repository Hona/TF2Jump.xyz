import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from 'src/app/demo/api/message';
import { User } from 'src/app/demo/api/user';

@Injectable()
export class ChatService {

    _activeUser: User = {
        "id": 1,
        "name": "Ioni Bowcher",
        "image": "ionibowcher.png",
        "status": "active",
        "messages": [
            {
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                "ownerId": 1,
                "createdAt": 1652646338240
            },
            {
                "text": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                "ownerId": 1,
                "createdAt": 1652646368718
            },
            {
                "text": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                "ownerId": 123,
                "createdAt": 1652646368718
            },
        ],
        "lastSeen": "2d"
    }

    private activeUser = new BehaviorSubject<User>(this._activeUser);

    activeUser$ = this.activeUser.asObservable();

    constructor(private http: HttpClient) { }

    getChatData() {
        return this.http.get<any>('assets/demo/data/chat.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }

    changeActiveChat(user: User) {
        this._activeUser = user;
        this.activeUser.next(user);
    }

    sendMessage(message: Message) {
        this._activeUser.messages.push(message);
        this.activeUser.next(this._activeUser);
    }
}

import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/demo/service/event.service';
// @fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
    templateUrl: './calendar.app.component.html',
    styleUrls: ['./calendar.app.component.scss']
})
export class CalendarAppComponent implements OnInit {

    events: any[] = [];

    today: string = '';

    calendarOptions: any = {
        initialView: 'dayGridMonth'
    };

    showDialog: boolean = false;

    clickedEvent: any = null;

    dateClicked: boolean = false;

    edit: boolean = false;

    tags: any[] = [];

    view: string = '';

    changedEvent: any;

    constructor(private eventService: EventService) { }

    ngOnInit(): void {
        this.today = '2022-05-11';

        this.eventService.getEvents().then(events => {
            this.events = events;
            this.calendarOptions = { ...this.calendarOptions, ...{ events: events } };
            this.tags = this.events.map(item => item.tag);
        });

        this.calendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            height: 720,
            initialDate: this.today,
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            eventClick: (e: MouseEvent) => this.onEventClick(e),
            select: (e: MouseEvent) => this.onDateSelect(e)
        };
    }

    onEventClick(e: any) {
        this.clickedEvent = e.event;
        let plainEvent = e.event.toPlainObject({ collapseExtendedProps: true, collapseColor: true });
        this.view = 'display';
        this.showDialog = true;

        this.changedEvent = { ...plainEvent, ...this.clickedEvent };
        this.changedEvent.start = this.clickedEvent.start;
        this.changedEvent.end = this.clickedEvent.end ? this.clickedEvent.end : this.clickedEvent.start;
    }

    onDateSelect(e: any) {
        this.view = 'new'
        this.showDialog = true;
        this.changedEvent = { ...e, title: null, description: null, location: null, backgroundColor: null, borderColor: null, textColor: null, tag: { color: null, name: null } };
    }

    handleSave() {
        if (!this.validate()) {
            return;
        }
        else {
            this.showDialog = false;
            this.clickedEvent = { ...this.changedEvent, backgroundColor: this.changedEvent.tag.color, borderColor: this.changedEvent.tag.color, textColor: '#212121' };

            if (this.clickedEvent.hasOwnProperty('id')) {
                this.events = this.events.map(i => i.id.toString() === this.clickedEvent.id.toString() ? i = this.clickedEvent : i);
            } else {
                this.events = [...this.events, { ...this.clickedEvent, id: Math.floor(Math.random() * 10000) }];
            }
            this.calendarOptions = { ...this.calendarOptions, ...{ events: this.events } };
            this.clickedEvent = null;
        }

    }

    onEditClick() {
        this.view = 'edit';
    }

    delete() {
        this.events = this.events.filter(i => i.id.toString() !== this.clickedEvent.id.toString());
        this.calendarOptions = { ...this.calendarOptions, ...{ events: this.events } };
        this.showDialog = false;
    }

    validate() {
        let { start, end } = this.changedEvent;
        return start && end;
    }

}

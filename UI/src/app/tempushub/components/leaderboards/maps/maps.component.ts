import { Component } from '@angular/core';
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {TableModule} from "primeng/table";
import {ProgressBarModule} from "primeng/progressbar";
import {DropdownModule} from "primeng/dropdown";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-maps',
  standalone: true,
    imports: [
        MenuModule,
        TableModule,
        ProgressBarModule,
        DropdownModule,
        AvatarModule,
        ButtonModule,
        RippleModule,
        CardModule,
        ChartModule
    ],
  templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.scss']
})
export class MapsComponent {
    protected zones: MenuItem[] = [
        {
            label: "Map",
            items: [
                {
                    label: "Map",
                    badge: "Tier 6",
                    badgeStyleClass: "ml-auto p-badge p-badge-danger  flex-shrink-0",
                }
            ]
        },
        {
            label: "Courses",
            items: [
                {
                    label: "Course 1",
                    badge: "Tier 1",
                    badgeStyleClass: "ml-auto p-badge p-badge-success flex-shrink-0 text-black",
                },
                {
                    label: "Course 2",
                    badge: "Tier 2",
                    badgeStyleClass: "ml-auto p-badge p-badge-success text-black flex-shrink-0",
                }
            ]
        },
        {
            label: "Bonuses",
            items: [
                {
                    label: "Bonus 1",
                    badge: "Tier 5",
                    badgeStyleClass: "ml-auto p-badge p-badge-warning flex-shrink-0",
                },
                {
                    label: "Bonus 2",
                    badge: "Tier 3",
                    badgeStyleClass: "ml-auto p-badge p-badge-success  text-black flex-shrink-0",
                }
            ]
        },
        {
            label: "Tricks",
            items: [
                {
                    label: "Spooky jump",
                    badge: "Tier 4",
                    badgeStyleClass: "ml-auto p-badge p-badge-info flex-shrink-0",
                },
                {
                    label: "sync powerbounce 4 rockets",
                    badge: "Tier 0",
                    badgeStyleClass: "ml-auto p-badge p-badge-secondary  text-black flex-shrink-0",
                }
            ]
        }
    ];

    protected soldierRuns: any[] = [
        {
            placing: 1,
            player: "Riot",
            duration: "00:52:42.624",
            date: "5 years ago"
        },
        {
            placing: 2,
            player: "Soup",
            duration: "00:58:21.152",
            date: "1 year ago"
        },
        {
            placing: 3,
            player: "Newjuls",
            duration: "01:01:23.123",
            date: "2 years ago"
        },
        {
            placing: 4,
            player: "Hona",
            duration: "01:02:42.624",
            date: "3 years ago"
        },
        {
            placing: 5,
            player: "Boshy",
            duration: "01:03:42.624",
            date: "4 years ago"
        },
        {
            placing: 6,
            player: "bunny.",
            duration: "01:04:42.624",
            date: "5 years ago"
        },
        {
            placing: 7,
            player: "Your mum",
            duration: "01:05:01.999",
            date: "2 months ago"
        },
        {
            placing: 8,
            player: "Your dad",
            duration: "01:05:02.000",
            date: "2 hours ago"
        },
        {
            placing: 9,
            player: "Your sister",
            duration: "01:05:02.001",
            date: "2 minutes ago"
        },
        {
            placing: 10,
            player: "Your brother",
            duration: "01:05:02.002",
            date: "2 seconds ago"
        },
        {
            placing: 11,
            player: "A random guy",
            duration: "02:25:35.524",
            date: "8 months ago"
        },
        {
            placing: 12,
            player: "huh",
            duration: "05:26:15.524",
            date: "8 months ago"
        },
        {
            placing: 13,
            player: "A random gal",
            duration: "05:29:55.574",
            date: "8 months ago"
        }
    ];

    protected parseTime = (timeStr: string) => {
        const parts = timeStr.split(':');
        const secondsParts = parts[2].split('.');

        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        const seconds = parseInt(secondsParts[0], 10);
        const milliseconds = parseFloat('0.' + secondsParts[1]) * 1000;

        return (hours * 60 * 60 + minutes * 60 + seconds) * 1000 + milliseconds;
    };

    protected calculatePercentage = (worldRecordStr: string, targetStr: string) => {
        const worldRecord = this.parseTime(worldRecordStr);
        const target = this.parseTime(targetStr);
        // Inverting the calculation
        return (worldRecord / target) * 100;
    };

    ngOnInit(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.lineData = {
            datasets: [{
/*
                data: [{x: '2016-12-25', y: ''}, {x: '2016-12-26', y: 10}]
*/
                data: this.soldierRuns.map((run) => {
                    return {x: run.date, y: this.getMilliseconds(run.duration)};
                }).reverse(),
                borderColor: "#bae755",
                borderDash: [5, 5],
                backgroundColor: "#e755ba",
                pointBackgroundColor: "#55bae7",
                pointBorderColor: "#55bae7",
                pointHoverBackgroundColor: "#55bae7",
                pointHoverBorderColor: "#55bae7",
            }]
        };

        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    },
/*
                    type: 'time'
*/
                },
            },
            responsive: true,
            maintainAspectRatio: false,

        };

    }

    protected lineData: any;

    protected lineOptions: any;

    protected getMilliseconds = (timeString :string) => {
        // Split the time string by colon and period
        let parts = timeString.split(':');
        let secondsParts = parts[2].split('.');

        // Extract hours, minutes, seconds, and milliseconds
        let hours = parseInt(parts[0], 10);
        let minutes = parseInt(parts[1], 10);
        let seconds = parseInt(secondsParts[0], 10);
        let milliseconds = parseInt(secondsParts[1], 10);

        // Convert everything to milliseconds
        return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;
    }
}

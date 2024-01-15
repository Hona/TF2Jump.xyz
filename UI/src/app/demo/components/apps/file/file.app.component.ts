import { Component, OnInit } from '@angular/core';
import { Folder } from 'src/app/demo/api/folder';
import { File } from 'src/app/demo/api/file';
import { Metric } from 'src/app/demo/api/metric';
import { FileAppService } from './service/file.app.service';
import { MenuItem } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Subscription, debounceTime } from 'rxjs';

@Component({
    templateUrl: './file.app.component.html',
    styleUrls: ['./file.app.component.scss']
})
export class FileAppComponent implements OnInit {

    fileChart: any;

    fileChartOptions: any;

    chartPlugins: any;

    files: File[] = [];

    metrics: Metric[] = [];

    folders: Folder[] = [];

    menuitems: MenuItem[] = [];

    subscription: Subscription;

    constructor(private fileService: FileAppService, private layoutService: LayoutService) { 
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.fileService.getFiles().then(data => this.files = data);
        this.fileService.getMetrics().then(data => this.metrics = data);
        this.fileService.getFoldersLarge().then(data => this.folders = data);

        this.initChart();

        this.menuitems = [
            {label: 'View', icon: 'pi pi-search'},
            {label: 'Refresh', icon: 'pi pi-refresh'}
        ]
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.chartPlugins = [{
            beforeDraw: function (chart: any) {
                let ctx = chart.ctx;
                let width = chart.width;
                let height = chart.height;
                let fontSize = 1.50;
                let oldFill = ctx.fillStyle;

                ctx.restore();
                ctx.font = fontSize + "rem sans-serif";
                ctx.textBaseline = "middle";

                let text = "Free Space";
                let text2 = 50 + "GB / " + 80 + "GB";
                let textX = Math.round((width - ctx.measureText(text).width) / 2);
                let textY = (height + chart.chartArea.top) / 2.25;

                let text2X = Math.round((width - ctx.measureText(text).width) / 2.10);
                let text2Y = (height + chart.chartArea.top) / 1.75;

                ctx.fillStyle = chart.config.data.datasets[0].backgroundColor[0];
                ctx.fillText(text, textX, textY);
                ctx.fillText(text2, text2X, text2Y);
                ctx.fillStyle = oldFill;
                ctx.save();
            }
        }]

        this.fileChart = {
            datasets: [
                {
                    data: [300, 100],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--primary-600'),
                        documentStyle.getPropertyValue('--primary-100'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--primary-700'),
                        documentStyle.getPropertyValue('--primary-200'),
                    ],
                    borderColor: 'transparent',
                    fill: true
                }
            ]
        };

        this.fileChartOptions = {
            animation: {
                duration: 0
            },
            cutout: '90%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
    }
}

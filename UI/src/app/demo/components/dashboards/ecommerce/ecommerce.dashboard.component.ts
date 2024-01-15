import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import {
    LayoutService,
} from 'src/app/layout/service/app.layout.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { Customer } from 'src/app/demo/api/customer';
import { PrimeIcons } from 'primeng/api';
import { CustomerService } from 'src/app/demo/service/customer.service';

@Component({
    templateUrl: './ecommerce.dashboard.component.html',
})
export class EcommerceDashboardComponent implements OnInit, OnDestroy {
    visitorChart: any;

    visitorChartOptions: any;

    timelineEvents: any[] = [];

    countryChart: any;

    countryChartOptions: any;

    revenueChart: any;

    revenueChartOptions: any;

    customersTable: Customer[] = [];

    customersTable1: Customer[] = [];

    customersTable2: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    orderYear: any;

    selectedOrderYear: any;

    revenueMonth: any;

    selectedRevenueMonth: any;

    visitorYear: any;

    selectedVisitorYear: any;

    customerYear: any;

    selectedCustomerYear: any;

    growth: any;

    avgCustomer: any;

    customerChart: any;

    customerChartOptions: any;

    customerMax: any;

    customerMin: any;

    customerAvg: any;

    subscription: Subscription;

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3,
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    customerCarousel: any[] = [];

    constructor(
        private productService: ProductService,
        private layoutService: LayoutService,
        private customerService: CustomerService
    ) {
     this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initCharts();
            });
    }

    ngOnInit(): void {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customersTable = customers;
            this.customersTable.forEach(
                // @ts-ignore
                (customer) => (customer.date = new Date(customer.date))
            );
        });
        this.customerService.getCustomersLarge().then((customers) => {
            this.customersTable1 = customers;
            this.customersTable1.forEach(
                // @ts-ignore
                (customer) => (customer.date = new Date(customer.date))
            );
        });
        this.customerService.getCustomersMedium().then((customers) => {
            this.customersTable2 = customers;
            this.customersTable2.forEach(
                // @ts-ignore
                (customer) => (customer.date = new Date(customer.date))
            );
        });

        this.initCharts();

        this.timelineEvents = [
            {
                transaction: 'Payment from #28492',
                amount: '+$250.00',
                date: 'June 13, 2020 11:09 AM',
                icon: PrimeIcons.CHECK,
                iconColor: '#0F8BFD',
                amountColor: '#00D0DE',
            },
            {
                transaction: 'Process refund to #94830',
                amount: '-$570.00',
                date: 'June 13, 2020 08:22 AM',
                icon: PrimeIcons.REFRESH,
                iconColor: '#FC6161',
                amountColor: '#FC6161',
            },
            {
                transaction: 'New 8 user to #5849',
                amount: '+$50.00',
                date: 'June 12, 2020 02:56 PM',
                icon: PrimeIcons.PLUS,
                iconColor: '#0BD18A',
                amountColor: '#0BD18A',
            },
            {
                transaction: 'Payment from #3382',
                amount: '+$3830.00',
                date: 'June 11, 2020 06:11 AM',
                icon: PrimeIcons.CHECK,
                iconColor: '#0F8BFD',
                amountColor: '#00D0DE',
            },
            {
                transaction: 'Payment from #4738',
                amount: '+$845.00',
                date: 'June 11, 2020 03:50 AM',
                icon: PrimeIcons.CHECK,
                iconColor: '#0F8BFD',
                amountColor: '#00D0DE',
            },
            {
                transaction: 'Payment failed form #60958',
                amount: '$1450.00',
                date: 'June 10, 2020 07:54 PM',
                icon: PrimeIcons.EXCLAMATION_TRIANGLE,
                iconColor: '#EC4DBC',
                amountColor: '#EC4DBC',
            },
            {
                transaction: 'Payment from #5748',
                amount: '+$50.00',
                date: 'June 09, 2020 11:37 PM',
                icon: PrimeIcons.CHECK,
                iconColor: '#0F8BFD',
                amountColor: '#00D0DE',
            },
            {
                transaction: 'Removed 32 users from #5849',
                amount: '-$240.00',
                date: 'June 09, 2020 08:40 PM',
                icon: PrimeIcons.MINUS,
                iconColor: '#FC6161',
                amountColor: '#FC6161',
            },
        ];

        this.customerMax = '1232';

        this.customerMin = '284';

        this.customerAvg = '875';

        this.customerCarousel = [
            { user: '9,673 Users', value: '$8,362,478', image: 'nasa' },
            { user: '9,395 Users', value: '$7,927,105', image: 'beats' },
            { user: '7,813 Users', value: '$6,471,594', image: 'gopro' },
            { user: '7,613 Users', value: '$5,697,883', image: 'north' },
            { user: '98,673 Users', value: '$7,653,311', image: 'mc' },
            { user: '5,645 Users', value: '$4,567,823', image: 'dell' },
            { user: '5,153 Users', value: '$5,342,678', image: 'wwf' },
            { user: '4,338 Users', value: '$5,867,391', image: 'bmw' },
            { user: '4,170 Users', value: '$4,647,233', image: 'pepsi' },
            { user: '3,765 Users', value: '$4,123,876', image: 'netflix' },
            { user: '3,490 Users', value: '$3,688,362', image: 'deloitte' },
            { user: '2,976 Users', value: '$3,978,478', image: 'pg' },
        ];

        this.orderYear = [
            { name: '2021', code: '0' },
            { name: '2020', code: '1' },
        ];

        this.visitorYear = [
            { name: '2020', code: '0' },
            { name: '2019', code: '1' },
        ];

        this.customerYear = [
            { name: '2020', code: '0' },
            { name: '2019', code: '1' },
        ];

        this.revenueMonth = [
            { name: 'January - July 2021', code: '0' },
            { name: 'August - December 2020', code: '1' },
        ];

        this.selectedVisitorYear = this.visitorYear[0];
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.growth = '$620,076';
        this.avgCustomer = '$1,120';
        this.visitorChart = {
            labels: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'July',
                'Aug',
                'Sept',
                'Oct',
                'Nov',
                'Dec',
            ],
            datasets: [
                {
                    label: 'Plan',
                    data: [
                        630, 630, 695, 695, 695, 760, 760, 760, 840, 840, 840,
                        840,
                    ],
                    borderColor: ['#FC6161'],
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    type: 'line',
                    fill: false,
                    barPercentage: 0.5,
                    stepped: true,
                },
                {
                    label: 'Groth actual',
                    data: [
                        600, 671, 660, 665, 700, 610, 810, 790, 710, 860, 810,
                        780,
                    ],
                    backgroundColor: getComputedStyle(
                        document.body
                    ).getPropertyValue('--primary-color'),
                    fill: true,
                    barPercentage: 0.5,
                    stepped: true,
                },
            ],
        };
        this.visitorChartOptions = {
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: textColor,
                    },
                },
            },
            responsive: true,
            hover: {
                mode: 'index',
            },
            scales: {
                y: {
                    ticks: {
                        color: textColor,
                    },
                    min: 500,
                    max: 900,
                    grid: {
                        display: false,
                    },
                },
                x: {
                    ticks: {
                        color: textColor,
                    },
                    barPercentage: 0.5,
                    grid: {
                        display: false,
                    },
                },
            },
        };
        this.countryChart = {
            labels: ['USA', 'CHN', 'JPN', 'AUS', 'IND', 'RUS', 'Other'],
            datasets: [
                {
                    data: [30, 18, 36, 54, 61, 90, 72],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--cyan-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--red-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--pink-400'),
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--gray-400'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--cyan-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--pink-500'),
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--gray-500'),
                    ],
                    borderColor: 'transparent',
                    fill: true,
                },
            ],
        };

        this.countryChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
        };
        this.revenueChart = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    label: 'Sales',
                    data: [37, 34, 21, 27, 10, 18, 15],
                    borderColor: '#EEE500',
                    pointBackgroundColor: '#EEE500',
                    backgroundColor: 'rgba(238, 229, 0, 0.05)',
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'Revenue',
                    data: [31, 27, 30, 37, 23, 29, 20],
                    borderColor: '#00D0DE',
                    pointBackgroundColor: '#00D0DE',
                    backgroundColor: 'rgba(0, 208, 222, 0.05)',
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'Expenses',
                    data: [21, 7, 13, 3, 19, 11, 6],
                    borderColor: '#FC6161',
                    pointBackgroundColor: '#FC6161',
                    backgroundColor: 'rgba(253, 72, 74, 0.05)',
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'Customer',
                    data: [47, 31, 35, 20, 46, 39, 25],
                    borderColor: '#0F8BFD',
                    pointBackgroundColor: '#0F8BFD',
                    backgroundColor: 'rgba(15, 139, 253, 0.05)',
                    fill: true,
                    tension: 0.4,
                },
            ],
        };

        this.revenueChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            responsive: true,
            hover: {
                mode: 'index',
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor,
                    },
                },
                y: {
                    ticks: {
                        color: textColor,
                        min: 0,
                        max: 60,
                        stepSize: 5,
                    },
                },
            },
        };
        this.customerChart = {
            labels: ['January', 'March', 'May', 'Agust', 'October', 'December'],
            datasets: [
                {
                    data: [10, 25, 48, 35, 54, 70],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-300'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-400'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [18, 35, 23, 30, 59, 65],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-400'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [20, 47, 46, 46, 61, 70],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-400'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [17, 34, 18, 48, 67, 68],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-600'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [9, 37, 47, 50, 60, 62],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-300'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-400'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [8, 48, 40, 52, 72, 75],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-200'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-300'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [10, 18, 50, 47, 63, 80],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-200'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-300'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [20, 36, 39, 58, 59, 85],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-400'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [30, 45, 35, 50, 54, 81],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-300'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-400'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [28, 35, 52, 56, 60, 77],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-200'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-300'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [40, 40, 38, 45, 68, 86],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-600'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [50, 23, 27, 34, 65, 90],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-400'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [29, 27, 29, 42, 55, 84],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-300'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-400'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [10, 37, 47, 29, 59, 80],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-400'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [10, 54, 42, 38, 63, 83],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-200'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-300'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [25, 44, 50, 56, 65, 92],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-200'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-300'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [30, 43, 48, 45, 73, 78],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-300'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-400'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
                {
                    data: [29, 47, 54, 60, 77, 86],
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-400'),
                    hoverBackgroundColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    fill: true,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                },
            ],
        };

        this.customerChartOptions = {
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    ticks: {
                        color: textColor,
                    },
                    display: false,
                },
                x: {
                    ticks: {
                        color: textColor,
                    },
                    grid: {
                        display: false,
                    },
                },
            },
        };
    }

    changeRevenueChart(event: any) {
        const dataSet1 = [
            [37, 34, 21, 27, 10, 18, 15],
            [31, 27, 30, 37, 23, 29, 20],
            [21, 7, 13, 3, 19, 11, 6],
            [47, 31, 35, 20, 46, 39, 25],
        ];
        const dataSet2 = [
            [31, 27, 30, 37, 23, 29, 20],
            [47, 31, 35, 20, 46, 39, 25],
            [37, 34, 21, 27, 10, 18, 15],
            [21, 7, 13, 3, 19, 11, 6],
        ];

        if (event.value.code === '1') {
            this.revenueChart.datasets[0].data = dataSet2[parseInt('0')];
            this.revenueChart.datasets[1].data = dataSet2[parseInt('1')];
            this.revenueChart.datasets[2].data = dataSet2[parseInt('2')];
            this.revenueChart.datasets[3].data = dataSet2[parseInt('3')];
        } else {
            this.revenueChart.datasets[0].data = dataSet1[parseInt('0')];
            this.revenueChart.datasets[1].data = dataSet1[parseInt('1')];
            this.revenueChart.datasets[2].data = dataSet1[parseInt('2')];
            this.revenueChart.datasets[3].data = dataSet1[parseInt('3')];
        }
    }

    changeVisitorChart(event: any) {
        const dataSet1 = [
            [630, 630, 695, 695, 695, 760, 760, 760, 840, 840, 840, 840],
            [600, 671, 660, 665, 700, 610, 810, 790, 710, 860, 810, 780],
        ];
        const dataSet2 = [
            [580, 580, 620, 620, 620, 680, 680, 680, 730, 730, 730, 730],
            [550, 592, 600, 605, 630, 649, 660, 690, 710, 720, 730, 780],
        ];

        if (event.value.code === '1') {
            this.growth = '$581,259';
            this.avgCustomer = '$973';
            this.visitorChart.datasets[0].data = dataSet2[parseInt('0')];
            this.visitorChart.datasets[1].data = dataSet2[parseInt('1')];
        } else {
            this.growth = '$620,076';
            this.avgCustomer = '$1,120';
            this.visitorChart.datasets[0].data = dataSet1[parseInt('0')];
            this.visitorChart.datasets[1].data = dataSet1[parseInt('1')];
        }
    }

    changeCustomerChart(event: any) {
        const dataSet1 = [
            [10, 25, 48, 35, 54, 70],
            [18, 35, 23, 30, 59, 65],
            [20, 47, 46, 46, 61, 70],
            [17, 34, 18, 48, 67, 68],
            [9, 37, 47, 50, 60, 62],
            [8, 48, 40, 52, 72, 75],
            [10, 18, 50, 47, 63, 80],
            [20, 36, 39, 58, 59, 85],
            [30, 45, 35, 50, 54, 81],
            [28, 35, 52, 56, 60, 77],
            [40, 40, 38, 45, 68, 86],
            [50, 23, 27, 34, 65, 90],
            [29, 27, 29, 42, 55, 84],
            [10, 37, 47, 29, 59, 80],
            [10, 54, 42, 38, 63, 83],
            [25, 44, 50, 56, 65, 92],
            [30, 43, 48, 45, 73, 78],
            [29, 47, 54, 60, 77, 86],
        ];
        const dataSet2 = [
            [10, 25, 48, 35, 54, 70],
            [20, 47, 46, 46, 61, 70],
            [17, 34, 18, 48, 67, 68],
            [50, 23, 27, 34, 65, 90],
            [8, 48, 40, 52, 72, 75],
            [9, 37, 47, 50, 60, 62],
            [10, 18, 50, 47, 63, 80],
            [30, 45, 35, 50, 54, 81],
            [10, 37, 47, 29, 59, 80],
            [28, 35, 52, 56, 60, 77],
            [25, 44, 50, 56, 65, 92],
            [18, 35, 23, 30, 59, 65],
            [20, 36, 39, 58, 59, 85],
            [29, 27, 29, 42, 55, 84],
            [40, 40, 38, 45, 68, 86],
            [30, 43, 48, 45, 73, 78],
            [10, 54, 42, 38, 63, 83],
            [29, 47, 54, 60, 77, 86],
        ];

        if (event.value.code === '1') {
            this.customerAvg = '621';
            this.customerMin = '198';
            this.customerMax = '957';
            this.customerChart.datasets[0].data = dataSet2[parseInt('0')];
            this.customerChart.datasets[1].data = dataSet2[parseInt('1')];
            this.customerChart.datasets[2].data = dataSet2[parseInt('2')];
            this.customerChart.datasets[3].data = dataSet2[parseInt('3')];
            this.customerChart.datasets[4].data = dataSet2[parseInt('4')];
            this.customerChart.datasets[5].data = dataSet2[parseInt('5')];
            this.customerChart.datasets[6].data = dataSet2[parseInt('6')];
            this.customerChart.datasets[7].data = dataSet2[parseInt('7')];
            this.customerChart.datasets[8].data = dataSet2[parseInt('8')];
            this.customerChart.datasets[9].data = dataSet2[parseInt('9')];
            this.customerChart.datasets[10].data = dataSet2[parseInt('10')];
            this.customerChart.datasets[11].data = dataSet2[parseInt('11')];
            this.customerChart.datasets[12].data = dataSet2[parseInt('12')];
            this.customerChart.datasets[13].data = dataSet2[parseInt('13')];
            this.customerChart.datasets[14].data = dataSet2[parseInt('14')];
            this.customerChart.datasets[15].data = dataSet2[parseInt('15')];
            this.customerChart.datasets[16].data = dataSet2[parseInt('16')];
            this.customerChart.datasets[17].data = dataSet2[parseInt('17')];
        } else {
            this.customerAvg = '875';
            this.customerMin = '284';
            this.customerMax = '1232';
            this.customerChart.datasets[0].data = dataSet1[parseInt('0')];
            this.customerChart.datasets[1].data = dataSet1[parseInt('1')];
            this.customerChart.datasets[2].data = dataSet1[parseInt('2')];
            this.customerChart.datasets[3].data = dataSet1[parseInt('3')];
            this.customerChart.datasets[4].data = dataSet1[parseInt('4')];
            this.customerChart.datasets[5].data = dataSet1[parseInt('5')];
            this.customerChart.datasets[6].data = dataSet1[parseInt('6')];
            this.customerChart.datasets[7].data = dataSet1[parseInt('7')];
            this.customerChart.datasets[8].data = dataSet1[parseInt('8')];
            this.customerChart.datasets[9].data = dataSet1[parseInt('9')];
            this.customerChart.datasets[10].data = dataSet1[parseInt('10')];
            this.customerChart.datasets[11].data = dataSet1[parseInt('11')];
            this.customerChart.datasets[12].data = dataSet1[parseInt('12')];
            this.customerChart.datasets[13].data = dataSet1[parseInt('13')];
            this.customerChart.datasets[14].data = dataSet1[parseInt('14')];
            this.customerChart.datasets[15].data = dataSet1[parseInt('15')];
            this.customerChart.datasets[16].data = dataSet1[parseInt('16')];
            this.customerChart.datasets[17].data = dataSet1[parseInt('17')];
        }
    }

    recentSales(event: any) {
        if (event.value.code === '0') {
            this.customersTable = this.customersTable1;
        } else {
            this.customersTable = this.customersTable2;
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

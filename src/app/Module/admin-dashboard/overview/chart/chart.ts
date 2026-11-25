import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import type { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chart.html',
  styleUrl: './chart.scss',
})
export class Chart {
  // Bookings Line Chart
  bookingsData: ChartData<'line'> = {
    labels: ['أكتوبر', 'سبتمبر', 'أغسطس', 'يونيو', 'مايو'],
    datasets: [
      {
        label: 'الحجوزات',
        data: [550, 850, 1100, 1400, 1000],
        borderColor: '#05a9d1',
        backgroundColor: 'rgba(5, 169, 209, 0.15)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: '#05a9d1',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  bookingsOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: {
        top: 5,
        bottom: 5,
        left: 10,
        right: 10,
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        rtl: true,
      },
    },

    scales: {
      x: {
        display: true,
        position: 'bottom',

        grid: {
          display: false,
          drawTicks: true,
        },

        border: {
          display: true,
          color: '#315477',
          width: 2,
        },

        ticks: {
          display: true,
          color: '#315477',
          padding: 8,
          font: {
            family: 'Almarai',
            size: 11,
          },
        },
      },

      y: {
        display: true,
        position: 'right',

        beginAtZero: true,
        min: 0,
        max: 1500,

        grid: {
          display: true,
          color: '#eaf1f7',
          drawTicks: true,
        },

        border: {
          display: true,
          color: '#315477',
          width: 2,
        },

        ticks: {
          display: true,
          stepSize: 500,
          padding: 8,
          color: '#153d68',
          font: {
            family: 'Almarai',
            size: 12,
          },
        },
      },
    },
  };
  // Clinics Doughnut Chart
  clinicsData: ChartData<'doughnut'> = {
    labels: ['عيادة الباطنة', 'عيادة الأطفال', 'عيادة الأسنان'],

    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ['#1676c5', '#2bb9db', '#a1d6f4'],
        hoverBackgroundColor: ['#1166ac', '#1da5c5', '#83c5eb'],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  clinicsOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        rtl: true,
      },
    },
  };
}

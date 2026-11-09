import { Component } from '@angular/core';
import { Header } from './header/header';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  imports: [Header, AngularSvgIconModule],
  selector: 'app-landing-page',
  styleUrl: './landing-page.scss',
  templateUrl: './landing-page.html',
})
export class LandingPage {
  Service = [
    {
      Servicename: `التحاليل والفحوصات المخبرية`,
      img: '/icons/landing_icons/syringe.svg',
    },
    { Servicename: 'الأمراض الجلدية والتجميل', img: '/icons/landing_icons/hair.svg' },
    { Servicename: 'طب القلب والاوعية الدموية', img: `/icons/landing_icons/heartbeat.svg` },
    {
      Servicename: 'الطب الباطني والعام',
      img: '/icons/landing_icons/stethoscope.svg',
    },
    {
      Servicename: 'طب الأطفال',
      img: '/icons/landing_icons/baby.svg',
    },
    {
      Servicename: 'طب الاسنان والتجميل',
      img: '/icons/landing_icons/tooth.svg',
    },
  ];
  doctor = [
    {
      name: 'د. سارة محمد',
      patch: 'أخصائية الجلدية والتجميل',
      img: '/img/landing_page/doc.png',
    },
    {
      name: 'د. أحمد علي',
      patch: 'أخصائي طب القلب',
      img: '/img/landing_page/doc.png',
    },
    {
      name: 'د. منى خالد',
      patch: 'أخصائية طب الأطفال',
      img: '/img/landing_page/doc.png',
    },
    {
      name: 'د. كريم إبراهيم',
      patch: 'أخصائي الطب الرياضي',
      img: '/img/landing_page/doc.png',
    },
  ];
  reviews = [
    {
      name: 'محمد عبدالله',
      text: 'العيادة رائعة والتنظيم ممتاز جداً',
      stars: 2,
      img: '',
    },
    {
      name: 'سارة محمود',
      text: 'تجربة رائعة ورعاية متميزة. شكراً لكم.',
      stars: 2,
      img: '',
    },
    {
      name: 'أحمد خالد',
      text: 'خدمة ممتازة وفريق طبي رائع. أنصح بها بشدة',
      stars: 2,
      img: '',
    },
  ];
}

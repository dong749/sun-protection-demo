import access from "@/access";
import { Component } from 'react';

export default [
  {
    path: '/',
    name: 'Home',
    component: '@/pages/HomePage',
  },
  {
    path: '/products',
    name: 'Products',
    component: '@/pages/ProductPage',
  },
  {
    path: '/personalized-risk',
    name: 'Personalized Riks Information',
    component: '@/pages/PersonalizedRiskPage',
  },
  {
    path: '/danger',
    name: 'UV Danger Information',
    component: '@/pages/UVDangerInformationPage',
  }
];

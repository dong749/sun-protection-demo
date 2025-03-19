import access from "@/access";
import { Component } from 'react';

export default [
  {
    path: '/',
    name: 'Home Page',
    component: '../pages/HomePage',
  },
  {
    path: '/uv-index',
    name: 'UV Search',
    component: '../pages/UVSearchPage',
  },
  {
    path: '/products',
    name: 'Products',
    component: '../pages/ProductPage',
  },
  {
    path: '/personalized-risk',
    name: 'Personalized Riks Information',
    component: '../pages/PersonalizedRiskPage',
  },
  {
    path: '/danger',
    name: 'UV Danger Information',
    component: '../pages/UVDangerInformationPage',
  }
];

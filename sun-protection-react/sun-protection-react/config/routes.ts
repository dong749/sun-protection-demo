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
];

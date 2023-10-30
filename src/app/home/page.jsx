'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarComponent } from '@/component';
import React from 'react'
import Home from '@/page/Home';

export default function home() {
  return (
    <div>
      <NavbarComponent />
      <Home />
    </div>
  )
}

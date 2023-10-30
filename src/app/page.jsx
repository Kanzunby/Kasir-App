"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarComponent } from '@/component';
import React, { Component } from 'react'


export default class page extends Component {

  render() {
    return (
      <div>
        <NavbarComponent />
        <h1 className='text-center mt-10 text-dark-blue font-bold'>Selamat Datang di Kasir App</h1>

      </div>
    )
  }
}



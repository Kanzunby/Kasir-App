'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './button.module.css'
import { NavbarComponent } from '@/component'
import { Button, Image } from 'react-bootstrap';
import React, { Component } from 'react'
import axios from 'axios';
import { API_URL } from '@/utils/constant';

export default class Sukses extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((response) => {
        const keranjangs = response.data;
        keranjangs.map(function (item) {
          return axios
            .delete(API_URL+ "keranjangs/" + item.id)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <NavbarComponent />
        <div className='mt-4 text-center'>
          <Image
            src='assets/images/success.png'
            width='500'
            height='500'
            alt='Gambar'

            style={{
              margin: "auto"
            }}
          />
          <h2 className='font-bold text-dark-blue'>Sukses Memesan</h2>
          <p>Terimakasih Sudah Memesan</p>
          <Button variant='primary' href='/home' className={styles.btn}>Kembali</Button>
        </div>
      </div>
    )
  }
}



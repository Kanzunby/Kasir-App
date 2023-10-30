import { faShop, faShoppingBag, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import styles from '../page/button.module.css'
import numberFormat from '@/utils/numberFormat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '@/utils/constant'

export default class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar : totalBayar,
            menus : this.props.keranjangs
        }

        axios.post(API_URL+"pesanans", pesanan).then((res) => {
            this.props.history.push('/sukses')
        })
    };

    render() {
        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga
        }, 0)
        return (
            <>
            {/* Web display */}
            <div className='fixed-bottom d-none d-md-block'>
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className='px-4'>
                        <h4>Total Harga = {" "}
                            <strong className='float-right mr-2'>Rp. {numberFormat(totalBayar)}
                            </strong>
                        </h4>
                        <Button
                            variant='primary'
                            href='/sukses'
                            className={styles.btn1}
                            size='lg'
                            onClick={() => this.submitTotalBayar(totalBayar)}>
                            <FontAwesomeIcon icon={faShoppingBag} /> BAYAR
                        </Button>
                    </Col>
                </Row>
            </div>

            {/* Mobile display */}
            <div className='d-sm-block d-md-none'>
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className='px-4'>
                        <h4>Total Harga = {" "}
                            <strong className='float-right mr-2'>Rp. {numberFormat(totalBayar)}
                            </strong>
                        </h4>
                        <Button
                            variant='primary'
                            href='/sukses'
                            className={styles.btn1}
                            size='lg'
                            onClick={() => this.submitTotalBayar(totalBayar)}>
                            <FontAwesomeIcon icon={faShoppingBag} /> BAYAR
                        </Button>
                    </Col>
                </Row>
            </div>
            </>
        )
    }
}

import numberFormat from '@/utils/numberFormat'
import React, { Component } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import TotalBayar from './TotalBayar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalKeranjang from './ModalKeranjang';
import styles from './style.module.css'
import { API_URL } from '@/utils/constant';
import axios from 'axios';
import swal from 'sweetalert';

export default class Hasil extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: '',
      totalHarga: 0
    }
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga
    })
  }

  handleClose = () => [
    this.setState({
      showModal: false
    })
  ]

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
    })
  }

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
      })
    }
  }

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const keranjangUpdate = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan
    }
    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, keranjangUpdate)
      .then((response) => {
        this.props.getListKeranjang();
        swal({
          title: "Update Pesanan!",
          text: "Sukses Update Pesanan " + keranjangUpdate.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch(error => {
        console.log(error)
      })
  }

  deletePesanan = (id) => {
    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((response) => {
        this.props.getListKeranjang();
        swal({
          title: "Hapus Pesanan!",
          text: "Sukses Hapus Pesanan " + menuKeranjang.product.nama,
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className='mt-3'>
        <h4><FontAwesomeIcon icon={faShoppingCart} className='mr-3' /><strong>Karanjang</strong></h4>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className={styles.hasil}>
            <ListGroup variant="flush">
              {keranjangs.map((menuKeranjang) => (
                <ListGroup.Item key={menuKeranjang.id} >
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge variant="primary">
                          {menuKeranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{menuKeranjang.product.nama}</h5>
                      <p>Rp. {numberFormat(menuKeranjang.product.harga)}</p>
                    </Col>
                    <Col>
                      <strong className='float-right'>
                        Rp. {numberFormat(menuKeranjang.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button variant='primary' size='sm' className={styles.btn3} onClick={() => this.handleShow(menuKeranjang)}>
                        <FontAwesomeIcon icon={faPenToSquare} className='mr-2' /> Edit Pesanan
                      </Button>
                    </Col>
                    <Col>
                      <Button variant='danger' size='sm' className={styles.btn4} onClick={() => this.deletePesanan(menuKeranjang.id)}>
                        <FontAwesomeIcon icon={faTrash} className='mr-2' />
                        Hapus Pesanan</Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ModalKeranjang
                handleClose={this.handleClose}
                {...this.state}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
              />
            </ListGroup>
          </Card>
        )}

        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    )
  }
}




"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react'
import { Hasil, ListCategories, Menus} from '../component';
import { Col, Row, Container } from 'react-bootstrap';
import { API_URL } from '../utils/constant';
import axios from 'axios';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import styles from './button.module.css'

export default class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          menus: [],
          categoriYangDipilih: 'Makanan',
          keranjangs: []
        }
      }
    
      componentDidMount() {
        axios
          .get(API_URL + "products?category.nama=" + this.state.categoriYangDipilih)
          .then((response) => {
            const menus = response.data;
            this.setState({ menus })
          })
          .catch(error => {
            console.log(error)
          })
    
          this.getListKeranjang();
      }
    
      // componentDidUpdate(prevState) {
      //   if(this.state.keranjangs !== prevState.keranjangs) {
      //     axios
      //     .get(API_URL + "keranjangs")
      //     .then((response) => {
      //       const keranjangs = response.data;
      //       this.setState({ keranjangs })
      //     })
      //     .catch(error => {
      //       console.log(error)
      //     })
      //   }
      // }

      getListKeranjang = () => {
        axios
          .get(API_URL + "keranjangs")
          .then((response) => {
            const keranjangs = response.data;
            this.setState({ keranjangs })
          })
          .catch(error => {
            console.log(error)
          })
      }

    
      changeCategory = (value) => {
        this.setState({
          categoriYangDipilih: value,
          menus: []
        })
    
        axios
          .get(API_URL + "products?category.nama=" + value)
          .then((response) => {
            const menus = response.data;
            this.setState({ menus })
          })
          .catch(error => {
            console.log(error)
          })
      }
    
      masukKeranjang = (value) => {
        axios
          .get(API_URL + "keranjangs?product.id=" + value.id)
          .then((response) => {
            if (response.data.length === 0) {
              const keranjang = {
                jumlah: 1,
                total_harga: value.harga,
                product: value
              }
              axios
                .post(API_URL + "keranjangs", keranjang)
                .then((response) => {
                  this.getListKeranjang();
                  swal({
                    title: "Anda Memilih " + keranjang.product.nama,
                    text: keranjang.product.nama + " Sukses Masuk Keranjang",
                    icon: "success",
                    button: false,
                    timer: 1500,
                  });
                })
                .catch(error => {
                  console.log(error)
                })
            } else {
              const keranjang = {
                jumlah: response.data[0].jumlah + 1,
                total_harga: response.data[0].total_harga + value.harga,
                product: value
              }
              axios
                .put(API_URL + "keranjangs/" + response.data[0].id , keranjang)
                .then((response) => {
                  this.getListKeranjang();
                  swal({
                    title: "Anda Memilih " + keranjang.product.nama + " lagi",
                    text: keranjang.product.nama + " Sukses ditambah ke Keranjang",
                    icon: "success",
                    button: false,
                    timer: 1500,
                  });
                })
            }
          })
          .catch(error => {
            console.log(error)
          })  
      }

  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state
    return (
      <div>
        <div className='mt-4'>
          <Container fluid>
            <Row>
              <ListCategories changeCategory={this.changeCategory} categoriYangDipilih={categoriYangDipilih} />
              <Col>
                <h4><FontAwesomeIcon icon={faList} className='mr-3 mt-3' /><strong>Daftar Produk</strong></h4>
                <hr />
                <Row className={styles.menu}>
                  {menus && menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                      
                    />
                  ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang}/>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

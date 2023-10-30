import { Col, ListGroup } from "react-bootstrap"
import axios from "axios"
import { API_URL } from '@/utils/constant';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCoffee, faCheese } from "@fortawesome/free-solid-svg-icons";
import { Component } from "react";


  const Icon = ({ nama }) => {
    if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
    if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />
    if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />

    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
  }


export default class ListCategories extends Component {

  constructor(props) {
    super(props)

    this.state = {
      categories: [],
    }
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((response) => {
        const categories = response.data;
        this.setState({ categories })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { categories } = this.state
    const { changeCategory, categoriYangDipilih } = this.props

    return (
      <Col md={2} className="mt-3">
        <h4><strong>Daftar Kategori</strong></h4>
        <hr />
        <ListGroup className="bg-dark-blue">
          {categories && categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              onClick={() => (changeCategory(category.nama))}
              className={categoriYangDipilih === category.nama && "category-aktif"}
              style={{cursor: "pointer"}}>
              <h5>
                <Icon nama={category.nama} /> {category.nama}
              </h5>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>

    )
  }
}

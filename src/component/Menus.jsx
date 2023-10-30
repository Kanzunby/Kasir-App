import numberFormat from '@/utils/numberFormat'
import React from 'react'
import { Col, Card } from 'react-bootstrap'


const Menus = ({ menu, masukKeranjang }) => {
    return (
        <Col md={4} sm={6} className='mb-4'>
            <Card className='shadow hover:cursor-pointer' onClick={() => masukKeranjang(menu)}>
                <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
                <Card.Body>
                    <Card.Title className='hover:text-dark-blue hover:underline'>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
                    <Card.Text>
                       Rp. {numberFormat (menu.harga)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Menus

import numberFormat from '@/utils/numberFormat'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const ModalKeranjang = ({ 
    showModal, 
    handleClose, 
    keranjangDetail,
    jumlah, 
    keterangan,
    tambah,
    kurang,
    changeHandler,
    handleSubmit,
    totalHarga 
}) => {
    if (keranjangDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {keranjangDetail.product.nama}
                        <strong className='ml-2'>
                            (Rp. {numberFormat(keranjangDetail.product.harga)})
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Total Harga: </Form.Label>
                            <p><strong>
                                Rp. {numberFormat(totalHarga)}
                            </strong></p>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Jumlah: </Form.Label>
                            <br />
                            <Button variant='primary' size='sm' className='mx-2' onClick={() => kurang()} >
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <strong className='mx-2'>{jumlah}</strong>
                            <Button variant='primary' size='sm' className='mx-2' onClick={() => tambah()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Keterangan: </Form.Label>
                            <Form.Control 
                            as="textarea"
                            name='keterangan' 
                            placeholder='Contoh: Pedas, Nasi setengah'
                            value={keterangan}
                            onChange={(event) => changeHandler(event)}
                            />
                        </Form.Group>
                        <Button variant='primary' type='submit' onClick={handleClose}>Simpan</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    } else {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Kosong
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Kosong</Modal.Body>
            </Modal>
        )
    }
}

export default ModalKeranjang

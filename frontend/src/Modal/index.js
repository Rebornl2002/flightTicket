import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function ModalSeatBooking({ show, setShow }) {
    const handleClose = () => {
        setShow(false);
    };

    const navigate = useNavigate();

    const handleClickYes = () => {
        navigate('/seatBook');
    };

    return (
        <Modal aria-labelledby="contained-modal-title-vcenter" centered show={show.toString()}>
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Bạn có muốn chuyển đến trang đặt chỗ không ?
                </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button onClick={handleClickYes}>Có</Button>

                <Button onClick={handleClose}>Không</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ModalPaying({ show, setShow }) {
    const handleClose = () => {
        setShow(false);
    };

    const navigate = useNavigate();

    const handleClickYes = () => {
        navigate('/pay');
    };

    return (
        <Modal aria-labelledby="contained-modal-title-vcenter" centered show={show.toString()}>
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Bạn có muốn chuyển đến trang thanh toán không ?
                </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button onClick={handleClickYes}>Có</Button>

                <Button onClick={handleClose}>Không</Button>
            </Modal.Footer>
        </Modal>
    );
}

export { ModalSeatBooking, ModalPaying };

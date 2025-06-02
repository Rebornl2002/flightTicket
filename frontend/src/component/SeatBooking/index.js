import './SeatBook.scss';
import { toast } from 'react-toastify';
import ToastCustom from '../../Toast';
import { useEffect, useState } from 'react';
import { ModalPaying } from '../../Modal';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import TypeCommon from './TypeCommon';
import axios from 'axios';

function SeatBooking() {
    const [bookedButton1, setBookedButton1] = useState([]);
    const [bookedButton2, setBookedButton2] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);

    console.log('so1:' + bookedButton1, 'so2: ' + bookedButton2);

    const inforFlight = JSON.parse(localStorage.getItem('inforFlight'));
    const inforFlightReturn = JSON.parse(localStorage.getItem('inforFlightReturn'));
    const typeTrip = JSON.parse(localStorage.getItem('TypeTrip'));
    const quantity = JSON.parse(localStorage.getItem('Quantity'));

    const quantitySeat = quantity ? Number(quantity.adults) + Number(quantity.children) + Number(quantity.baby) : 0;

    const storedInforFlight = JSON.parse(localStorage.getItem('inforFlight'));
    const storedInforFlightReturn = JSON.parse(localStorage.getItem('inforFlightReturn'));

    const storedInforConnectFlight = JSON.parse(localStorage.getItem('inforConnectFlight') || 'null');

    const storedIsConnectFlight = JSON.parse(localStorage.getItem('isConnectFlight') || '{}').state;

    let dataConnectFlight1 = null;
    let dataConnectFlight2 = null;

    if (storedInforConnectFlight) {
        dataConnectFlight1 = {
            selectedValue: storedInforConnectFlight.selectedFlight1,
            item: storedInforConnectFlight.item.flight1,
        };

        dataConnectFlight2 = {
            selectedValue: storedInforConnectFlight.selectedFlight2,
            item: storedInforConnectFlight.item.flight2,
        };
    }

    const handleButtonClick1 = (event) => {
        const buttonText = event.target.textContent;
        console.log(buttonText);
        console.log(bookedButton1);

        // includes meaning is cancel seat
        if (bookedButton1.includes(buttonText)) {
            setBookedButton1(bookedButton1.filter((btn) => btn !== buttonText));
            setNumber1((prevNumber) => prevNumber - 1);
        } else if (quantitySeat < number1 + 1) {
            toast.warning('Bạn đã đặt vượt quá số lượng ghế bạn đã chọn. Vui lòng đổi ghế nếu muốn đặt lại.');
            return;
        }

        // !includes meaning is booking seat
        if (!bookedButton1.includes(buttonText)) {
            setBookedButton1([...bookedButton1, buttonText]);
            setNumber1((prevNumber) => prevNumber + 1);
        }
    };

    const handleButtonClick2 = (event) => {
        const buttonText = event.target.textContent;
        console.log(buttonText);
        console.log(bookedButton2);

        // includes meaning is cancel seat
        if (bookedButton2.includes(buttonText)) {
            setBookedButton2(bookedButton2.filter((btn) => btn !== buttonText));
            setNumber2((prevNumber) => prevNumber - 1);
        } else if (quantitySeat < number2 + 1) {
            toast.warning('Bạn đã đặt vượt quá số lượng ghế bạn đã chọn. Vui lòng đổi ghế nếu muốn đặt lại.');
            return;
        }

        // !includes meaning is booking seat
        if (!bookedButton2.includes(buttonText)) {
            setBookedButton2([...bookedButton2, buttonText]);
            setNumber2((prevNumber) => prevNumber + 1);
        }
    };

    const handleBooking = () => {
        if (typeTrip === 'Oneway') {
            if (!storedIsConnectFlight) {
                if (bookedButton1.length === quantitySeat) {
                    const TypeFlight = inforFlight.selectedValue;

                    axios
                        .put(
                            `http://localhost:4000/codeSeat/${inforFlight.item.FlightNumber}?type=${TypeFlight}&seat=${bookedButton1}`,
                        )
                        .then((res) => {
                            console.log(res);
                            setTimeout(() => {
                                setShowModal(true);
                            }, 3000);
                            console.log(bookedButton1);
                            toast.success('Đặt vé thành công!');

                            // Store bookedButton in localStorage
                            localStorage.setItem('bookedButton', JSON.stringify(bookedButton1));
                            if (typeTrip === 'Roundtrip')
                                localStorage.setItem('bookedButtonReturn', JSON.stringify(bookedButton2));
                        })
                        .catch((res) => {
                            const codeSeatDuplicate = res.response.data.data;
                            for (let i = 0; i < codeSeatDuplicate.length; i++) {
                                toast.error(`Ghế ${codeSeatDuplicate[i]} đã được đặt`);
                            }
                        });
                } else {
                    toast.warning('Bạn chưa đặt đủ số lượng ghế !');
                }
            } else {
                if (bookedButton1.length === quantitySeat && bookedButton2.length === quantitySeat) {
                    const TypeFlight1 = dataConnectFlight1.selectedValue;
                    const TypeFlight2 = dataConnectFlight2.selectedValue;
                    const flightNum1 = dataConnectFlight1.item.FlightNumber;
                    const flightNum2 = dataConnectFlight2.item.FlightNumber;

                    axios
                        .put(
                            `http://localhost:4000/codeSeat/roundTrip/${flightNum1}?type=${TypeFlight1}&seat=${bookedButton1}&typeReturn=${TypeFlight2}&seatReturn=${bookedButton2}&idReturn=${flightNum2}`,
                        )
                        .then((res) => {
                            console.log(res);
                            setTimeout(() => {
                                setShowModal(true);
                            }, 3000);
                            console.log(bookedButton1);
                            toast.success('Đặt vé thành công!');

                            // Store bookedButton in localStorage
                            localStorage.setItem('bookedButton', JSON.stringify(bookedButton1));
                            if (storedIsConnectFlight)
                                localStorage.setItem('bookedButtonReturn', JSON.stringify(bookedButton2));
                        })
                        .catch((err) => {
                            const error = err.response.data.data;
                            const errorReturn = err.response.data.dataReturn;

                            if (error) {
                                for (let i = 0; i < error.length; i++) {
                                    toast.error(
                                        `Ghế ${error[i]} của máy bay ${dataConnectFlight1.item.FlightNumber} đã được đặt`,
                                    );
                                }
                            }

                            if (errorReturn) {
                                for (let j = 0; j < errorReturn.length; j++) {
                                    toast.error(
                                        `Ghế ${errorReturn[j]} của máy bay ${dataConnectFlight2.item.FlightNumber} đã được đặt`,
                                    );
                                }
                            }
                        });
                } else {
                    toast.warning('Bạn chưa đặt đủ số lượng ghế!');
                }
            }
        } else {
            if (bookedButton2.length === quantitySeat && bookedButton1.length === quantitySeat) {
                const TypeFlight = inforFlight.selectedValue;
                const TypeFlightReturn = inforFlightReturn.selectedValue;
                axios
                    .put(
                        `http://localhost:4000/codeSeat/roundTrip/${inforFlight.item.FlightNumber}?type=${TypeFlight}&seat=${bookedButton1}&typeReturn=${TypeFlightReturn}&seatReturn=${bookedButton2}&idReturn=${inforFlightReturn.item.FlightNumber}`,
                    )
                    .then((res) => {
                        console.log(res);
                        setTimeout(() => {
                            setShowModal(true);
                        }, 3000);
                        console.log(bookedButton1);
                        toast.success('Đặt vé thành công!');

                        // Store bookedButton in localStorage
                        localStorage.setItem('bookedButton', JSON.stringify(bookedButton1));
                        if (typeTrip === 'Roundtrip')
                            localStorage.setItem('bookedButtonReturn', JSON.stringify(bookedButton2));
                    })
                    .catch((err) => {
                        const error = err.response.data.data;
                        const errorReturn = err.response.data.dataReturn;

                        if (error) {
                            for (let i = 0; i < error.length; i++) {
                                toast.error(`Ghế ${error[i]} của máy bay ${inforFlight.item.FlightNumber} đã được đặt`);
                            }
                        }

                        if (errorReturn) {
                            for (let j = 0; j < errorReturn.length; j++) {
                                toast.error(
                                    `Ghế ${errorReturn[j]} của máy bay ${inforFlightReturn.item.FlightNumber} đã được đặt`,
                                );
                            }
                        }
                    });
            } else {
                toast.warning('Bạn chưa đặt đủ số lượng ghế !');
            }
        }
    };

    const handleReturn = () => {
        navigate('/');
    };

    const [dataNew, setDataNew] = useState();
    const [dataNew2, setDataNew2] = useState();

    async function fetchAPI1(id) {
        let response = await fetch(`http://localhost:4000/tickets/${id}`);
        let data1 = await response.json();
        setDataNew(data1.data);
        return data1.data;
    }
    async function fetchAPI2(id) {
        let response = await fetch(`http://localhost:4000/tickets/${id}`);
        let data1 = await response.json();
        setDataNew2(data1.data);
        return data1.data;
    }

    useEffect(() => {
        if (!storedIsConnectFlight) {
            fetchAPI1(storedInforFlight.item._id);
            if (storedInforFlightReturn) {
                fetchAPI2(storedInforFlightReturn.item._id);
            }
        } else {
            fetchAPI1(storedInforConnectFlight.item.flight1._id);
            fetchAPI2(storedInforConnectFlight.item.flight2._id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let type = ['BusinessClass', 'EconomyClass', 'FirstClass', 'PremiumClass'];

    const compareType = (value) => {
        switch (value) {
            case 'BusinessClass':
                return type[0];

            case 'EconomyClass':
                return type[1];

            case 'FirstClass':
                return type[2];

            default:
                return type[3];
        }
    };

    const typeSeat1 =
        storedIsConnectFlight !== true
            ? compareType(storedInforFlight.selectedValue)
            : compareType(storedInforConnectFlight.selectedFlight1);

    let typeSeat2 = '';
    if (typeTrip === 'Roundtrip') {
        typeSeat2 = compareType(storedInforFlightReturn.selectedValue);
    } else if (storedIsConnectFlight === true) {
        typeSeat2 = compareType(storedInforConnectFlight.selectedFlight2);
    }

    if (dataNew) {
        return (
            <>
                <div className="contain_0">
                    <div className="instruction">
                        <span>Màu ĐỎ là chỗ trống</span>
                        <span>Màu XANH là đặt thành công</span>
                        <span>Dấu X là đã được đặt </span>
                    </div>

                    {!storedIsConnectFlight && (
                        <TypeCommon
                            storedInforFlight={storedInforFlight}
                            typeSeat1={typeSeat1}
                            handleButtonClick={handleButtonClick1}
                            bookedButton={bookedButton1}
                            title="Chuyến đi"
                            dataNew={dataNew}
                        />
                    )}

                    {typeTrip === 'Roundtrip' && dataNew2 && (
                        <div className="return">
                            <div className="instruction">
                                <span>Màu ĐỎ là chỗ trống</span>
                                <span>Màu XANH là đặt thành công</span>
                                <span>Dấu X là đã được đặt </span>
                            </div>
                            <TypeCommon
                                storedInforFlight={storedInforFlightReturn}
                                typeSeat1={typeSeat2}
                                handleButtonClick={handleButtonClick2}
                                bookedButton={bookedButton2}
                                title="Chuyến về"
                                dataNew={dataNew2}
                            />
                        </div>
                    )}

                    {storedIsConnectFlight && dataNew2 && (
                        <div>
                            <TypeCommon
                                storedInforFlight={dataConnectFlight1}
                                typeSeat1={typeSeat1}
                                handleButtonClick={handleButtonClick1}
                                bookedButton={bookedButton1}
                                title="Chặng 1"
                                dataNew={dataNew}
                            />

                            <TypeCommon
                                storedInforFlight={dataConnectFlight2}
                                typeSeat1={typeSeat2}
                                handleButtonClick={handleButtonClick2}
                                bookedButton={bookedButton2}
                                title="Chặng 2"
                                dataNew={dataNew2}
                            />
                        </div>
                    )}

                    <div className="mb-5 final_book">
                        <Button variant="info" onClick={handleBooking} className="me-3">
                            Đặt vé
                        </Button>

                        <Button variant="secondary" onClick={handleReturn}>
                            Trở lại
                        </Button>
                    </div>
                </div>

                {showModal && <ModalPaying show={showModal} setShow={setShowModal} />}
                <ToastCustom />
            </>
        );
    }
}

export default SeatBooking;

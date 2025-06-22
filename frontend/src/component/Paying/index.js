/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import GetAllData from '../GetAllData';
import classNames from 'classnames/bind';
import styles from './Paying.module.scss';
import Header from '../DefaultPage/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastCustom from '../../Toast';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Paying() {
    const [show, setShow] = useState(false);
    const storedInforFlight = JSON.parse(localStorage.getItem('inforFlight'));
    const storedInforPerson = JSON.parse(localStorage.getItem('inforPerson'));
    const storedInforSeat = JSON.parse(localStorage.getItem('bookedButton'));
    const storedTypeTrip = JSON.parse(localStorage.getItem('TypeTrip'));
    const storedQuantity = JSON.parse(localStorage.getItem('Quantity'));
    const inforFlightReturn = JSON.parse(localStorage.getItem('inforFlightReturn'));
    const codeTicket = JSON.parse(localStorage.getItem('session'));
    const storedInforConnectFlight = JSON.parse(localStorage.getItem('inforConnectFlight') || 'null');

    const storedIsConnectFlight = JSON.parse(localStorage.getItem('isConnectFlight') || '{}')?.state;
    const storedInforSeatConnect = JSON.parse(localStorage.getItem('bookedButtonReturn') || '[]');

    const navigate = useNavigate();

    const onName = (e) => {
        setName(e.target.value);
    };

    const onNumberCard = (e) => {
        setNumberCard(e.target.value);
    };

    const onExpirationDate = (e) => {
        setExpirationDate(e.target.value);
    };

    const onCvv = (e) => {
        setCvv(e.target.value);
    };

    let dataConnectFlight1 = null;
    let dataConnectFlight2 = null;

    const calculateTotalPrice = (money) => {
        const adults = Number(storedQuantity.adults);
        const children = Number(storedQuantity.children);
        const baby = Number(storedQuantity.baby);
        return money * (adults + children * 0.75 + baby * 0.5);
    };

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
    const [plant, setPlant] = useState('');
    const [numberCard, setNumberCard] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [name, setName] = useState('');
    const [cvv, setCvv] = useState('');
    const [isNumberCard, setIsNumberCard] = useState(false);
    const [user, setUser] = useState([]);
    const [timeoutId, setTimeoutId] = useState(null);
    const [timeoutPay, setTimeoutPay] = useState(false);

    let storedInforFlightReturn, storedInforSeatReturn;

    const checkTypeTrip = (TypeTrip) => {
        if (TypeTrip === 'Oneway') {
            return true;
        } else {
            return false;
        }
    };

    const valueReturn = () => {
        if (!storedIsConnectFlight) {
            storedInforFlightReturn = JSON.parse(localStorage.getItem('inforFlightReturn'));
            storedInforSeatReturn = JSON.parse(localStorage.getItem('bookedButtonReturn'));

            const data = {
                TypeFlight: storedTypeTrip,
                TypeTicket: storedInforFlight.selectedValue,
                AirportFrom: storedInforFlight.item.AirportFrom,
                AirportTo: storedInforFlight.item.AirportTo,
                FlightTime: storedInforFlight.item.FlightTime,
                LandingTime: storedInforFlight.item.LandingTime,
                DateGo: storedInforFlight.item.DateGo,
                CodeTicket: codeTicket,
                FlightNumber: storedInforFlight.item.FlightNumber,
                UserName: storedInforPerson.Username,
                ID_Card: storedInforPerson.ID_Card,
                CodeSeat: storedInforSeat.join(' - '),
                Email: storedInforPerson.Email,
                TotalMoneyGo: storedInforFlight.moneyAdult,
                TotalMoneyReturn: storedInforFlightReturn.moneyAdult,
                TypeTicketReturn: storedInforFlightReturn.selectedValue,
                FlightNumberReturn: storedInforFlightReturn.item.FlightNumber,
                FlightTimeReturn: storedInforFlightReturn.item.FlightTime,
                LandingTimeReturn: storedInforFlightReturn.item.LandingTime,
                DateReturn: storedInforFlightReturn.item.DateGo,
                CodeSeatReturn: storedInforSeatReturn.join(' - '),

                // TotalMoney: storedInforFlight.total + storedInforFlightReturn.total,
                TotalMoney: storedInforFlight.moneyAdult + storedInforFlightReturn.moneyAdult,
            };
            return data;
        } else {
            const data = {
                TypeFlight: storedTypeTrip,
                TypeTicket: dataConnectFlight2.selectedValue,
                AirportFrom: dataConnectFlight2.item.AirportFrom,
                AirportTo: dataConnectFlight2.item.AirportTo,
                FlightTime: dataConnectFlight2.item.FlightTime,
                LandingTime: dataConnectFlight2.item.LandingTime,
                DateGo: dataConnectFlight2.item.DateGo,
                CodeTicket: codeTicket,
                FlightNumber: dataConnectFlight2.item.FlightNumber,
                UserName: storedInforPerson.Username,
                ID_Card: storedInforPerson.ID_Card,
                CodeSeat: storedInforSeatConnect.join(' - '),
                Email: storedInforPerson.Email,
                TotalMoneyGo: calculateTotalPrice(dataConnectFlight2.item[dataConnectFlight2.selectedValue].PriceAdult),
                TotalMoney: calculateTotalPrice(dataConnectFlight2.item[dataConnectFlight2.selectedValue].PriceAdult),
                moneyAdult: dataConnectFlight2.item[dataConnectFlight2.selectedValue].PriceAdult,
            };
            return data;
        }
    };

    const valueDepart = () => {
        if (storedIsConnectFlight) {
            storedInforSeatReturn = JSON.parse(localStorage.getItem('bookedButtonReturn'));

            const data = {
                TypeFlight: storedTypeTrip,
                TypeTicket: dataConnectFlight1.selectedValue,
                AirportFrom: dataConnectFlight1.item.AirportFrom,
                AirportTo: dataConnectFlight1.item.AirportTo,
                FlightTime: dataConnectFlight1.item.FlightTime,
                LandingTime: dataConnectFlight1.item.LandingTime,
                DateGo: dataConnectFlight1.item.DateGo,
                CodeTicket: codeTicket,
                FlightNumber: dataConnectFlight1.item.FlightNumber,
                UserName: storedInforPerson.Username,
                ID_Card: storedInforPerson.ID_Card,
                CodeSeat: storedInforSeat.join(' - '),
                Email: storedInforPerson.Email,
                TotalMoneyGo: calculateTotalPrice(dataConnectFlight1.item[dataConnectFlight1.selectedValue].PriceAdult),
                TotalMoney: calculateTotalPrice(dataConnectFlight1.item[dataConnectFlight1.selectedValue].PriceAdult),
            };
            return data;
        } else {
            const data = {
                TypeFlight: storedTypeTrip,
                TypeTicket: storedInforFlight.selectedValue,
                AirportFrom: storedInforFlight.item.AirportFrom,
                AirportTo: storedInforFlight.item.AirportTo,
                FlightTime: storedInforFlight.item.FlightTime,
                LandingTime: storedInforFlight.item.LandingTime,
                DateGo: storedInforFlight.item.DateGo,
                CodeTicket: codeTicket,
                FlightNumber: storedInforFlight.item.FlightNumber,
                UserName: storedInforPerson.Username,
                ID_Card: storedInforPerson.ID_Card,
                CodeSeat: storedInforSeat.join(' - '),
                Email: storedInforPerson.Email,
                TotalMoneyGo: calculateTotalPrice(storedInforFlight.moneyAdult),
                TotalMoney: calculateTotalPrice(storedInforFlight.moneyAdult),
            };
            return data;
        }
    };

    console.log('storedInforFlight', storedInforFlight);

    let data00;
    let data01;

    if (checkTypeTrip(storedTypeTrip)) {
        if (!storedIsConnectFlight) {
            data00 = valueDepart();
        } else {
            data00 = valueDepart();
            data01 = valueReturn();
        }
    } else data00 = valueReturn();

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
    let array1, array2;

    if (numberCard && expirationDate && name && isNumberCard) {
        if (dataNew) {
            array1 = dataNew[data00.TypeTicket].CodeSeat;

            storedInforSeat.forEach((value) => {
                if (!array1.includes(value)) {
                    array1.push(value);
                }
            });
        } else {
            const idToFetch = storedIsConnectFlight ? dataConnectFlight1.item._id : storedInforFlight.item._id;

            fetchAPI1(idToFetch);
        }

        if (storedIsConnectFlight) {
            if (dataNew2) {
                array2 = dataNew2[data01.TypeTicket].CodeSeat;

                // if (!array2.includes(storedInforSeatReturn)) {
                //     array2.push(...storedInforSeatReturn);
                // }
                // array2.push(...storedInforSeatReturn);
                storedInforSeatReturn.forEach((value) => {
                    if (!array2.includes(value)) {
                        array2.push(value);
                    }
                });
            } else {
                fetchAPI2(dataConnectFlight2.item._id);
            }
        }
    }

    if (!checkTypeTrip(storedTypeTrip)) {
        if (numberCard && expirationDate && name && isNumberCard) {
            if (dataNew2) {
                array2 = dataNew2[data00.TypeTicketReturn].CodeSeat;

                // if (!array2.includes(storedInforSeatReturn)) {
                //     array2.push(...storedInforSeatReturn);
                // }
                // array2.push(...storedInforSeatReturn);
                storedInforSeatReturn.forEach((value) => {
                    if (!array2.includes(value)) {
                        array2.push(value);
                    }
                });
            } else {
                console.log(storedInforFlightReturn.item);
                fetchAPI2(storedInforFlightReturn.item._id);
            }
        }
    }

    const pushSeat = () => {
        if (!storedIsConnectFlight) {
            const data = {
                [data00.TypeTicket]: {
                    // PriceAdult: dataNew[data00.FirstClass].PriceAdult,
                    // PriceChildren: dataNew[data00.FirstClass].Children,
                    PriceAdult: dataNew[data00.TypeTicket].PriceAdult,
                    CodeSeat: array1,
                },
            };

            console.log('checkData', dataNew);

            const id = storedInforFlight.item._id;

            axios
                .patch(`http://localhost:4000/tickets/${id}`, data)
                .then((response) => {
                    console.log('Data updated:', response.data);
                    // Perform any additional actions after successful update
                })
                .catch((error) => {
                    console.error('Error updating data:', error);
                    // Handle error case
                });
        } else {
            const data = {
                [data00.TypeTicket]: {
                    // PriceAdult: dataNew[data00.FirstClass].PriceAdult,
                    // PriceChildren: dataNew[data00.FirstClass].Children,
                    PriceAdult: dataNew[data00.TypeTicket].PriceAdult,
                    CodeSeat: array1,
                },
            };

            const data2 = {
                [data01.TypeTicket]: {
                    // PriceAdult: dataNew2[data01.FirstClass].PriceAdult,
                    // PriceChildren: dataNew2[data01.FirstClass].Children,
                    PriceAdult: dataNew2[data01.TypeTicket].PriceAdult,
                    CodeSeat: array2,
                },
            };

            axios
                .patch(`http://localhost:4000/tickets/${dataConnectFlight1.item._id}`, data)
                .then((response) => {
                    console.log('Data updated:', response.data);
                    // Perform any additional actions after successful update
                })
                .catch((error) => {
                    console.error('Error updating data:', error);
                    // Handle error case
                });

            axios
                .patch(`http://localhost:4000/tickets/${dataConnectFlight2.item._id}`, data2)
                .then((response) => {
                    console.log('Data updated:', response.data);
                    // Perform any additional actions after successful update
                })
                .catch((error) => {
                    console.error('Error updating data:', error);
                    // Handle error case
                });
        }
    };

    const pushSeat2 = (id) => {
        const data = {
            [data00.TypeTicketReturn]: {
                // PriceAdult: dataNew[data00.FirstClass].PriceAdult,
                // PriceChildren: dataNew[data00.FirstClass].Children,
                PriceAdult: dataNew2[data00.TypeTicketReturn].PriceAdult,
                CodeSeat: array2,
            },
        };

        axios
            .patch(`http://localhost:4000/tickets/${id}`, data)
            .then((response) => {
                console.log('Data updated:', response.data);
                // Perform any additional actions after successful update
            })
            .catch((error) => {
                console.error('Error updating data:', error);
                // Handle error case
            });
    };

    const is_creditCard = (str) => {
        const regexp =
            /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
        if (regexp.test(str)) {
            return true;
        } else {
            return false;
        }
    };

    const totalPeople = Number(storedQuantity.adults) + Number(storedQuantity.children) + Number(storedQuantity.baby);

    useEffect(() => {
        axios
            .get('http://localhost:4000/users')
            .then((res) => setUser(res.data.data.slice(-totalPeople)))
            .catch((err) => console.error(err));
    }, []);

    const handleGetNewCodeTicket = (code, type) => {
        const newCode = code + type;
        return newCode;
    };

    console.log('data00', data00);

    function handlePustTicketDetail() {
        const totalPeople =
            Number(storedQuantity.adults) + Number(storedQuantity.children) + Number(storedQuantity.baby);

        const codeSeatSingle = data00.CodeSeat.split('-');

        let CodeSeatReturnSingle = [];

        const getCodeSeatReturn = () => {
            const newSeat = data00.CodeSeatReturn.split('-');
            CodeSeatReturnSingle = newSeat;
            return CodeSeatReturnSingle;
        };

        if (data00.TypeFlight === 'Roundtrip') {
            getCodeSeatReturn();
        }

        for (let i = 0; i < Number(storedQuantity.adults); i++) {
            const newCodeTicket = handleGetNewCodeTicket(data00.CodeTicket, 'A') + i;
            let total;
            if (data00.TypeFlight === 'Roundtrip') {
                total = storedInforFlight.moneyAdult + data00.TotalMoneyReturn;
            } else {
                total = storedInforFlight.moneyAdult;
            }

            axios
                .post('http://localhost:4000/info', {
                    TypeFlight: data00.TypeFlight,
                    TypeTicket: data00.TypeTicket,
                    AirportFrom: data00.AirportFrom,
                    AirportTo: data00.AirportTo,
                    FlightTime: data00.FlightTime,
                    LandingTime: data00.LandingTime,
                    DateGo: data00.DateGo,
                    TotalMoneyGo: storedInforFlight.moneyAdult,
                    TotalMoneyReturn: data00.TotalMoneyReturn,
                    // TotalMoney: storedInforFlight.moneyAdult + data00.TotalMoneyReturn,
                    // TotalMoney: data00.TotalMoney,
                    TotalMoney: total,

                    CodeTicket: newCodeTicket,
                    FlightNumber: data00.FlightNumber,
                    UserName: user[i].Username,
                    ID_Card: user[i].ID_Card,
                    CodeSeat: codeSeatSingle[i],
                    Email: user[i].Email,
                    TypeTicketReturn: data00.TypeTicketReturn,
                    FlightNumberReturn: data00.FlightNumberReturn,
                    FlightTimeReturn: data00.FlightTimeReturn,
                    LandingTimeReturn: data00.LandingTimeReturn,
                    CodeSeatReturn: CodeSeatReturnSingle[i],
                    DateReturn: data00.DateReturn,
                })
                .then((response) => console.log(response))
                .catch((error) => console.log(error));

            axios
                .post('http://localhost:4000/ticketDetail', {
                    TypeFlight: data00.TypeFlight,
                    TypeTicket: data00.TypeTicket,
                    AirportFrom: data00.AirportFrom,
                    AirportTo: data00.AirportTo,
                    FlightTime: data00.FlightTime,
                    LandingTime: data00.LandingTime,
                    DateGo: data00.DateGo,
                    TotalMoney: data00.TotalMoney,
                    CodeTicket: newCodeTicket,
                    CodeTicketGeneral: data00.CodeTicket,
                    FlightNumber: data00.FlightNumber,
                    UserName: user[i].Username,
                    ID_Card: user[i].ID_Card,
                    CodeSeat: codeSeatSingle[i],
                    Email: user[i].Email,
                    TypeTicketReturn: data00.TypeTicketReturn,
                    FlightNumberReturn: data00.FlightNumberReturn,
                    FlightTimeReturn: data00.FlightTimeReturn,
                    LandingTimeReturn: data00.LandingTimeReturn,
                    CodeSeatReturn: CodeSeatReturnSingle[i],
                    DateReturn: data00.DateReturn,
                })
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        }

        for (
            let i = Number(storedQuantity.adults);
            i < Number(storedQuantity.adults) + Number(storedQuantity.children);
            i++
        ) {
            const newCodeTicketChildren = handleGetNewCodeTicket(data00.CodeTicket, 'C') + i;

            const postData = {
                TypeFlight: data00.TypeFlight,
                TypeTicket: data00.TypeTicket,
                AirportFrom: data00.AirportFrom,
                AirportTo: data00.AirportTo,
                FlightTime: data00.FlightTime,
                LandingTime: data00.LandingTime,
                DateGo: data00.DateGo,
                TotalMoneyGo: storedInforFlight.moneyChildren,
                CodeTicket: newCodeTicketChildren,
                FlightNumber: data00.FlightNumber,
                UserName: user[i].Username,
                ID_Card: user[i].ID_Card,
                CodeSeat: codeSeatSingle[i],
                Email: user[i].Email,
                TypeTicketReturn: data00.TypeTicketReturn,
                FlightNumberReturn: data00.FlightNumberReturn,
                FlightTimeReturn: data00.FlightTimeReturn,
                LandingTimeReturn: data00.LandingTimeReturn,
                CodeSeatReturn: CodeSeatReturnSingle[i],
                DateReturn: data00.DateReturn,
            };

            if (data00.TotalMoneyReturn) {
                let totalAll = storedInforFlight.moneyChildren + data00.TotalMoneyReturn * 0.75;
                postData.TotalMoneyReturn = data00.TotalMoneyReturn * 0.75;
                postData.TotalMoney = totalAll;
            } else {
                postData.TotalMoney = storedInforFlight.moneyChildren;
            }

            axios
                .post('http://localhost:4000/info', postData)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));

            axios
                .post('http://localhost:4000/ticketDetail', {
                    TypeFlight: data00.TypeFlight,
                    TypeTicket: data00.TypeTicket,
                    AirportFrom: data00.AirportFrom,
                    AirportTo: data00.AirportTo,
                    FlightTime: data00.FlightTime,
                    LandingTime: data00.LandingTime,
                    DateGo: data00.DateGo,
                    TotalMoney: data00.TotalMoney,
                    CodeTicket: newCodeTicketChildren,
                    CodeTicketGeneral: data00.CodeTicket,
                    FlightNumber: data00.FlightNumber,
                    UserName: user[i].Username,
                    ID_Card: user[i].ID_Card,
                    CodeSeat: codeSeatSingle[i],
                    Email: user[i].Email,
                    TypeTicketReturn: data00.TypeTicketReturn,
                    FlightNumberReturn: data00.FlightNumberReturn,
                    FlightTimeReturn: data00.FlightTimeReturn,
                    LandingTimeReturn: data00.LandingTimeReturn,
                    CodeSeatReturn: CodeSeatReturnSingle[i],
                    DateReturn: data00.DateReturn,
                })
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        }

        for (let i = totalPeople - Number(storedQuantity.baby); i < totalPeople; i++) {
            const newCodeTicketBaby = handleGetNewCodeTicket(data00.CodeTicket, 'B') + i;
            // let totalAll = storedInforFlight.moneyAdult + data00.TotalMoneyReturn * 0.5;

            const postData = {
                TypeFlight: data00.TypeFlight,
                TypeTicket: data00.TypeTicket,
                AirportFrom: data00.AirportFrom,
                AirportTo: data00.AirportTo,
                FlightTime: data00.FlightTime,
                LandingTime: data00.LandingTime,
                DateGo: data00.DateGo,
                TotalMoneyGo: storedInforFlight.moneyBaby,
                // TotalMoney: data00.TotalMoney,
                // TotalMoney:totalAll,
                CodeTicket: newCodeTicketBaby,
                FlightNumber: data00.FlightNumber,
                UserName: user[i].Username,
                ID_Card: user[i].ID_Card,
                CodeSeat: codeSeatSingle[i],
                Email: user[i].Email,
                TypeTicketReturn: data00.TypeTicketReturn,
                FlightNumberReturn: data00.FlightNumberReturn,
                FlightTimeReturn: data00.FlightTimeReturn,
                LandingTimeReturn: data00.LandingTimeReturn,
                CodeSeatReturn: CodeSeatReturnSingle[i],
                DateReturn: data00.DateReturn,
            };

            if (data00.TotalMoneyReturn) {
                let total = storedInforFlight.moneyBaby + data00.TotalMoneyReturn * 0.5;
                postData.TotalMoneyReturn = data00.TotalMoneyReturn * 0.5;
                postData.TotalMoney = total;
            } else {
                postData.TotalMoney = storedInforFlight.moneyBaby;
            }

            axios
                .post('http://localhost:4000/info', postData)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));

            axios
                .post('http://localhost:4000/ticketDetail', {
                    TypeFlight: data00.TypeFlight,
                    TypeTicket: data00.TypeTicket,
                    AirportFrom: data00.AirportFrom,
                    AirportTo: data00.AirportTo,
                    FlightTime: data00.FlightTime,
                    LandingTime: data00.LandingTime,
                    DateGo: data00.DateGo,
                    TotalMoney: data00.TotalMoney,
                    CodeTicket: newCodeTicketBaby,
                    CodeTicketGeneral: data00.CodeTicket,
                    FlightNumber: data00.FlightNumber,
                    UserName: user[i].Username,
                    ID_Card: user[i].ID_Card,
                    CodeSeat: codeSeatSingle[i],
                    Email: user[i].Email,
                    TypeTicketReturn: data00.TypeTicketReturn,
                    FlightNumberReturn: data00.FlightNumberReturn,
                    FlightTimeReturn: data00.FlightTimeReturn,
                    LandingTimeReturn: data00.LandingTimeReturn,
                    CodeSeatReturn: CodeSeatReturnSingle[i],
                    DateReturn: data00.DateReturn,
                })
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        }
    }

    function handlePostTicketDetailConnect() {
        const totalPeople =
            Number(storedQuantity.adults) + Number(storedQuantity.children) + Number(storedQuantity.baby);

        const flightsData = storedIsConnectFlight ? [data00, data01] : [data00];

        flightsData.forEach((data, flightIndex) => {
            const codeSeatSingle = data.CodeSeat.split('-');

            let CodeSeatReturnSingle = [];
            const getCodeSeatReturn = () => {
                const newSeat = data.CodeSeatReturn.split('-');
                CodeSeatReturnSingle = newSeat;
                return CodeSeatReturnSingle;
            };
            if (data.TypeFlight === 'Roundtrip') {
                getCodeSeatReturn();
            }

            console.log('data', data);
            console.log('codeSeatSingle', codeSeatSingle);

            // --- 1. Loop cho nhóm adults ---
            for (let i = 0; i < Number(storedQuantity.adults); i++) {
                const newCodeTicket = handleGetNewCodeTicket(data.CodeTicket, 'A') + i + flightIndex;
                // Tính tổng tiền: nếu là Roundtrip thì cộng thêm TotalMoneyReturn, ngược lại chỉ moneyAdult
                let total;
                if (data.TypeFlight === 'Roundtrip') {
                    // total = storedInforFlight.moneyAdult + data.TotalMoneyReturn;
                    console.log('storedInforFlight', storedInforFlight);
                } else {
                    total = data.moneyAdult;
                }
                // Body cho API '/info'
                const postInfo = {
                    TypeFlight: data.TypeFlight,
                    TypeTicket: data.TypeTicket,
                    AirportFrom: data.AirportFrom,
                    AirportTo: data.AirportTo,
                    FlightTime: data.FlightTime,
                    LandingTime: data.LandingTime,
                    DateGo: data.DateGo,
                    TotalMoneyGo: data.TotalMoneyGo,
                    TotalMoneyReturn: data.TotalMoneyReturn,
                    TotalMoney: data.TotalMoneyGo,
                    CodeTicket: newCodeTicket,
                    FlightNumber: data.FlightNumber,
                    UserName: user[i].Username,
                    ID_Card: user[i].ID_Card,
                    CodeSeat: codeSeatSingle[i],
                    Email: user[i].Email,
                    TypeTicketReturn: data.TypeTicketReturn,
                    FlightNumberReturn: data.FlightNumberReturn,
                    FlightTimeReturn: data.FlightTimeReturn,
                    LandingTimeReturn: data.LandingTimeReturn,
                    CodeSeatReturn: CodeSeatReturnSingle[i],
                    DateReturn: data.DateReturn,
                };

                console.log('postInfo', postInfo);

                axios
                    .post('http://localhost:4000/info', postInfo)
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error));
                // Body cho API '/ticketDetail'
                const postDetail = {
                    TypeFlight: data.TypeFlight,
                    TypeTicket: data.TypeTicket,
                    AirportFrom: data.AirportFrom,
                    AirportTo: data.AirportTo,
                    FlightTime: data.FlightTime,
                    LandingTime: data.LandingTime,
                    DateGo: data.DateGo,
                    TotalMoney: data.TotalMoney,
                    CodeTicket: newCodeTicket,
                    CodeTicketGeneral: data.CodeTicket,
                    FlightNumber: data.FlightNumber,
                    UserName: user[i].Username,
                    ID_Card: user[i].ID_Card,
                    CodeSeat: codeSeatSingle[i],
                    Email: user[i].Email,
                    TypeTicketReturn: data.TypeTicketReturn,
                    FlightNumberReturn: data.FlightNumberReturn,
                    FlightTimeReturn: data.FlightTimeReturn,
                    LandingTimeReturn: data.LandingTimeReturn,
                    CodeSeatReturn: CodeSeatReturnSingle[i],
                    DateReturn: data.DateReturn,
                };
                axios
                    .post('http://localhost:4000/ticketDetail', postDetail)
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error));
            }
            // --- 2. Loop cho nhóm children ---
            for (
                let i = Number(storedQuantity.adults);
                i < Number(storedQuantity.adults) + Number(storedQuantity.children);
                i++
            ) {
                const newCodeTicketChildren = handleGetNewCodeTicket(data.CodeTicket, 'C') + i + flightIndex;
                // Chuẩn bị object chung
                const postData = {
                    TypeFlight: data.TypeFlight,
                    TypeTicket: data.TypeTicket,
                    AirportFrom: data.AirportFrom,
                    AirportTo: data.AirportTo,
                    FlightTime: data.FlightTime,
                    LandingTime: data.LandingTime,
                    DateGo: data.DateGo,
                    TotalMoneyGo: data.TotalMoneyGo * 0.75,
                    CodeTicket: newCodeTicketChildren,
                    FlightNumber: data.FlightNumber,
                    UserName: user[i].Username,
                    ID_Card: user[i].ID_Card,
                    CodeSeat: codeSeatSingle[i],
                    Email: user[i].Email,
                    TypeTicketReturn: data.TypeTicketReturn,
                    FlightNumberReturn: data.FlightNumberReturn,
                    FlightTimeReturn: data.FlightTimeReturn,
                    LandingTimeReturn: data.LandingTimeReturn,
                    CodeSeatReturn: CodeSeatReturnSingle[i],
                    DateReturn: data.DateReturn,
                };
                // Nếu có chuyến về (TotalMoneyReturn), ta tính lại tiền theo tỉ lệ trẻ em (0.75)
                if (data.TotalMoneyReturn) {
                    let totalAll = storedInforFlight.moneyChildren + data.TotalMoneyReturn * 0.75;
                    postData.TotalMoneyReturn = data.TotalMoneyReturn * 0.75;
                    postData.TotalMoney = totalAll;
                } else {
                    postData.TotalMoney = data.TotalMoneyGo * 0.75;
                }
                axios
                    .post('http://localhost:4000/info', postData)
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error));
                // Gửi thêm ticketDetail
                const postDetailChild = {
                    TypeFlight: data.TypeFlight,
                    TypeTicket: data.TypeTicket,
                    AirportFrom: data.AirportFrom,
                    AirportTo: data.AirportTo,
                    FlightTime: data.FlightTime,
                    LandingTime: data.LandingTime,
                    DateGo: data.DateGo,
                    TotalMoney: data.TotalMoney,
                    CodeTicket: newCodeTicketChildren,
                    CodeTicketGeneral: data.CodeTicket,
                    FlightNumber: data.FlightNumber,
                    UserName: user[i].Username,
                    ID_Card: user[i].ID_Card,
                    CodeSeat: codeSeatSingle[i],
                    Email: user[i].Email,
                    TypeTicketReturn: data.TypeTicketReturn,
                    FlightNumberReturn: data.FlightNumberReturn,
                    FlightTimeReturn: data.FlightTimeReturn,
                    LandingTimeReturn: data.LandingTimeReturn,
                    CodeSeatReturn: CodeSeatReturnSingle[i],
                    DateReturn: data.DateReturn,
                };
                axios
                    .post('http://localhost:4000/ticketDetail', postDetailChild)
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error));
            }
            // --- 3. Loop cho nhóm baby ---
            for (let i = totalPeople - Number(storedQuantity.baby); i < totalPeople; i++) {
                const newCodeTicketBaby = handleGetNewCodeTicket(data.CodeTicket, 'B') + i + flightIndex;
                const postData = {
                    TypeFlight: data.TypeFlight,
                    TypeTicket: data.TypeTicket,
                    AirportFrom: data.AirportFrom,
                    AirportTo: data.AirportTo,
                    FlightTime: data.FlightTime,
                    LandingTime: data.LandingTime,
                    DateGo: data.DateGo,
                    TotalMoneyGo: data.TotalMoneyGo * 0.5,
                    CodeTicket: newCodeTicketBaby,
                    FlightNumber: data.FlightNumber,
                    UserName: user[i].Username,
                    ID_Card: user[i].ID_Card,
                    CodeSeat: codeSeatSingle[i],
                    Email: user[i].Email,
                    TypeTicketReturn: data.TypeTicketReturn,
                    FlightNumberReturn: data.FlightNumberReturn,
                    FlightTimeReturn: data.FlightTimeReturn,
                    LandingTimeReturn: data.LandingTimeReturn,
                    CodeSeatReturn: CodeSeatReturnSingle[i],
                    DateReturn: data.DateReturn,
                };
                // Nếu có chuyến về, tính lại tiền theo tỉ lệ em bé (0.5)
                if (data.TotalMoneyReturn) {
                    let total = storedInforFlight.moneyBaby + data.TotalMoneyReturn * 0.5;
                    postData.TotalMoneyReturn = data.TotalMoneyReturn * 0.5;
                    postData.TotalMoney = total;
                } else {
                    postData.TotalMoney = data.TotalMoneyGo * 0.5;
                }
                axios
                    .post('http://localhost:4000/info', postData)
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error));
                const postDetailBaby = {
                    TypeFlight: data.TypeFlight,
                    TypeTicket: data.TypeTicket,
                    AirportFrom: data.AirportFrom,
                    AirportTo: data.AirportTo,
                    FlightTime: data.FlightTime,
                    LandingTime: data.LandingTime,
                    DateGo: data.DateGo,
                    TotalMoney: data.TotalMoneyGo * 0.5,
                    CodeTicket: newCodeTicketBaby,
                    CodeTicketGeneral: data.CodeTicket,
                    FlightNumber: data.FlightNumber,
                    UserName: user[i].Username,
                    ID_Card: user[i].ID_Card,
                    CodeSeat: codeSeatSingle[i],
                    Email: user[i].Email,
                    TypeTicketReturn: data.TypeTicketReturn,
                    FlightNumberReturn: data.FlightNumberReturn,
                    FlightTimeReturn: data.FlightTimeReturn,
                    LandingTimeReturn: data.LandingTimeReturn,
                    CodeSeatReturn: CodeSeatReturnSingle[i],
                    DateReturn: data.DateReturn,
                };
                axios
                    .post('http://localhost:4000/ticketDetail', postDetailBaby)
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error));
            }
        });
    }

    const handlePay = async (e) => {
        const isCardOk = await handleInputNumberCard();

        if (numberCard !== '' && expirationDate !== '' && name !== '' && isCardOk) {
            if (isNumberCard) {
                setShouldStop(true);
                setShow(true);

                pushSeat();

                if (!checkTypeTrip(storedTypeTrip)) {
                    pushSeat2(storedInforFlightReturn.item._id);
                }

                if (!storedIsConnectFlight) {
                    handlePustTicketDetail();
                } else {
                    handlePostTicketDetailConnect();
                }

                toast.success('Thanh toán thành công!');
                setTimeout(() => {
                    handleSendEmail();
                }, 2000);
                clearTimeout(timeoutId);
                setCountdown(0);
            }
        } else {
            handleInputNumberCard(e);
        }
    };

    // const email = "minh10a1quangtrung@gmail.com";
    // const code = "AJHHF";
    const handleSendEmail = async (e) => {
        await axios
            .get(`http://localhost:4000/ticketDetail/${data00.CodeTicket}`)
            .then((response) => {
                fetch('http://localhost:4000/sendEmail/all', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code: data00.CodeTicket,
                        data: response.data.data,
                        type: data00.TypeFlight,
                    }),
                });
                console.log('Da gui email ve may ');
            })
            .catch((err) => console.log(err));
    };
    const planeCode = storedInforFlight?.item?.AirlineCode ?? dataConnectFlight1?.item?.AirlineCode;

    useEffect(() => {
        if (planeCode === 'VJ') {
            setPlant('VietJet');
        } else if (planeCode === 'VNA') {
            setPlant('Vietnam Airlines');
        } else if (planeCode === 'QH') {
            setPlant('BamBo Airways');
        } else if (planeCode === 'BL') {
            setPlant('Jetstar Pacific Airlines');
        }
    }, [planeCode]);

    const handleInputNumberCard = async () => {
        const cardNumber = document.querySelector('#card-number');
        const error = document.querySelector('#ip-1');

        if (!numberCard || numberCard.trim() === '') {
            cardNumber.style.outlineColor = 'red';
            error.innerText = 'Vui lòng nhập số thẻ';
            error.style.color = 'red';
            setIsNumberCard(false);
            return false;
        }

        if (!is_creditCard(numberCard)) {
            cardNumber.style.outlineColor = 'red';
            error.innerText = 'Số thẻ không hợp lệ';
            error.style.color = 'red';
            setIsNumberCard(false);
            return false;
        } else {
            cardNumber.style.outlineColor = '#4469b0';
            error.innerText = 'Vui lòng nhập số thẻ';
            error.style.color = 'transparent';
            try {
                const res = await axios.post('http://localhost:4000/card/check', {
                    cardNumber: numberCard,
                    name: name,
                    exp: expirationDate,
                    cvv: cvv,
                });
                if (res.statusText === 'OK' && res.data.valid) {
                    setIsNumberCard(true);
                    return true;
                }
            } catch (err) {
                console.log('err', err);
                return false;
            }
        }
    };

    const [countdown, setCountdown] = useState(300);
    const [shouldStop, setShouldStop] = useState(false); // Thêm biến shouldStop

    useEffect(() => {
        let interval;

        if (countdown > 0 && !shouldStop) {
            interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        if (countdown === 0) {
            setTimeoutPay(true);
        }

        return () => clearInterval(interval);
    }, [countdown, shouldStop]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleDeleteCodeSeat = async () => {
        try {
            if (storedTypeTrip === 'Roundtrip') {
                const TypeFlight = storedInforFlight.selectedValue;
                const TypeFlightReturn = inforFlightReturn.selectedValue;

                const urlDepart = `http://localhost:4000/codeSeat/fail/${storedInforFlight.item.FlightNumber}?type=${TypeFlight}&seat=${storedInforSeat}`;
                const urlReturn = `http://localhost:4000/codeSeat/fail/${inforFlightReturn.item.FlightNumber}?type=${TypeFlightReturn}&seat=${storedInforSeatReturn}`;

                // Gửi song song 2 request, đợi cả 2 hoàn thành
                await Promise.all([axios.put(urlDepart), axios.put(urlReturn)]);
            } else {
                if (!storedIsConnectFlight) {
                    // One-way flight (không nối chuyến)
                    const TypeFlight = storedInforFlight.selectedValue;
                    const url = `http://localhost:4000/codeSeat/fail/${storedInforFlight.item.FlightNumber}?type=${TypeFlight}&seat=${storedInforSeat}`;

                    await axios.put(url);
                } else {
                    // Connect flight (nối chuyến)
                    const TypeFlight1 = dataConnectFlight1.selectedValue;
                    const TypeFlight2 = dataConnectFlight2.selectedValue;

                    const urlConnect1 = `http://localhost:4000/codeSeat/fail/${dataConnectFlight1.item.FlightNumber}?type=${TypeFlight1}&seat=${storedInforSeat}`;
                    const urlConnect2 = `http://localhost:4000/codeSeat/fail/${dataConnectFlight2.item.FlightNumber}?type=${TypeFlight2}&seat=${storedInforSeatReturn}`;

                    await Promise.all([axios.put(urlConnect1), axios.put(urlConnect2)]);
                }
            }

            navigate('/seatBook');
        } catch (error) {
            console.error('Lỗi khi xóa mã ghế:', error);
            toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    useEffect(() => {
        const id = setTimeout(() => {
            handleDeleteCodeSeat();
        }, 300000);
        setTimeoutId(id);

        console.log('bat dau tinh gio');

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className={cx('wrapper_pay')}>
            <Header />

            <div className={cx('contain_pay')}>
                {!show && !timeoutPay && (
                    <div className={cx('wrapper')}>
                        <div className={cx('container')}>
                            <div className={cx('header')}>
                                <img
                                    className={cx('logo-img')}
                                    alt="logo"
                                    src="https://www.flynow.vn/Assets/logo.jpg"
                                />
                                <span>Phiên giao dịch sẽ hết hạn sau : {formatTime(countdown)}</span>
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('information')}>
                                    <div className={cx('supplier')}>
                                        <div className={cx('title')}>
                                            <FontAwesomeIcon className={cx('title-icon')} icon={faHouse} />
                                            <span>Nhà cung cấp </span>
                                        </div>
                                        <span id="plant" className={cx('information-line')}>
                                            {plant}
                                        </span>
                                    </div>
                                    <div className={cx('supplier')}>
                                        <div className={cx('title')}>
                                            <FontAwesomeIcon className={cx('title-icon')} icon={faMoneyBill} />
                                            <span> Số tiền </span>
                                        </div>
                                        <span className={cx('information-line')}>{data00.TotalMoney} VND</span>
                                    </div>
                                </div>
                                <div className={cx('bank-card')}>
                                    <span className={cx('card-title')}>Chi tiết thẻ</span>
                                    <input
                                        id="card-number"
                                        className={cx('input-text')}
                                        value={numberCard}
                                        type="text"
                                        placeholder="Số thẻ"
                                        onChange={onNumberCard}
                                    />
                                    <span id="ip-1" className={cx('title-input')}>
                                        Không được bỏ trống trường này
                                    </span>
                                    <div
                                        className="d-flex align-items-center justify-content-between "
                                        style={{ width: '90%' }}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <input
                                                id="date"
                                                className={cx('input-text')}
                                                autoComplete="off"
                                                maxLength="7"
                                                value={expirationDate}
                                                inputMode="numeric"
                                                type="tel"
                                                placeholder="Ngày hết hạn"
                                                onChange={onExpirationDate}
                                            />
                                            <span id="ip-2" className={cx('title-input')}>
                                                Phải nhập ngày tháng (VD: 01/01)
                                            </span>
                                        </div>
                                        <div>
                                            <input
                                                id="cvv"
                                                className={cx('input-text')}
                                                autoComplete="off"
                                                maxLength="7"
                                                value={cvv}
                                                onChange={onCvv}
                                                inputMode="numeric"
                                                type="tel"
                                                placeholder="Mã bảo mật"
                                                style={{ width: '100%' }}
                                            />
                                            <span id="ip-4" className={cx('title-input')} style={{ width: '100%' }}>
                                                Phải nhập CVV (3 chữ số)
                                            </span>
                                        </div>
                                    </div>
                                    <input
                                        id="name"
                                        className={cx('input-text')}
                                        value={name}
                                        placeholder="Họ tên chủ thẻ"
                                        onChange={onName}
                                    />
                                    <span id="ip-3" className={cx('title-input')}>
                                        Không được bỏ trống
                                    </span>
                                    <div className={cx('submit-btn')}>
                                        <button className={cx('btn', 'return-btn')}>
                                            <span onClick={handleDeleteCodeSeat}>Trở lại</span>
                                        </button>
                                        <button className={cx('btn', 'next-btn')} onClick={handlePay}>
                                            Thanh toán
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {show && (
                    // <div className={cx('animation')}>
                    <GetAllData data={data00} type="get" />
                    // </div>
                )}

                {timeoutPay && !show && <h1>Đã hết thời gian thanh toán</h1>}
                <ToastCustom />
            </div>
        </div>
    );
}

export default Paying;
// "TypeFlight": "OneWay",
//     "TypeTicket" : "EconomyClass",
//     "AirportFrom": "HAN",
//     "AirportTo": "SGN",
//     "FlightTime": "2024-01-01T04:30:00.000Z",
//    "LandingTime": "2024-01-01T06:55:00.000Z",
//    "DateGo": "2024-01-01T00:00:00.000Z",
//    "TotalMoney": 10000000,
//    "CodeTicket": "ERSAF",
//    "FlightNumber":"QH03",
//    "UserName": "Tran Linh",
//    "ID_Card": "21001125",
//    "CodeSeat": "8A",
//    "Email":"linh10a1@gmail.com"

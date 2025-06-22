import classNames from 'classnames/bind';
import styles from './MyFlight.module.scss';
import { useEffect } from 'react';

import { BOOKED_URL } from '../../utils/config';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faEnvelope, faQrcode } from '@fortawesome/free-solid-svg-icons';
import GetAllData from '../GetAllData';
import Header from '../DefaultPage/Header';

import { toast } from 'react-toastify';
import ToastCustom from '../../Toast';
import axios from 'axios';

const cx = classNames.bind(styles);

function MyFlight() {
    const [data, setData] = useState('');
    const [CodeTicket, setCodeTicket] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const [contact, setContact] = useState('');

    async function fetchAPI() {
        try {
            let response = await fetch(`${BOOKED_URL}/search/getInfoBookedBySearch?CodeTicket=${CodeTicket}`);
            console.log(CodeTicket);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data1 = await response.json();

            if (!data1 || !data1.data || data1.data.length === 0) {
                setShowInfo(false);
                toast.error('Mã code không được tìm thấy');
                throw new Error('Not Found');
            }
            setData(data1.data[0]);
            console.log(data);
            setShowInfo(true);
            return data1;
        } catch (error) {
            // Handle the error here
            console.error(error);

            // You can also set an error state or show an error message to the user
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.target.id === 'code') {
            handleSearch();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CodeTicket]);

    const handleSearch = () => {
        if (!CodeTicket || !contact) {
            toast.warn('Vui lòng nhập đầy đủ mã CODE và Email/SDT');
            return;
        }
        fetchAPI();
    };

    const handleDelete = () => {
        const options = document.querySelector('#wrapper-confirm');
        options.style.display = 'flex';
    };

    const handleOptionYes = () => {
        const options = document.querySelector('#wrapper-confirm');
        options.style.display = 'none';

        axios
            .delete(`http://localhost:4000/ticketDetail/${CodeTicket}`)
            .then(() => {
                axios
                    .delete(`http://localhost:4000/info/codeSeat/${CodeTicket}`)
                    .then(() => {
                        toast.success('Hủy vé thành công');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };

    const handleOptionNo = () => {
        const options = document.querySelector('#wrapper-confirm');
        options.style.display = 'none';
    };

    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className="container py-3">
                <div className="row g-2 align-items-center">
                    {/* Mã CODE */}
                    <div className="col-md">
                        <div className="input-group">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faQrcode} />
                            </span>
                            <input
                                type="text"
                                className="form-control shadow-none"
                                placeholder="Mã đặt chỗ / Mã đơn hàng"
                                value={CodeTicket}
                                onChange={(e) => {
                                    setCodeTicket(e.target.value);
                                    setShowInfo(false);
                                }}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                    </div>

                    {/* Email / Số điện thoại */}
                    <div className="col-md">
                        <div className="input-group">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <input
                                type="text"
                                className="form-control shadow-none"
                                placeholder="Email / Số điện thoại"
                                value={contact}
                                onChange={(e) => {
                                    setContact(e.target.value);
                                    setShowInfo(false);
                                }}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                    </div>

                    {/* Nút Xem */}
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick={handleSearch}>
                            Xem
                        </button>
                    </div>

                    {showInfo && (
                        <div className="col-auto">
                            <button className="btn btn-outline-danger" onClick={handleDelete}>
                                <FontAwesomeIcon icon={faBan} /> Hủy
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div id="wrapper-confirm" className={cx('wrapper-confirm')}>
                <div className={cx('overlay')}></div>
                <div className={cx('body')}>
                    <span className={cx('message')}> Bạn có chắc muốn hủy vé {CodeTicket} này không ?</span>
                    <div className={cx('select')}>
                        <button className={cx('select-options')} onClick={handleOptionYes}>
                            Có
                        </button>
                        <button className={cx('select-options')} onClick={handleOptionNo}>
                            Không
                        </button>
                    </div>
                </div>
            </div>

            {showInfo && (
                <div className={cx('show')}>
                    <GetAllData data={data} type="find" />
                </div>
            )}
            <ToastCustom />
        </div>
    );
}

export default MyFlight;

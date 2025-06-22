/* eslint-disable react-hooks/exhaustive-deps */
import styles from './GetAllData.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneArrival, faPlaneDeparture, faPlay } from '@fortawesome/free-solid-svg-icons';
import TableInfo from './TableInfo';
import VNA from '../../asset/images/Vietnam_Airlines.jpg';
import VJ from '../../asset/images/VietJet_Air.png';
import QH from '../../asset/images/bambo.jpg';
import BL from '../../asset/images/Pacific_Airline.png';
import HandlePlace from '../HandlePlace';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);
function GetAllData({ data, className, type }) {
    const [user, setUser] = useState([]);

    console.log(user);

    useEffect(() => {
        if (type === 'get') {
            const timePaying = setTimeout(() => {
                console.log('ban api');
                const fetchData = async () => {
                    await axios.get(`http://localhost:4000/ticketDetail/${data.CodeTicket}`).then((response) => {
                        setUser(response.data.data);
                    });
                };
                fetchData().catch((error) => {
                    console.log(error);
                });
            }, 2000);

            setTimeout(() => {
                clearTimeout(timePaying);
            }, 6000);
        } else if (type === 'find') {
            const timePaying = setTimeout(() => {
                console.log('ban api', data.CodeTicket);
                const fetchData = async () => {
                    await axios.get(`http://localhost:4000/ticketDetail/search/${data.CodeTicket}`).then((response) => {
                        console.log('data2', response);
                        setUser(response.data.data);
                    });
                };
                fetchData().catch((error) => {
                    console.log(error);
                });
            }, 2000);

            setTimeout(() => {
                clearTimeout(timePaying);
            }, 6000);
        }
    }, []);

    const convertDate = (date) => {
        // Tạo date gốc (UTC)
        const dateUtc = new Date(date);
        // Cộng thêm 7 giờ (7*60*60*1000 ms) để sang GMT+7
        const dateConvert = new Date(dateUtc.getTime() + 7 * 60 * 60 * 1000);

        const weekdays = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];
        // Vì dateConvert đã là thời điểm đã +7h, ta có thể dùng GET UTC để lấy thành phần GMT+7
        const weekday = weekdays[dateConvert.getUTCDay()];

        const day = dateConvert.getUTCDate();
        const month = dateConvert.getUTCMonth() + 1; // Tháng zero-based nên cần +1
        const year = dateConvert.getUTCFullYear();

        // Lấy giờ/phút ở GMT+7:
        const hour = dateConvert.getUTCHours();
        // Nếu còn cần giờ chiều gốc (UTC) để so sánh, giữ nguyên hourAfternoon = getUTCHours() ban đầu:
        const hourAfternoon = dateUtc.getUTCHours();
        const minute = dateConvert.getUTCMinutes();

        return {
            weekday: weekday,
            day: day,
            month: month,
            year: year,
            hour: hour,
            hourAfternoon: hourAfternoon,
            minute: minute,
        };
    };

    const dateFlightGo = convertDate(data.FlightTime);
    const dateLandGo = convertDate(data.LandingTime);

    // Tính duration dựa trên giờ/phút đã chuyển (GMT+7)
    const duration = -dateFlightGo.hour * 60 - dateFlightGo.minute + dateLandGo.hour * 60 + dateLandGo.minute;

    const convertDuration = (duration) => {
        let hour = Math.floor(duration / 60);
        const minute = duration % 60;
        console.log(hour, minute);
        return {
            hour: hour,
            minute: minute,
        };
    };

    const checkCompany = (company) => {
        const COMPANY = [
            { name: 'VIETNAM AIRLINES', album: VNA },
            { name: 'BAMBO AIRWAYS', album: QH },
            { name: 'VIETJET AIR', album: VJ },
            { name: 'JETSTAR PACIFIC  AIRLINES', album: BL },
        ];
        if (company.includes('VNA')) return COMPANY[0];
        else if (company.includes('QH')) return COMPANY[1];
        else if (company.includes('VJ')) return COMPANY[2];
        else return COMPANY[3];
    };

    const time = convertDuration(duration);
    const company = checkCompany(data.FlightNumber);

    let time_return, company_return, dateFlightReturn, dateLandReturn, duration_return;

    console.log('data.TypeFlight', data);

    if (data.TypeFlight === 'Roundtrip') {
        dateFlightReturn = convertDate(data.FlightTimeReturn);
        dateLandReturn = convertDate(data.LandingTimeReturn);
        duration_return =
            -dateFlightReturn.hour * 60 - dateFlightReturn.minute + dateLandReturn.hour * 60 + dateLandReturn.minute;
        time_return = convertDuration(duration_return);
        company_return = checkCompany(data.FlightNumberReturn);
    }

    const FormatTime = (dateString) => {
        if (dateString) {
            const date = new Date(dateString);
            const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            return `${hours}:${minutes}`;
        }
        return '';
    };

    const getTimeDiff = (startDate, endDate) => {
        const diffMs = new Date(endDate).getTime() - new Date(startDate).getTime();
        const totalMinutes = Math.floor(diffMs / 1000 / 60);
        return {
            hours: Math.floor(totalMinutes / 60),
            minutes: totalMinutes % 60,
        };
    };

    return (
        // <div className={cx('contain')} >
        <div className={cx('contain')}>
            <h3 className={cx('title')}>THÔNG TIN CHUYẾN BAY CỦA BẠN</h3>

            {user.map((user, index) => {
                return (
                    <div key={index}>
                        <div className={cx('wrapper')}>
                            <div className="mb-1">
                                CHI TIẾT ĐẶT CHỖ CHO: <span className={cx('name')}>{user.UserName}</span>
                            </div>
                            <div>
                                MÃ GIỮ CHỖ: <b className={cx('code_ticket')}>{user.CodeTicket}</b>
                            </div>
                        </div>

                        {data.TypeFlight === 'Roundtrip' && <div className={cx('trip')}>CHUYẾN ĐI</div>}

                        <div className={cx('info')}>
                            <div className={cx('date_wrapper')}>
                                <div>
                                    <FontAwesomeIcon icon={faPlaneDeparture} className={cx('icon')} /> KHỞI HÀNH:{' '}
                                    <span className={cx('date')}>
                                        {dateFlightGo.weekday} NGÀY {dateFlightGo.day} THÁNG {dateFlightGo.month} NĂM{' '}
                                        {dateFlightGo.year}
                                    </span>
                                </div>

                                <div>
                                    <FontAwesomeIcon icon={faPlaneArrival} className={cx('icon')} /> HẠ CÁNH:{' '}
                                    <span className={cx('date')}>
                                        {dateLandGo.weekday} NGÀY {dateLandGo.day} THÁNG {dateLandGo.month} NĂM{' '}
                                        {dateLandGo.year}
                                    </span>
                                </div>
                            </div>
                            <div className={cx('notify')}>Vui lòng kiểm tra thời gian bay trước khi khởi hành</div>

                            <div className={cx('table')}>
                                <div className={cx('company')}>
                                    <div className={cx('company_wrapper')}>
                                        <div>
                                            {company.name}
                                            <div>
                                                <b>{user.FlightNumber}</b>
                                            </div>
                                        </div>
                                        <div>
                                            {' '}
                                            <img src={company.album} alt="Vietnam Airlines" className={cx('image')} />
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        Thời gian bay:{' '}
                                        <div>
                                            {getTimeDiff(user.FlightTime, user.LandingTime).hours}tiếng{' '}
                                            {getTimeDiff(user.FlightTime, user.LandingTime).minutes}phút
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('info_flight')}>
                                    <div className={cx('info_flight_header')}>
                                        <span className="ps-3">
                                            {user.AirportFrom}
                                            <br />
                                            <HandlePlace place={user.AirportFrom} />
                                        </span>
                                        <FontAwesomeIcon icon={faPlay} className={cx('icon_play')} />
                                        <span className="pe-3">
                                            {user.AirportTo}
                                            <br />
                                            <HandlePlace place={user.AirportTo} />
                                        </span>
                                    </div>
                                    <div className={cx('info_flight_body')}>
                                        <div className={cx('depart')}>
                                            <span>
                                                Giờ khởi hành:{' '}
                                                <div className={cx('time')}>
                                                    {' '}
                                                    {/* {dateFlightGo.hour < 10
                                                        ? `0${dateFlightGo.hour}`
                                                        : dateFlightGo.hour}
                                                    :
                                                    {dateFlightGo.minute < 10
                                                        ? `0${dateFlightGo.minute}`
                                                        : dateFlightGo.minute} */}
                                                    {FormatTime(user.FlightTime)}
                                                </div>
                                            </span>
                                        </div>

                                        <div className={cx('return')}>
                                            <span>
                                                Giờ đến:{' '}
                                                <div className={cx('time')}>
                                                    {/* {dateLandGo.hour < 10 ? `0${dateLandGo.hour}` : dateLandGo.hour}:
                                                    {dateLandGo.minute < 10
                                                        ? `0${dateLandGo.minute}`
                                                        : dateLandGo.minute} */}
                                                    {FormatTime(user.LandingTime)}
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <TableInfo UserName={user.UserName} CodeSeat={user.CodeSeat} TypeTicket={user.TypeTicket} />
                        </div>

                        {data.TypeFlight === 'Roundtrip' && (
                            <div className={cx('roundtrip')}>
                                <div className={cx('line')}></div>
                                <div className={cx('trip')}>CHUYẾN VỀ</div>
                                <div className={cx('info')}>
                                    <div className={cx('date_wrapper')}>
                                        <div>
                                            <FontAwesomeIcon icon={faPlaneDeparture} className={cx('icon')} /> KHỞI
                                            HÀNH:{' '}
                                            <span className={cx('date')}>
                                                {dateFlightReturn.weekday} NGÀY {dateFlightReturn.day} THÁNG{' '}
                                                {dateFlightReturn.month} NĂM {dateFlightReturn.year}
                                            </span>
                                        </div>

                                        <div>
                                            <FontAwesomeIcon icon={faPlaneArrival} className={cx('icon')} /> HẠ CÁNH:{' '}
                                            <span className={cx('date')}>
                                                {dateLandReturn.weekday} NGÀY {dateLandReturn.day} THÁNG{' '}
                                                {dateLandReturn.month} NĂM {dateLandReturn.year}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('notify')}>
                                        Vui lòng kiểm tra thời gian bay trước khi khởi hành
                                    </div>

                                    <div className={cx('table')}>
                                        <div className={cx('company')}>
                                            <div className={cx('company_wrapper')}>
                                                <div>
                                                    {company_return.name}
                                                    <div>
                                                        <b>{data.FlightNumberReturn}</b>
                                                    </div>
                                                </div>
                                                <div>
                                                    {' '}
                                                    <img
                                                        src={company_return.album}
                                                        alt="Vietnam Airlines"
                                                        className={cx('image')}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                Thời gian bay:{' '}
                                                <div>
                                                    {time_return.hour}tiếng {time_return.minute}phút
                                                </div>
                                            </div>
                                        </div>

                                        <div className={cx('info_flight')}>
                                            <div className={cx('info_flight_header')}>
                                                <span className="ps-3">
                                                    {data.AirportTo}
                                                    <br />
                                                    <HandlePlace place={data.AirportTo} />
                                                </span>
                                                <FontAwesomeIcon icon={faPlay} className={cx('icon_play')} />
                                                <span className="pe-3">
                                                    {data.AirportFrom}

                                                    <br />
                                                    <HandlePlace place={data.AirportFrom} />
                                                </span>
                                            </div>
                                            <div className={cx('info_flight_body')}>
                                                <div className={cx('depart')}>
                                                    <span>
                                                        Giờ khởi hành:{' '}
                                                        <div className={cx('time')}>
                                                            {/* {' '}
                                                            {dateFlightReturn.hour < 10
                                                                ? `0${dateFlightReturn.hour}`
                                                                : dateFlightReturn.hour}
                                                            :
                                                            {dateFlightReturn.minute < 10
                                                                ? `0${dateFlightReturn.minute}`
                                                                : dateFlightReturn.minute} */}
                                                            {FormatTime(data.FlightTimeReturn)}
                                                        </div>
                                                    </span>
                                                </div>

                                                <div className={cx('return')}>
                                                    <span>
                                                        Giờ đến:{' '}
                                                        <div className={cx('time')}>
                                                            {/* {dateLandReturn.hour < 10
                                                                ? `0${dateLandReturn.hour}`
                                                                : dateLandReturn.hour}
                                                            :
                                                            {dateLandReturn.minute < 10
                                                                ? `0${dateLandReturn.minute}`
                                                                : dateLandReturn.minute} */}
                                                            {FormatTime(data.LandingTimeReturn)}
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <TableInfo
                                        UserName={user.UserName}
                                        CodeSeatReturn={user.CodeSeatReturn}
                                        TypeTicketReturn={data.TypeTicketReturn}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* <div>Tổng tiền: {data.TotalMoney}</div> */}
        </div>
    );
}

export default GetAllData;

/* eslint-disable react-hooks/exhaustive-deps */
// import AirPlane from '../../../asset/images/airplane_0.avif';

import VJ from '../../../asset/images/VietJet_Air.png';
import VNA from '../../../asset/images/Vietnam_Airlines.jpg';
import QH from '../../../asset/images/bambo.jpg';
import BL from '../../../asset/images/Pacific_Airline.png';

import classNames from 'classnames/bind';
import styles from './FlightToday.module.scss';
import { useEffect, useState } from 'react';
import HandlePlace from '../../../component/HandlePlace';
import CheckRole from '../CheckRole';

const cx = classNames.bind(styles);

function FlightToday() {
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const DateGo = getCurrentDate();

    const [data, setData] = useState();
    const valueRole = CheckRole();

    async function fetchAPI() {
        try {
            let response = await fetch(
                `http://localhost:4000/tickets/search/getTicketByTodayOfCompany?DateGo=${DateGo}&AirlineCode=${valueRole.Code}`,
            );

            console.log(DateGo);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data1 = await response.json();
            console.log(data1);

            if (data1 && data1.count !== 0) {
                setData(data1.data);
                console.log('bo m hoi cat');
            }

            return data1;
        } catch (error) {
            // Handle the error here
            console.error(error);

            // You can also set an error state or show an error message to the user
        }
    }

    const convertTime = (time) => {
        const date = new Date(time);
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const formattedDateTime = `${hour}:${minute}`;
        return formattedDateTime;
    };

    const convertMinutesToHourMinute = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        // const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
        let formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;

        if (remainingMinutes === 0) {
            formattedMinutes = '';
            return <span style={{ right: '10px', position: 'absolute' }}>{hours}h</span>;
        } else {
            formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
            return `${hours}h${formattedMinutes}`;
        }
    };

    const allPassenger = (item) => {
        return (
            item.FirstClass.CodeSeat.length +
            item.BusinessClass.CodeSeat.length +
            item.PremiumClass.CodeSeat.length +
            item.EconomyClass.CodeSeat.length
        );
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <>
            <h2 className={cx('title')}>Tất cả chuyến bay ngày hôm nay</h2>

            {data && data.length !== 0 && (
                <div>
                    <div className={cx('field')}>
                        <span>Điểm khởi hành</span>

                        <span className={cx('quantity_people')}>Số người</span>
                    </div>
                    {data.map((item, key) => {
                        return (
                            <div key={item._id} className={cx('container')}>
                                <div className={cx('info')}>
                                    {item.AirlineCode === 'VJ' && (
                                        <img src={VJ} alt="Máy bay" className={cx('image')} />
                                    )}
                                    {item.AirlineCode === 'VNA' && (
                                        <img src={VNA} alt="Máy bay" className={cx('image')} />
                                    )}
                                    {item.AirlineCode === 'QH' && (
                                        <img src={QH} alt="Máy bay" className={cx('image')} />
                                    )}
                                    {item.AirlineCode === 'BL' && (
                                        <img src={BL} alt="Máy bay" className={cx('image')} />
                                    )}

                                    <div className={cx('time')}>
                                        {convertTime(item.FlightTime)}

                                        <HandlePlace place={item.AirportFrom} />
                                    </div>

                                    <div className={cx('line')}>
                                        <div className={cx('duration')}>
                                            {convertMinutesToHourMinute(
                                                // duration(convertTime(item.FlightTime), convertTime(item.LandingTime)),
                                                item.Duration,
                                            )}
                                        </div>
                                    </div>
                                    <div className={cx('time')}>
                                        {convertTime(item.LandingTime)}

                                        <HandlePlace place={item.AirportTo} />
                                    </div>
                                </div>

                                <div className={cx('passenger')}> {allPassenger(item)}</div>
                            </div>
                        );
                    })}
                </div>
            )}

            {(!data || data.length === 0) && <h4>Hôm nay không có chuyến bay</h4>}
        </>
    );
}

export default FlightToday;

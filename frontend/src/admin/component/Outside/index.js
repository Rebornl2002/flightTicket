import Flight3D_2 from '../../../asset/images/Flight3D_2.jpg';
import classNames from 'classnames/bind';
import styles from './Outside.module.scss';
// import { useState, useEffect } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const cx = classNames.bind(styles);

function Outside() {
    // const [formattedDate, setFormattedDate] = useState('');
    // useEffect(() => {
    //     const currentDate = new Date();

    //     const options = { month: 'long', day: 'numeric', year: 'numeric' };
    //     const formattedDateString = currentDate.toLocaleDateString('en-US', options);

    //     setFormattedDate(formattedDateString);
    // }, []);
    return (
        <div className={cx('wrapper')}>
            <img src={Flight3D_2} alt="Máy bay" className={cx('image')} />
            <div className={cx('title')}>
                <h2>Hoạt động hôm nay</h2>
                {/* <p>{formattedDate}</p> */}
            </div>

            <div className={cx('calendar')}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar style={{ width: '100%' }} />
                </LocalizationProvider>
            </div>
        </div>
    );
}

export default Outside;

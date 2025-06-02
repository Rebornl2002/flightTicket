import Sidenav from '../Sidenav';
import Navbar from '../Navbar';
import Box from '@mui/material/Box';
import classNames from 'classnames/bind';
import styles from './MyAccount.module.scss';
import AvatarPeople from '../AvatarPeople';
import { useEffect, useState } from 'react';
import { FormatDate } from '../../../function/FormatDate';

const cx = classNames.bind(styles);

function MyAccount() {
    const storedData = JSON.parse(localStorage.getItem('Login'));
    const [data, setData] = useState({});

    const fetchAPIMyAccount = async () => {
        try {
            let response = await fetch(`http://localhost:4000/login/myaccount?AccountName=${storedData.AccountName}`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data1 = await response.json();
            setData(data1.data[0]);

            return data1.data;
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchAPIMyAccount();
        console.log(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Navbar />
            <Box height={64} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <div className={cx('container')}>
                        {data && (
                            <div className={cx('wrapper')}>
                                <AvatarPeople string={storedData.Name} width="130px" height="130px" fontSize="3.8rem" />

                                <div className={cx('account')}>
                                    <span className={cx('name')}>{data.Name}</span>
                                    <span className={cx('accountName')}>Tên tài khoản: {data.AccountName}</span>
                                    <span className={cx('date')}>Ngày sinh: {FormatDate(data.DayOfBirth)}</span>
                                    <span className={cx('role')}>Chức vụ: {data.Role}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </Box>
            </Box>
        </>
    );
}

export default MyAccount;

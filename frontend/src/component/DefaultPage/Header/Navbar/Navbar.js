import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Navbar() {
    const handleClick = () => {
        localStorage.clear();
        // setTimeout(() => {
        //     window.location.reload(true);
        // }, 1000);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-container')}>
                <ul className={cx('navbar')}>
                    <Link to="/" className={cx('home')} onClick={handleClick}>
                        <li className={cx('navbar-item')}>Trang chủ</li>
                    </Link>

                    <Link to="/myFlight" className={cx('home')}>
                        <li className={cx('navbar-item')}>Tra cứu chuyến bay của tôi</li>
                    </Link>

                    <Link to="/contact" className={cx('home')}>
                        <li className={cx('navbar-item')}>Liên hệ</li>
                    </Link>

                    {/* <Link to="/cancelTicket" className={cx('home')}>
                        <li className={cx('navbar-item')}>Hủy vé</li>
                    </Link> */}
                </ul>

                <Link to="/signin" className={cx('home')}>
                    <span className={cx('login')}>Đăng nhập</span>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;

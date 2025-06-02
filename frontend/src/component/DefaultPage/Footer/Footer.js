import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("infor")}>
          <h6>Liên hệ</h6>
          <div className={cx("info-content")}>
            <FontAwesomeIcon icon={faLocationDot} />
            <span className={cx("infor-title")}>
              141 Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội
            </span>
          </div>
          <div className={cx("info-content")}>
            <FontAwesomeIcon icon={faPhone} />
            <span className={cx("infor-title")}>
              1900 6432 | 024 3726 5463 | (024/028) 7300 1133
            </span>
          </div>
          <div className={cx("info-content")}>
            <FontAwesomeIcon icon={faEnvelope} />
            <span className={cx("infor-title")}>booking@flynow.vn</span>
          </div>
        </div>
        <div className={cx("necessary-information")}>
          <ul className={cx("nec-infor-list")}>
            <h6>Quy định khi bay</h6>
            <li className={cx("nec-infor-item")}>
              <a
                href="https://vietjet.asia/cam-nang-bay-vietjet/thu-tuc-di-may-bay-cho-nguoi-di-lan-dau.html"
                className={cx("nec-infor-link")}
              >
                Thủ tục cho người đi máy bay lần đầu
              </a>
            </li>
            <li className={cx("nec-infor-item")}>
              <a
                href="https://gocheap.vn/travel/quy-djinh-can-biet-ve-hanh-ly-khi-dji-may-bay"
                className={cx("nec-infor-link")}
              >
                Quy định cần biết về hành lý được mang lên máy bay
              </a>
            </li>
            <li className={cx("nec-infor-item")}>
              <a
                href="https://vinpearl.com/vi/5-kinh-nghiem-cho-nguoi-lan-dau-di-may-bay"
                className={cx("nec-infor-link")}
              >
                5 kinh nghiệm cho người lần đầu đi máy bay
              </a>
            </li>
            <li className={cx("nec-infor-item")}>
              <a
                href="https://vietnamembassy-seoul.org/quy-dinh-di-may-bay-voi-ba-bau/"
                className={cx("nec-infor-link")}
              >
                Quy định cần biết khi đi máy bay với bà bầu
              </a>
            </li>
            <li className={cx("nec-infor-item")}>
              <a
                href="https://www.traveloka.com/vi-vn/explore/tips/tre-em-di-may-bay-can-giay-to-gi/58101"
                className={cx("nec-infor-link")}
              >
                Trẻ em đi máy bay cần giấy tờ gì?
              </a>
            </li>
            <li className={cx("nec-infor-item")}>
              <a
                href="https://vinpearl.com/vi/tra-cuu-quy-dinh-bay-noi-dia-cua-cac-hang-hang-khong-viet-nam-2023"
                className={cx("nec-infor-link")}
              >
                Tra cứu quy định bay nội địa của các hãng hàng không Việt Nam
              </a>
            </li>
          </ul>
        </div>
        <div className={cx("social-network")}>
          <h6>Kết nối với chúng tôi</h6>
          <div className={cx("network-item")}>
            <a
              href="https://www.facebook.com/profile.php?id=100028348214526"
              className={cx("network-link")}
            >
              <img
                className={cx("networkk-img")}
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="anh-facebook"
              />
            </a>
          </div>
          <div className={cx("network-item")}>
            <a
              href="https://www.facebook.com/profile.php?id=100028348214526"
              className={cx("network-link")}
            >
              <img
                className={cx("networkk-img")}
                src="http://cungbay.vn/image/fG.png"
                alt="anh-youtube"
              />
            </a>
          </div>
          <div className={cx("network-item")}>
            <a
              href="https://www.facebook.com/profile.php?id=100028348214526"
              className={cx("network-link")}
            >
              <img
                className={cx("networkk-img")}
                src="http://cungbay.vn/image/fI.png"
                alt="anh-youtube"
              />
            </a>
          </div>
          <div className={cx("network-item")}>
            <a
              href="https://www.facebook.com/profile.php?id=100028348214526"
              className={cx("network-link")}
            >
              <img
                className={cx("networkk-img")}
                src="http://cungbay.vn/image/fI2.png"
                alt="anh-logo-chim"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

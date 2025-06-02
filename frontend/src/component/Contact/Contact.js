import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import Header from "../DefaultPage/Header";
import img from "../../../src/asset/images/map.jpg";
import Footer from "../DefaultPage/Footer";

const cx = classNames.bind(styles);

function Contact() {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("img-map")}>
        <a
          className={cx("img-link")}
          href="https://www.google.com/maps/@20.9809004,105.7962207,17z?entry=ttu"
        >
          <img className={cx("img")} src={img} alt="loacted" />
        </a>
      </div>
      <div className={cx("information")}>
        <div className={cx("information-list")}>
          <ul>
            <h6 className={cx("information-titles")}>Văn phòng Hà Nội:</h6>
            <li className={cx("information-item")}>
              141 Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội
            </li>
          </ul>
          <ul>
            <h6 className={cx("information-titles")}>THÔNG TIN LIÊN HỆ: </h6>
            <li className={cx("information-item")}>
              Điện thoại: (024/028) 7300 1133
            </li>
            <li className={cx("information-item")}>Fax : 024 3726 5463</li>
            <li className={cx("information-item")}>Hotline : 1900 6432</li>
            <li className={cx("information-item")}>
              Email : booking@flynow.vn
            </li>
          </ul>
          <ul>
            <h6 className={cx("information-titles")}>THỜI GIAN LÀM VIỆC </h6>
            <li className={cx("information-item")}>
              Thứ 2 - Thứ 7 : Từ 7h45 - 21h00
            </li>
            <li className={cx("information-item")}>
              Chủ nhật : Từ 8h00 - 20h30
            </li>
            <li className={cx("information-item")}>
              Ngày lễ : Từ 8h00 - 17h30
            </li>
          </ul>
        </div>
        <span>
          Cảm ơn quý khách đã ghé thăm Flynow! Nếu quý khách có nhu cầu trao
          đổi, liên hệ với chúng tôi vui lòng liên hệ theo địa chỉ Văn phòng Hà
          nội.
        </span>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;

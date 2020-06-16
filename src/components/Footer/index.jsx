import React, { useState } from 'react'
import './style.scss';
import logoFooter from './../../assets/logo_footer.png';
import { Link } from 'react-router-dom';
import BackToTop from '../BackToTop';
function Footer(props) {
    const [email, setEmail] = useState('');

    const handleChangeMailSubscribe = (e) => {
        setEmail(e.target.value);
    }
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        console.log(email);
    }
    return (
        <>
            <footer className="footer">
                <div className="container-fluid footer__content">
                    <div className="footer-top">
                        <div className="footer-top__logo">
                            <Link to="/">
                                <img src={logoFooter} alt="" />
                            </Link>
                        </div>
                        <div className="footer-top__info">
                            <h4 className="footer-title">
                                <span>THE FIRE MONKEY - 100% AUTHENTIC</span>
                            </h4>
                            <ul>
                                <li>
                                    Địa chỉ: Đông Anh – Hà Nội
							    </li>
                                <li>
                                    Hotline: <a href="tel:0983151780">0983 151 780</a>
                                </li>
                                <li>
                                    Email: <a href="mailto:TFM3017@gmail.com">TFM3017@gmail.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-widget">
                        <div className="footer-widget-item">
                            <h4 className="footer-title">
                                <span>Giới thiệu</span>
                            </h4>
                            <ul className="list-menu">

                                <li>
                                    <a href="/huong-dan" title="Hướng dẫn mua hàng">
                                        Hướng dẫn mua hàng
						</a>
                                </li>

                                <li>
                                    <a href="/huong-dan" title="Hướng dẫn thanh toán">
                                        Hướng dẫn thanh toán
						</a>
                                </li>

                                <li>
                                    <a href="/huong-dan" title="Hướng dẫn giao nhận">
                                        Hướng dẫn giao nhận
						</a>
                                </li>

                                <li>
                                    <a href="/dieu-khoan" title="Điều khoản dịch vụ">
                                        Điều khoản dịch vụ
						</a>
                                </li>

                            </ul>
                        </div>
                        <div className="footer-widget-item">
                            <h4 className="footer-title">
                                <span>Chính sách</span>
                            </h4>
                            <ul className="list-menu">

                                <li>
                                    <a href="/chinh-sach" title="Chính sách bảo mật">
                                        Chính sách bảo mật
						</a>
                                </li>

                                <li>
                                    <a href="/chinh-sach" title="Chính sách vận chuyển">
                                        Chính sách vận chuyển
						</a>
                                </li>

                                <li>
                                    <a href="/chinh-sach" title="Chính sách đổi trả">
                                        Chính sách đổi trả
						</a>
                                </li>

                                <li>
                                    <a href="/dieu-khoan" title="Quy định sử dụng">
                                        Quy định sử dụng
						</a>
                                </li>

                            </ul>
                        </div>
                        <div className="footer-widget-item">
                            <h4 className="footer-title">
                                <span>Hỗ trợ</span>
                            </h4>
                            <div style={{ fontSize: '13px' }}>
                                Tư vấn 24/7, hiện tại cửa hàng đang sửa chữa mặt bằng nên chỉ bán online
				        </div>

                        </div>
                        <div className="footer-widget-item">
                            <h4 className="footer-title">
                                <span>Kết nối chúng tôi</span>
                            </h4>
                            <ul className="footer-social social-icons">

                                <li>
                                    <a className="flex jf-al-center txt-facebook hv-bg-facebook hv-bd-facebook" href="https://www.facebook.com/thefiremonkey.vn" rel="noopener noreferrer nofollow" target="_blank">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </li>

                                <li>
                                    <a className="flex jf-al-center txt-twitter hv-bg-twitter hv-bd-twitter" href="https://www.facebook.com/thefiremonkey.vn" rel="noopener noreferrer nofollow" target="_blank">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>

                                <li>
                                    <a className="flex jf-al-center txt-google-plus hv-bg-google-plus hv-bd-google-plus" href="https://www.facebook.com/thefiremonkey.vn" rel="noopener noreferrer nofollow" target="_blank">
                                        <i className="fab fa-google-plus-g"></i>
                                    </a>
                                </li>

                                <li>
                                    <a className="flex jf-al-center txt-youtube hv-bg-youtube hv-bd-youtube" href="https://www.facebook.com/thefiremonkey.vn" rel="noopener noreferrer nofollow" target="_blank">
                                        <i className="fab fa-youtube"></i>
                                    </a>
                                </li>

                                <li>
                                    <a className="flex jf-al-center txt-instagram hv-bg-instagram hv-bd-instagram" href="https://www.instagram.com/tfm.vn/" rel="noopener noreferrer nofollow" target="_blank">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </li>

                            </ul>

                            <h4 className="footer-title">
                                <span>Nhận tin khuyến mãi</span>
                            </h4>
                            <div className="subscribe_form">
                                <button
                                    onClick={handleSubmitEmail}
                                    className="btn btn-subscribe"
                                    name="subscribe"
                                    id="subscribe"
                                >
                                    <i className="fa fa-paper-plane"></i>
                                </button>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleChangeMailSubscribe}
                                    autoComplete="off"
                                    placeholder="Email của bạn"
                                    name="email"
                                    id="mail"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
            <div className="copy-right">
                <span>Bản quyền thuốc về THE FIRE MONKEY</span>
                <span>|</span>
                <span>Clone by <strong style={{ color: '#00a0d1' }}>Chiến Royal</strong></span>
            </div>
            <BackToTop />
        </>
    )
}
export default Footer


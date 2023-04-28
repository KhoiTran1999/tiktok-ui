import React from 'react';
import classNames from 'classnames/bind';
import style from './NotFound.module.scss';
import Header from '../Header/Header';
import { Button } from '../ReusedComponent';
import Footer from '../ReusedComponent/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className={cx('notFound')}>
            <Header className={cx('profile-container-header')} />
            <div className={cx('body')}>
                <div className={cx('code404')}>
                    <span>4</span>
                    <img
                        src="https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/site/static/webapp-static-site/bbad6f99219877ac47f9.png"
                        alt="smile icon"
                    />
                    <span>4</span>
                </div>
                <div className={cx('cannotFind')}>
                    <p>Couldn't find this page</p>
                </div>
                <div className={cx('checkout')}>
                    <p>Check out more trending videos on TikTok</p>
                    <Button primary large style={{ marginTop: '20px', width: '360px' }} onClick={() => navigate('/')}>
                        <i className="fa-solid fa-play"></i>
                        Watch now
                    </Button>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('container')}>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default NotFound;

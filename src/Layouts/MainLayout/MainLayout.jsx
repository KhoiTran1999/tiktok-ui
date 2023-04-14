import classNames from 'classnames/bind';
import React from 'react';
import MainContent from '../../components/MainContent/MainContent';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import style from './MainLayout.module.scss';
import { useState } from 'react';

const cx = classNames.bind(style);
const MainLayout = () => {
    const [showButton, setShowButton] = useState(false);

    window.onscroll = () => {
        if (document.documentElement.scrollTop >= 100) setShowButton(true);
        else setShowButton(false);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div>
            <Header />
            <main>
                <div className="container">
                    <div className={cx('row')}>
                        <Sidebar />
                        <MainContent />
                    </div>
                </div>

                <button
                    onClick={scrollToTop}
                    className={cx('scroll-to-top', {
                        'scroll-to-top-ui': showButton,
                    })}
                >
                    <i className="fa-solid fa-forward-step"></i>
                </button>
            </main>
        </div>
    );
};

export default MainLayout;

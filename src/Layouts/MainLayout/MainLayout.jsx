import classNames from 'classnames/bind';
import React from 'react';
import { ModalSign } from '../../components/DetailComponent';
import Foryou from '../../components/Foryou/Foryou';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import style from './MainLayout.module.scss';

const cx = classNames.bind(style);
const MainLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <div className="container">
                    <div className={cx('row')}>
                        <Sidebar />
                        <Foryou />
                    </div>
                </div>
            </main>
            {/* <ModalSign /> */}
        </div>
    );
};

export default MainLayout;

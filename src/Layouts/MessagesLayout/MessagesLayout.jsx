import React, { useEffect } from 'react';
import classNames from 'classnames/bind';

import style from './MessagesLayout.module.scss';
import Header from '../../components/Header/Header';
import Messages from '../../components/Messages/Messages';

const cx = classNames.bind(style);
const MessagesLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <Messages />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MessagesLayout;

import React from 'react';
import classNames from 'classnames/bind';
import style from './MainContent.module.scss';
import ListContent from './ListContent/ListContent';

const cx = classNames.bind(style);
const MainContent = () => {
    return (
        <div className={cx('mainContent')}>
            <ListContent />
        </div>
    );
};

export default MainContent;

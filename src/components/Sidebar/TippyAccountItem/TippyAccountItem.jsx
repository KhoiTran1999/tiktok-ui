import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import routes from '../../../config/routes';
import ImageCustom from '../../DetailComponent/ImageCustom';
import style from './TippyAccountItem.module.scss';
import SubnavWrapper from '../../DetailComponent/SubnavWrapper';

const cx = classNames.bind(style);
const TippyAccountItem = ({ data = [] }) => {
    return (
        <div className={cx('Account-list')}>
            <ul>
                {data.map((val, idx) => {
                    return (
                        <Tippy
                            key={val.id}
                            render={(attrs) => {
                                <SubnavWrapper>
                                    <p>khoitran</p>
                                </SubnavWrapper>;
                            }}
                        >
                            <li key={val.id}>
                                <Link to={`${routes.profile}${val.nickname}`}>
                                    <ImageCustom src={val.avatar} alt="avatar" />
                                    <div className={cx('information')}>
                                        <span className={cx('nickname')}>{val.nickname}</span>
                                        {val.tick && <i className={cx('fa-solid fa-circle-check', 'check')}></i>}
                                        <div className={cx('name')}>{val.full_name}</div>
                                    </div>
                                </Link>
                            </li>
                        </Tippy>
                    );
                })}
            </ul>
        </div>
    );
};

export default TippyAccountItem;

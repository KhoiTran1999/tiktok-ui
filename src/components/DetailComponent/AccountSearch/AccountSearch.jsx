import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import ImageCustom from '../ImageCustom';
import style from './AccountSearch.module.scss';

const cx = classNames.bind(style);
const AccountSearch = ({ data = [] }) => {
    return (
        <div className={cx('Account-list')}>
            <ul>
                {data.map((val, idx) => {
                    return (
                        <li key={val.id}>
                            <Link to={`${routes.profile}${val.nickname}`}>
                                <ImageCustom src={val.avatar} alt="avatar" />
                                <div className={cx('information')}>
                                    <h4 className={cx('nickname')}>{val.nickname}</h4>
                                    {val.tick && <i className={cx('fa-solid fa-circle-check', 'check')}></i>}
                                    <p className={cx('name')}>{val.full_name}</p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AccountSearch;

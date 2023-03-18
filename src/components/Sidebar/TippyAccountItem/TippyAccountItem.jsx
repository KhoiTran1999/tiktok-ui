import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import routes from '../../../config/routes';
import ImageCustom from '../../DetailComponent/ImageCustom';
import style from './TippyAccountItem.module.scss';
import SubnavWrapper from '../../DetailComponent/SubnavWrapper';
import Button from '../../DetailComponent/Button/Button';
import { useSelector } from 'react-redux';
import { UserSelector } from '../../../redux/selector';

const cx = classNames.bind(style);
const TippyAccountItem = ({ data = [] }) => {
    const user = useSelector(UserSelector);

    return (
        <div className={cx('Account-list-sidebar')}>
            <ul>
                {data.map((val, idx) => {
                    return (
                        <li key={val.id}>
                            <Tippy
                                delay={[1000, 0]}
                                offset={[0, 0]}
                                appendTo={document.querySelector(`.${cx('Account-list-sidebar')}`)}
                                interactive
                                placement="bottom-start"
                                render={(attrs) => (
                                    <SubnavWrapper>
                                        <div className={cx('wrapper')}>
                                            <div className={cx('header')}>
                                                <img src={val.avatar} alt="avatar" />
                                                <Button primary medium>
                                                    Follow
                                                </Button>
                                            </div>
                                            <div className={cx('content')}>
                                                <div className={cx('wrap')}>
                                                    <h4>{val.nickname}</h4>
                                                    {val.tick && (
                                                        <i className={cx('fa-solid fa-circle-check', 'check')}></i>
                                                    )}
                                                </div>
                                                <p className={cx('name')}>{val.full_name}</p>
                                                <p className={cx('status')}>
                                                    <b>{val.followers_count}</b> Followers <b>{val.likes_count}</b>{' '}
                                                    Likes
                                                </p>
                                            </div>
                                        </div>
                                    </SubnavWrapper>
                                )}
                            >
                                <Link to={`${routes.profile}${val.nickname}`}>
                                    <div
                                        className={cx('avatar', {
                                            skeletonLoading: user.login === null,
                                        })}
                                    >
                                        <ImageCustom src={val.avatar} alt="avatar" />
                                    </div>
                                    <div className={cx('information')}>
                                        <div
                                            className={cx('nickname', {
                                                skeletonLoading: user.login === null,
                                            })}
                                        >
                                            {val.nickname}
                                        </div>
                                        {val.tick && <i className={cx('fa-solid fa-circle-check', 'check')}></i>}
                                        <div
                                            className={cx('name', {
                                                skeletonLoading: user.login === null,
                                            })}
                                        >
                                            {val.full_name}
                                        </div>
                                    </div>
                                </Link>
                            </Tippy>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TippyAccountItem;

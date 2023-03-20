import React from 'react';
import classNames from 'classnames/bind';
import style from './GuestChatItem.module.scss';
import images from '../../../../../assets/images';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(style);
const GuestChatItem = () => {
    return (
        <li className={cx('guestChatItem')}>
            <div className={cx('wrapper')}>
                <div className={cx('avatar')}>
                    <img src={images.imgGaiXinh} alt="avatar" />
                </div>
                <div className={cx('message')}>
                    <p>cảm ơn em nhiệukdfhậkdfhà ádfk ákfdj ádfkjádfkjs ádfádf ádfsadfádf sadf sadfádfsa</p>
                </div>

                <Tippy
                    content={
                        <ul style={{ display: 'flex', padding: '7px', fontSize: '12px' }} className={cx('more')}>
                            <li style={{ cursor: 'pointer' }}>
                                <span>Like</span>
                            </li>
                            <li style={{ margin: '0px 10px', cursor: 'pointer' }}>
                                <span>Delete</span>
                            </li>
                            <li style={{ cursor: 'pointer' }}>
                                <span>Report</span>
                            </li>
                        </ul>
                    }
                    interactive
                >
                    <div className={cx('iconMore')}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                </Tippy>
            </div>
        </li>
    );
};

export default GuestChatItem;

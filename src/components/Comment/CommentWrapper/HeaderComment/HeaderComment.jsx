import React from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import style from './HeaderComment.module.scss';
import images from '../../../../assets/images';
import Button from '../../../../components/ReusedComponent/Button';
import { Menu, SubnavWrapper, Wrapper } from '../../../ReusedComponent';

const cx = classNames.bind(style);
const HeaderComment = () => {
    const MenuShare = [
        {
            icon: <i className="fa-brands fa-linkedin-in"></i>,
            title: 'Share to Linkedln',
        },
        {
            icon: <i className="fa-brands fa-reddit-alien"></i>,
            title: 'Share to Reddit',
        },
        {
            icon: <i className="fa-brands fa-telegram"></i>,
            title: 'Share to Telegram',
        },
        {
            icon: <i className="fa-solid fa-envelope"></i>,
            title: 'Share to Email',
        },
        {
            icon: <i className="fa-brands fa-line"></i>,
            title: 'Share to Line',
        },
        {
            icon: <i className="fa-brands fa-pinterest"></i>,
            title: 'Share to Pinterest',
        },
    ];
    return (
        <div className={cx('header-comment')}>
            <div className={cx('header-comment-avatar')}>
                <div className={cx('infor')}>
                    <div className={cx('avatar')}>
                        <img src={images.imgGaiXinh2} alt="" />
                    </div>
                    <div className={cx('wrapper-nickName')}>
                        <div className={cx('wrap')}>
                            <span className={cx('nickName')}>_veebe</span>
                            <span className={cx('tick')}>
                                <i className={cx('fa-solid fa-circle-check', 'check')}></i>
                            </span>
                        </div>
                        <div className={cx('wrap')}>
                            <span className={cx('displayName')}>Beevee</span>
                            <span> · </span>
                            <span className={cx('createdAt')}>2d ago</span>
                        </div>
                    </div>
                </div>
                <Button outline medium>
                    Follow
                </Button>
            </div>
            <div className={cx('title')}>Giọng ngoài đời cũng ko chua lắm ạ ~~~~</div>
            <div className={cx('music')}>
                <i className="fa-solid fa-music"></i>
                nhạc nền - Đạt Villa
            </div>
            <div className={cx('like-share')}>
                <div className={cx('like-wrap')}>
                    <div className={cx('heart')}>
                        <i className="fa-solid fa-heart"></i>
                    </div>
                    <span>99.4k</span>
                    <div className={cx('comment')}>
                        <i className="fa-solid fa-comment-dots"></i>
                    </div>
                    <span>5492</span>
                </div>
                <ul className={cx('share-wrap')}>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>Embed</Wrapper>}>
                        <li className={cx('embed')}>
                            <i className="fa-solid fa-code"></i>
                        </li>
                    </Tippy>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>Send to friends</Wrapper>}>
                        <li className={cx('send')}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </li>
                    </Tippy>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>Share to Facebook</Wrapper>}>
                        <li className={cx('facebook')}>
                            <i className="fa-brands fa-facebook"></i>
                        </li>
                    </Tippy>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>Share to Whatsapp</Wrapper>}>
                        <li className={cx('whatsapp')}>
                            <i className="fa-brands fa-whatsapp"></i>
                        </li>
                    </Tippy>
                    <Tippy placement="bottom" render={(attrs) => <Wrapper>Share to Twitter</Wrapper>}>
                        <li className={cx('twitter')}>
                            <i className="fa-brands fa-twitter"></i>
                        </li>
                    </Tippy>
                    <Tippy
                        delay={[0, 500]}
                        placement="bottom"
                        interactive
                        render={(attrs) => (
                            <div className={cx('menu-share')}>
                                {MenuShare.map((val, idx) => (
                                    <div key={idx}>
                                        {val.icon}
                                        <h4>{val.title}</h4>
                                    </div>
                                ))}
                            </div>
                        )}
                    >
                        <li style={{ marginRight: '0px' }} className={cx('share')}>
                            <i className="fa-solid fa-share"></i>
                        </li>
                    </Tippy>
                </ul>
            </div>
            <div className={cx('copy-link')}>
                <p className={cx('link')}>https://www.tiktok.com/@oanhalee411/video/7206927491183807771</p>
                <button className={cx('button-copy')}>Copy Link</button>
            </div>
        </div>
    );
};

export default HeaderComment;

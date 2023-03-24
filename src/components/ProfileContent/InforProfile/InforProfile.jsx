import React from 'react';
import classNames from 'classnames/bind';
import style from './InforProfile.module.scss';
import { Button, ImageCustom } from '../../DetailComponent';
import images from '../../../assets/images';

const cx = classNames.bind(style);
const InforProfile = () => {
    return (
        <div className={cx('infor')}>
            <div className={cx('header-infor')}>
                <div className={cx('avatar')}>
                    <ImageCustom src={images.imgGaiXinh} />
                </div>
                <div className={cx('left-headerInfor')}>
                    <div className={cx('wrapper')}>
                        <h2 className={cx('nickName')}>tranthanh123</h2>
                        <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <h1 className={cx('displayName')}>Trấn Thành</h1>
                    <Button primary large className={cx('followButton')}>
                        Follow
                    </Button>
                </div>
            </div>
            <div className={cx('footer-infor')}>
                <p className={cx('status')}>
                    <b>24</b> Followings <b>6.5M</b> Followers <b>40.1M</b> Likes
                </p>
                <p className={cx('bio')}>Xê! Follow anh nha mấy đứa hay ra dẻ</p>
                <div className={cx('websiteURL')}>
                    <i className="fa-solid fa-link"></i>
                    <a href="https://www.facebook.com/duonglamshowbiz" target="_blank">
                        www.facebook.com/duonglamshowbiz
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InforProfile;

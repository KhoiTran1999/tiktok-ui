import React from 'react';
import classNames from 'classnames/bind';
import style from './Discover.module.scss';
import { Button } from '../../ReusedComponent';

const cx = classNames.bind(style);
const Discover = () => {
    return (
        <div className={cx('discover')}>
            <span className={cx('title')}>Discover</span>
            <div className={cx('hash-tags')}>
                <Button basic hashTag>
                    <i className="fa-solid fa-hashtag"></i>
                    suthatla
                </Button>

                <Button basic hashTag>
                    <i className="fa-solid fa-hashtag"></i>
                    mackedoi
                </Button>

                <Button basic hashTag>
                    <i className="fa-solid fa-hashtag"></i>
                    sansangthaydoi
                </Button>

                <Button basic hashTag>
                    <i className="fa-solid fa-music"></i>
                    Yêu Đơn Phương Là Gì (MEE Remix) Mee Media & h0n & BHMedia
                </Button>

                <Button basic hashTag>
                    <i className="fa-solid fa-music"></i>
                    Về Nghe Mẹ Ru NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàng
                </Button>

                <Button basic hashTag>
                    <i className="fa-solid fa-music"></i>
                    Thiên Thần Tình Yêu RICKY STAR
                </Button>

                <Button basic hashTag>
                    <i className="fa-solid fa-hashtag"></i>
                    #7749hieuung
                </Button>

                <Button basic hashTag>
                    <i className="fa-solid fa-hashtag"></i>
                    genzlife
                </Button>

                <Button basic hashTag>
                    <i className="fa-solid fa-music"></i>
                    Tình Đã Đầy Một Tim Huyền Tâm Môn
                </Button>

                <Button basic hashTag>
                    <i className="fa-solid fa-music"></i>
                    Thằng Hầu (Thái Hoàng Remix) [Short Version]
                </Button>
            </div>
        </div>
    );
};

export default Discover;

import React from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import style from './Commenter.module.scss';
import images from '../../../../../assets/images';

const cx = classNames.bind(style);
const Commenter = () => {
    return (
        <div className={cx('commenter')}>
            <div className={cx('infor')}>
                <div className={cx('avatar')}>
                    <img src={images.imgGaiXinh2} alt="avatar" />
                </div>
                <div className={cx('infor-user')}>
                    <div className={cx('nickName-wrap')}>
                        <div className={cx('nickName')}>Ngọc Quỳnh</div>
                        <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <div className={cx('text')}>sao không ai tim vậy</div>
                    <div className={cx('createdAt-wrap')}>
                        <div className={cx('createdAt')}>20h ago</div>
                        <div className={cx('reply')}>Reply</div>
                    </div>
                </div>
            </div>
            <div className={cx('likes')}>
                <Tippy
                    delay={[0, 200]}
                    placement="bottom-end"
                    interactive
                    render={(attrs) => (
                        <div className={cx('report-wrap')}>
                            <i className="fa-regular fa-flag"></i>
                            <span>Report</span>
                        </div>
                    )}
                >
                    <i className={cx('fa-solid fa-ellipsis', 'report')}></i>
                </Tippy>
                <i className={cx('fa-regular fa-heart', 'heart')}></i>
                <span>59</span>
            </div>
        </div>
    );
};

export default Commenter;

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './ModalSign.module.scss';
import { Button } from '../index';

const cx = classNames.bind(style);
const ModalSign = ({ isActiveLogin, setIsActiveLogin }) => {
    const handleEscape = () => {
        setIsActiveLogin(false);
    };

    return (
        <div
            className={cx('wrapper', {
                active: isActiveLogin,
            })}
        >
            <div
                className={cx('modal-sign', {
                    active: isActiveLogin,
                })}
            >
                <div className={cx('escape')} onClick={handleEscape}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className={cx('wrap-content')}>
                    <h2>Get more of what you love when you log in to TikTok</h2>
                    <ul>
                        <li>
                            <Button outline large>
                                Use QR code
                            </Button>
                        </li>
                        <li>
                            <Button outline large>
                                Use QR code
                            </Button>
                        </li>
                        <li>
                            <Button outline large>
                                Use QR code
                            </Button>
                        </li>
                        <li>
                            <Button outline large>
                                Use QR code
                            </Button>
                        </li>
                        <li>
                            <Button outline large>
                                Use QR code
                            </Button>
                        </li>
                        <li>
                            <Button outline large>
                                Use QR code
                            </Button>
                        </li>
                        <li>
                            <Button outline large>
                                Use QR code
                            </Button>
                        </li>
                        <li>
                            <Button outline large>
                                Use QR code
                            </Button>
                        </li>
                        <li>
                            <Button outline large>
                                Use QR code
                            </Button>
                        </li>
                    </ul>
                </div>
                <div className={cx('sign-up')}>
                    <span>Don’t have an account?</span>
                    <a href="">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default ModalSign;

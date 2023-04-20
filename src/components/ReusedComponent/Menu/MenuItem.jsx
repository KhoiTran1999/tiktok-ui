import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import style from './Menu.module.scss';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DarkModeSelector } from '../../../redux/selector';
import DarkModeSlice from '../../Header/RightHeader/DarkModeSlice';
import Share from '../Share/Share';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);
const MenuItem = ({ data, onAccess, onLogout, video, userVideo }) => {
    const { i18n } = useTranslation();

    const dispatch = useDispatch();

    const darkMode = useSelector(DarkModeSelector);

    //-----------------Languages---------------
    const handleOnclick = (idx, action, code, to, title) => {
        //handle entry and go back from menu
        onAccess(idx);

        //handle click logout
        if (action === 'logout') onLogout();

        //Change language
        if (code === 'vi' && i18n.language !== 'vi') {
            i18n.changeLanguage('vi');
            localStorage.setItem('language', JSON.stringify('vi'));
            window.location.reload();
        } else if (code === 'en' && i18n.language !== 'en') {
            i18n.changeLanguage('en');
            localStorage.setItem('language', JSON.stringify('en'));
            window.location.reload();
        }

        //Handl Copy link
        if (title === 'Copy link') {
            if (window.location.href.includes('profile')) {
                navigator.clipboard.writeText(encodeURI(window.location.href));
            } else
                navigator.clipboard.writeText(
                    encodeURI(`${window.location.href}profile/${userVideo?.nickName}/${video?.id}`),
                );

            toast.success('Copied', {
                position: 'top-center',
                autoClose: 2000,
                theme: 'light',
                toastId: idx,
                containerId: 'PuredToast',
            });
        }
    };

    //---------------------------------------

    const handleDarkMode = () => {
        dispatch(DarkModeSlice.actions.setDarkMode(!darkMode));
        localStorage.setItem('darkMode', !darkMode);
    };

    //Dark mode handle
    useEffect(() => {
        let root = document.documentElement;
        if (darkMode) {
            root.style.setProperty('--background-color', 'rgb(18, 18, 18)');
            root.style.setProperty('--background-color-subnav', 'rgb(37, 37, 37)');
            root.style.setProperty('--background-color-search', 'rgb(37, 37, 37)');
            root.style.setProperty('--line', 'rgba(255, 255, 255, 0.2)');
            root.style.setProperty('--text', 'rgba(255, 255, 255, 0.9)');
        } else {
            root.style.setProperty('--background-color', 'white');
            root.style.setProperty('--background-color-subnav', 'white');
            root.style.setProperty('--background-color-search', '#F1F1F2');
            root.style.setProperty('--line', 'rgb(235, 234, 234)');
            root.style.setProperty('--text', 'rgba(22, 24, 35, 1)');
        }
    }, [darkMode]);
    return (
        <>
            {data.map((val, idx) => {
                return (
                    <li key={idx} onClick={() => handleOnclick(idx, val.action, val.code, val.to, val.title)}>
                        <Share
                            title={val.title}
                            mediaLink={video?.thumbnail}
                            url={
                                window.location.href.includes('profile')
                                    ? encodeURI(`${window.location.href}`)
                                    : encodeURI(`${window.location.href}profile/${userVideo?.nickName}/${video?.id}`)
                            }
                        >
                            <Button text to={val.to}>
                                <>
                                    {val.dropDown && <h2>{val.dropDown}</h2>}
                                    <span>{val.icon}</span>
                                    <h4>{val.title}</h4>
                                </>
                            </Button>
                            {val.title === 'Dark mode' || val.title === 'Chế độ tối' ? (
                                <div
                                    onClick={handleDarkMode}
                                    className={cx('dark-mode', {
                                        active: darkMode,
                                    })}
                                >
                                    <div className={cx('toggle-btn')}></div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </Share>
                    </li>
                );
            })}
        </>
    );
};

export default MenuItem;

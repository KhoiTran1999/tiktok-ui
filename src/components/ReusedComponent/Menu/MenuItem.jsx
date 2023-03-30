import classNames from 'classnames/bind';
import React from 'react';
import Button from '../Button/Button';
import style from './Menu.module.scss';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);
const MenuItem = ({ data, onAccess, onLogout }) => {
    const { i18n } = useTranslation();

    const handleOnclick = (idx, action, code, to) => {
        //handle entry and go back from menu
        onAccess(idx);

        //handle click logout
        if (action === 'logout') onLogout();

        //Change language
        if (code === 'vi') {
            i18n.changeLanguage('vi');
        } else if (code === 'en') {
            i18n.changeLanguage('en');
        }
    };
    return (
        <>
            {data.map((val, idx) => {
                return (
                    <li key={idx} onClick={() => handleOnclick(idx, val.action, val.code, val.to)}>
                        <Button text to={val.to}>
                            {val.to === window.location.pathname ? (
                                <>
                                    <span className={`${cx('active')}`}>{val.activeIcon}</span>
                                    <h4 className={`${cx('active')}`}>{val.title}</h4>
                                </>
                            ) : (
                                <>
                                    {val.dropDown && <h2>{val.dropDown}</h2>}
                                    <span>{val.icon}</span>
                                    <h4>{val.title}</h4>
                                </>
                            )}
                        </Button>
                    </li>
                );
            })}
        </>
    );
};

export default MenuItem;

import classNames from 'classnames/bind';
import React from 'react';
import Button from '../Button/Button';
import style from './Menu.module.scss';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);
const MenuItem = ({ data, onAccess, onLogout }) => {
    const { i18n } = useTranslation();

    const handleOnclick = (idx, action, code) => {
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
                    <li key={idx} onClick={() => handleOnclick(idx, val.action, val.code)}>
                        <Button text to={val.to}>
                            <span>{val.icon}</span>
                            <span>{val.title}</span>
                        </Button>
                    </li>
                );
            })}
        </>
    );
};

export default MenuItem;

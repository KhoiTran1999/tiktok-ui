import React, { forwardRef, memo, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Menu.module.scss';
import SubnavWrapper from '../SubnavWrapper';
import MenuItem from './MenuItem';
import HeaderChildren from './HeaderChildren';

const cx = classNames.bind(style);
const Menu = ({ className, data, isResetMenu, onLogout }) => {
    const [history, setHistory] = useState([]);
    const [directing, setDirecting] = useState(data);
    const [childTitle, setChildTitle] = useState('');

    const handleOnAccess = (index) => {
        directing.map((val, idx) => {
            if (val.children && idx === index) {
                setHistory((prev) => [...prev, val.children]);
                setDirecting(val.children.list);
                setChildTitle(val.children.childrenTitle);
            }
        });
    };

    const handleOnBack = useCallback(() => {
        if (history.length > 1) {
            setDirecting(history[history.length - 2].list);
            setHistory((prev) => prev.filter((val, idx) => idx !== history.length - 1));
            setChildTitle(history[history.length - 2].childrenTitle);
        } else {
            setDirecting(data);
            setHistory([]);
            setChildTitle('');
        }
    }, [history]);

    const classes = cx('sub-nav', {
        [className]: className,
    });

    useEffect(() => {
        if (isResetMenu) {
            setDirecting(data);
            setHistory([]);
            setChildTitle('');
        }
    }, [isResetMenu]);

    return (
        <div className={classes}>
            <SubnavWrapper>
                {childTitle && <HeaderChildren title={childTitle} onBack={handleOnBack} />}
                <ul>
                    <MenuItem data={directing} onAccess={handleOnAccess} onLogout={onLogout} />
                </ul>
            </SubnavWrapper>
        </div>
    );
};

export default Menu;

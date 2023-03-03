import React from 'react';
import { Link } from 'react-router-dom';
import style from './Menu.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';

const cx = classNames(style);
const MenuItem = ({ data }) => {
    return (
        <>
            {data.map((val, idx) => {
                return (
                    <li key={idx}>
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

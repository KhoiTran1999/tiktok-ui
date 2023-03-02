import React from 'react';
import { Link } from 'react-router-dom';
import style from './Menu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames(style);
const MenuItem = ({ data }) => {
    return (
        <>
            {data.map((val, idx) => {
                return (
                    <li key={idx}>
                        {val.to ? (
                            <Link to={val.to}>
                                <span>{val.icon}</span>
                                <span>{val.title}</span>
                            </Link>
                        ) : (
                            <>
                                <span>{val.icon}</span>
                                <span>{val.title}</span>
                            </>
                        )}
                    </li>
                );
            })}
        </>
    );
};

export default MenuItem;

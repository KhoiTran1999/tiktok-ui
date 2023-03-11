import React from 'react';
import { Button } from '../../DetailComponent';
import style from './Footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const DirectedLink = ({ data = [] }) => {
    return (
        <>
            {data.map((linkList, idx) => {
                return (
                    <ul key={idx}>
                        {linkList.map((navLink, idx) => (
                            <li key={idx}>
                                <Button textLink to={navLink.to}>
                                    {navLink.title}
                                </Button>
                            </li>
                        ))}
                    </ul>
                );
            })}
        </>
    );
};

export default DirectedLink;

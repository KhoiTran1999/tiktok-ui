import React from 'react';
import style from './style.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
const Button = ({
    className,
    primary,
    outline,
    basic,
    text,
    hashTag,
    large,
    medium,
    small,
    to,
    href,
    children,
    ...ListProps
}) => {
    let Comp = 'button';
    const props = {
        ...ListProps,
    };

    if (to) {
        Comp = Link;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        basic,
        text,
        hashTag,
        large,
        medium,
        small,
    });

    return (
        <Comp className={classes} {...props}>
            <span>{children}</span>
        </Comp>
    );
};

export default Button;
